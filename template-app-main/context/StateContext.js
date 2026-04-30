import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

export const contractAddress = "0x273508Adc490Ec2F7dB042c1935E2c9e25dFA8fE"; 
export const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "student",
        "type": "address"
      }
    ],
    "name": "CheckedIn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "student",
        "type": "address"
      }
    ],
    "name": "RoomBooked",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DEPOSIT_AMOUNT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "activeBookings",
    "outputs": [
      {
        "internalType": "address",
        "name": "studentWallet",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "depositAmount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "roomQR",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "checkInDeadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_roomId",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "_secretHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_scheduledStartTime",
        "type": "uint256"
      }
    ],
    "name": "bookRoom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_roomId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_qrCodeSecret",
        "type": "string"
      }
    ],
    "name": "checkIn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_roomId",
        "type": "string"
      }
    ],
    "name": "clearNoShow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

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
      } catch (error) {
        console.error("Connection failed", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // --- NEW: TASK A - SMART CONTRACT READ ---
  const checkRoomAvailable = async (roomId) => {
    if (!provider) return false;
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const roomData = await contract.activeBookings(roomId);
      console.log(`Room ${roomId} active status:`, roomData.isActive);
      return roomData.isActive; 
    } catch (error) {
      console.error("Read Error:", error);
      return false;
    }
  };

  // --- NEW: TASK A - SMART CONTRACT WRITE ---
  const bookLibraryRoom = async (roomId) => {
    if (!provider) return alert("Please connect your wallet first!");
    try {
      // Get the signer (the user paying the gas)
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Convert 0.01 to Wei using ethers v5 syntax
      const deposit = ethers.utils.parseEther("0.01");

      // Generate a mock QR hash and use current time
      const secretHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("presentation_secret"));
      const startTime = Math.floor(Date.now() / 1000); 

      // Fire the transaction!
      const transaction = await contract.bookRoom(roomId, secretHash, startTime, { value: deposit });
      
      alert("Transaction sent! Waiting for blockchain confirmation...");
      await transaction.wait(); 
      
      alert(`Success! You have officially booked ${roomId}`);
    } catch (error) {
      console.error("Write Error:", error);
      alert("Transaction failed or rejected.");
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
    // Make sure the new functions are passed down in the value object!
    <StateContext.Provider value={{ account, provider, connectWallet, checkRoomAvailable, bookLibraryRoom }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);