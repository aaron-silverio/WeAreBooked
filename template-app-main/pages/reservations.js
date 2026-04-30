// PAGE PURPOSE: This page displays the user's current active room reservations. 
// It pulls the connected wallet address from the StateContext and provides 
// a direct interface for the user to initiate the check-in and refund process.

import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import Link from 'next/link';

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  font-family: 'Inter', sans-serif;
`;

const ReservationCard = styled.div`
  border: 1px solid #e0e0e0;
  border-left: 8px solid #00E5FF; /* Your Web3 Accent Color */
  padding: 25px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fcfcfc;
`;

const InfoGroup = styled.div`
  h3 { margin: 0 0 5px 0; color: #041E42; }
  p { margin: 0; color: #666; font-size: 0.9rem; }
  .address { font-family: monospace; color: #00E5FF; margin-top: 10px; }
`;

const ActionButton = styled.button`
  background: #041E42;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover { opacity: 0.9; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 50px;
  color: #888;
`;

export default function Reservations() {
  const { account } = useStateContext();

  return (
    <Container>
      <h2 style={{ color: '#041E42', marginBottom: '30px' }}>My Active Reservations</h2>

      {!account ? (
        <EmptyState>
          <p>Please connect your wallet to view your reservations.</p>
        </EmptyState>
      ) : (
        /* For the presentation, we simulate the active reservation display */
        <ReservationCard>
          <InfoGroup>
            <h3>Paterno E128A</h3>
            <p>Scheduled: Today, 5:00 PM - 6:00 PM</p>
            <div className="address">Escrow: 0.01 tBNB Locked</div>
          </InfoGroup>
          
          <Link href="/test-qr">
            <ActionButton>Proceed to Check-In</ActionButton>
          </Link>
        </ReservationCard>
      )}

      <div style={{ marginTop: '40px', fontSize: '0.8rem', color: '#bbb', textAlign: 'center' }}>
        Note: Reservations are automatically forfeited if not checked in within 15 minutes of start time.
      </div>
    </Container>
  );
}