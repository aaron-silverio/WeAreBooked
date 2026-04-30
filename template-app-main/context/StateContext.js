import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

export const contractAddress = "0x273508Adc490Ec2F7dB042c1935E2c9e25dFA8fE"; 
export const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"roomId","type":"string"},{"indexed":false,"internalType":"address","name":"student","type":"address"}],"name":"CheckedIn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"roomId","type":"string"},{"indexed":false,"internalType":"address","name":"student","type":"address"}],"name":"RoomBooked","type":"event"},{"inputs":[],"name":"DEPOSIT_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"activeBookings","outputs":[{"internalType":"address","name":"studentWallet","type":"address"},{"internalType":"uint256","name":"depositAmount","type":"uint256"},{"internalType":"bytes32","name":"roomQR","type":"bytes32"},{"internalType":"uint256","name":"checkInDeadline","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_roomId","type":"string"},{"internalType":"bytes32","name":"_secretHash","type":"bytes32"},{"internalType":"uint256","name":"_scheduledStartTime","type":"uint256"}],"name":"bookRoom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"_roomId","type":"string"},{"internalType":"string","name":"_qrCodeSecret","type":"string"}],"name":"checkIn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_roomId","type":"string"}],"name":"clearNoShow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setAccount(accounts[0]);
        setProvider(web3Provider);
      } catch (error) { console.error(error); }
    }
  };

  const bookLibraryRoom = async (roomId) => {
    console.log("DEBUG: Booking string is ->", `'${roomId}'`); // The quotes help see extra spaces!
    if (!provider) return;
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const deposit = ethers.utils.parseEther("0.01");
      const secretHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("presentation_secret"));
      const startTime = Math.floor(Date.now() / 1000); 

      console.log("Booking Room ID:", roomId);
      const tx = await contract.bookRoom(roomId, secretHash, startTime, { value: deposit });
      await tx.wait(); 
      alert(`Success! You booked ${roomId}`);
    } catch (e) { alert("Booking failed! Check your tBNB balance."); }
  };

  const checkInRoom = async (roomId, qrSecret) => {
    console.log("DEBUG: Check-in string is ->", `'${roomId}'`);
    if (!provider) return;
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      console.log("Attempting Check-in for:", roomId);
      const tx = await contract.checkIn(roomId, qrSecret);
      await tx.wait();
      alert(`Success! Refund initiated for ${roomId}.`);
    } catch (e) {
      console.error(e);
      alert("Check-in failed. Make sure the Room ID matches exactly!");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
        if (accounts[0]) setProvider(new ethers.providers.Web3Provider(window.ethereum));
      });
    }
  }, []);

  return (
    <StateContext.Provider value={{ account, provider, connectWallet, bookLibraryRoom, checkInRoom }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);