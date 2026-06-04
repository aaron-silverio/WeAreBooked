# 📖 We Are Booked - Decentralized Library Escrow System

[![Live Demo](https://img.shields.io/badge/Live_Demo-Hosted_on_Vercel-000000?style=for-the-badge&logo=vercel)](https://we-are-booked.vercel.app/)
[![Solidity](https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black)]()
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)]()

**We Are Booked** is a full-stack Web3 application designed to solve the chronic "no-show" problem in university study spaces, originally conceptualized for the Paterno and Pattee libraries at Penn State. 

By replacing centralized booking databases with a smart contract escrow system, this application ensures study rooms are utilized efficiently while holding users financially accountable for their reservations.

## 🚀 Live Demo
**[Experience the live application here](https://we-are-booked.vercel.app/)**
*(Note: Requires MetaMask and connection to the BSC Testnet. Get testnet BNB [here](https://testnet.binance.org/faucet-smart)).*

## 🧠 The Problem & Solution
Campus study rooms are often fully booked online but physically empty because students fail to show up. 

**The Solution:** A micro-deposit escrow system. 
When a student books a room, they lock a small deposit (`0.01 tBNB`) via a smart contract. If they physically show up and check in using the room's secure QR code within 15 minutes, the deposit is instantly refunded. If they are a no-show, the contract logic automatically forfeits the funds.

## ⚙️ Core Architecture

### Backend (Smart Contract)
- **State Management:** Room availability and deadlines are mapped to a custom `Booking` struct deployed on the **Binance Smart Chain (BSC) Testnet**.
- **Cryptographic Check-In:** Plaintext room codes are never exposed. The frontend hashes the QR code payload, and the contract verifies it natively using `keccak256`.
- **Maximum Security:** The escrow refund mechanism is protected against recursive withdrawal vulnerabilities using OpenZeppelin’s `ReentrancyGuard`.

### Frontend & APIs
- **Seamless UX:** Built with **Next.js** and **Styled Components**, featuring a reactive UI grid that prevents double-booking.
- **Web3 Integration:** Utilizes **Ethers.js v5** as the primary RPC bridge to read active struct states and write transaction payloads directly to the blockchain.
- **Custom Transaction States:** Avoids native browser alerts in favor of custom, animated transaction modals that reflect the real-time pending/success state of the blockchain.

## 🛠️ Tech Stack
- **Frontend:** React, Next.js, Styled Components
- **Web3:** Ethers.js, MetaMask API
- **Smart Contracts:** Solidity, OpenZeppelin, Hardhat/Remix
- **Network:** Binance Smart Chain (BSC) Testnet
- **Deployment:** Vercel

## 💻 Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/aaron-silverio/WeAreBooked.git](https://github.com/aaron-silverio/WeAreBooked.git)
   cd WeAreBooked/template-app-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to interact with the application locally.

## 📝 Smart Contract Verification
The primary escrow contract is deployed and verified on the BSC Testnet at: `0x273508Adc490Ec2F7dB042c1935E2c9e25dFA8fE`