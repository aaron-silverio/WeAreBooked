import React from 'react';
import styled from 'styled-components';
// Assuming you have a context or prop for wallet connection. We will mock it for now.
import { FaWallet, FaHistory, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

// Global Wrappers (Matching your theme)
const PageWrapper = styled.div`
  min-height: calc(100vh - 70px);
  background: linear-gradient(135deg, #041E42 0%, #0a336b 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  color: white;
`;

const HeaderContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(to right, #ffffff, #a0bde6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #b0c9ec;
    font-size: 1.1rem;
  }
`;

// Glassmorphism Card
const ContentCard = styled.div`
  max-width: 1000px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const DisconnectedState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .icon-wrapper {
    font-size: 4rem;
    color: #a0bde6;
    margin-bottom: 10px;
    opacity: 0.8;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
  }

  p {
    color: #d1e1f9;
    max-width: 500px;
    line-height: 1.6;
  }
`;

const ConnectButton = styled.button`
  background-color: white;
  color: #041E42;
  font-size: 1.1rem;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
  transition: transform 0.2s, background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    background-color: #f0f0f0;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  margin-top: 50px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 40px;
`;

const InfoCard = styled.div`
  text-align: left;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;

  h4 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #ffffff;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  p {
    color: #b0c9ec;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

export default function Reservations() {
  // TODO: Replace this with your actual wallet connection state (e.g., from your Navbar or Context)
  const isConnected = false; 

  return (
    <PageWrapper>
      <HeaderContainer>
        <h1>My Reservations</h1>
        <p>Manage your active library study room escrows.</p>
      </HeaderContainer>

      <ContentCard>
        {!isConnected ? (
          // --- THE DISCONNECTED VIEW ---
          <>
            <DisconnectedState>
              <div className="icon-wrapper">
                <FaWallet />
              </div>
              <h2>Authentication Required</h2>
              <p>
                Because We Are Booked uses a decentralized smart contract, your reservations are tied directly to your cryptographic wallet, not an email address.
              </p>
              <ConnectButton>
                <FaWallet /> Connect MetaMask
              </ConnectButton>
            </DisconnectedState>

            {/* Fills up the whitespace and adds instructions */}
            <InfoGrid>
              <InfoCard>
                <h4><FaInfoCircle /> Active Escrows</h4>
                <p>Once connected, you will be able to see exactly which rooms you have booked, your deadlines, and how much ETH is currently locked in the contract.</p>
              </InfoCard>
              <InfoCard>
                <h4><FaHistory /> Past Bookings</h4>
                <p>View your permanent, immutable history of successful check-ins and refunded deposits stored safely on the BNC Testnet.</p>
              </InfoCard>
              <InfoCard>
                <h4><FaExclamationTriangle /> Testnet Only</h4>
                <p>Make sure your MetaMask is set to the BNB Smart Chain Testnet. You will need Testnet BNB to pay gas fees and lock your deposits.</p>
              </InfoCard>
            </InfoGrid>
          </>
        ) : (
          // --- THE CONNECTED VIEW (You will fill this with smart contract data tomorrow) ---
          <div>
            <h2>You are connected!</h2>
            <p>We will map through the activeBookings from the smart contract here.</p>
          </div>
        )}
      </ContentCard>
    </PageWrapper>
  );
}