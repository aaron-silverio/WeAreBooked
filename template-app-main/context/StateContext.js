/*
 Global state management and Ethers.js integration.
 For handling wallet authentication, provider/signer configuration, and executes
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

export const contractAddress = "0x273508Adc490Ec2F7dB042c1935E2c9e25dFA8fE"; 
export const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"roomId","type":"string"},{"indexed":false,"internalType":"address","name":"student","type":"address"}],"name":"CheckedIn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"roomId","type":"string"},{"indexed":false,"internalType":"address","name":"student","type":"address"}],"name":"RoomBooked","type":"event"},{"inputs":[],"name":"DEPOSIT_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"activeBookings","outputs":[{"internalType":"address","name":"studentWallet","type":"address"},{"internalType":"uint256","name":"depositAmount","type":"uint256"},{"internalType":"bytes32","name":"roomQR","type":"bytes32"},{"internalType":"uint256","name":"checkInDeadline","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_roomId","type":"string"},{"internalType":"bytes32","name":"_secretHash","type":"bytes32"},{"internalType":"uint256","name":"_scheduledStartTime","type":"uint256"}],"name":"bookRoom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"_roomId","type":"string"},{"internalType":"string","name":"_qrCodeSecret","type":"string"}],"name":"checkIn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_roomId","type":"string"}],"name":"clearNoShow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];



const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [activeBooking, setActiveBooking] = useState(null);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [txState, setTxState] = useState({ show: false, status: 'idle', message: '' });
  const closeTxModal = () => setTxState({ show: false, status: 'idle', message: '' });

  // CODE HERE FOR CONNEXTING METAMASK WALLET
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setAccount(accounts[0]);
        setProvider(web3Provider);
      } catch (error) { console.error(error); }
    } else {
      setTxState({ show: true, status: 'error', message: 'MetaMask is not installed!' });
    }
  };

  const checkRoomAvailable = async (roomId) => {
    if (!provider) return false;
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const roomData = await contract.activeBookings(roomId);
      return roomData.isActive; 
    } catch (error) {
      return false;
    }
  };

  // bookLibrary connects the sigenr and sets up the 0.01 tBNB deposit, and writes the booking transaction to the blockchain.
  const bookLibraryRoom = async (roomId) => {
    if (!provider) {
      setTxState({ show: true, status: 'error', message: 'Wallet not connected. Please connect MetaMask!' });
      return false; // Tell dashboard it failed
    }
    
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const deposit = ethers.utils.parseEther("0.01");
      const secretHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("presentation_secret"));
      const startTime = Math.floor(Date.now() / 1000); 

      setTxState({ show: true, status: 'loading', message: `Securing ${roomId} on the blockchain...` });
      
      const tx = await contract.bookRoom(roomId, secretHash, startTime, { value: deposit });
      await tx.wait(); 
      setActiveBooking(roomId); // Memorize the room booked
      
      setTxState({ show: true, status: 'success', message: `Success! You have booked ${roomId}.` });
      return true; // Tell dashboard it succeeded
    } catch (error) {
      console.error("Write Error:", error);
      setTxState({ show: true, status: 'error', message: 'Booking failed. Ensure you have tBNB and rejected the transaction.' });
      return false; // Tell dashboard it failed
    }
  };

  // checkInRoom sends the check-in transaction + the smart contract validates then releases the escrow funds back to the user
  const checkInRoom = async (roomId, qrSecret) => {
    if (!provider) {
      setTxState({ show: true, status: 'error', message: 'Wallet not connected!' });
      return;
    }
    
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      setTxState({ show: true, status: 'loading', message: `Verifying check-in for ${roomId}...` });
      
      const tx = await contract.checkIn(roomId, qrSecret);
      await tx.wait();
      setActiveBooking(null); // Clear it out because the escrow is done
      
      setTxState({ show: true, status: 'success', message: `Check-in verified! Your deposit has been refunded.` });
    } catch (error) {
      console.error("Check-in Error:", error);
      setTxState({ show: true, status: 'error', message: 'Check-in failed. Are you at the right room?' });
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setProvider(new ethers.providers.Web3Provider(window.ethereum));
        } else {
          setAccount(null);
          setProvider(null);
        }
      });
    }
  }, []);

  return (
    <StateContext.Provider value={{ 
      activeBooking, setActiveBooking,
      account, provider, connectWallet, bookLibraryRoom, checkRoomAvailable, checkInRoom, 
      txState, setTxState, closeTxModal 
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);