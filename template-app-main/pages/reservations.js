import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

const Card = styled.div`
  border: 1px solid #eee;
  border-left: 5px solid #041E42;
  padding: 20px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const CheckInBtn = styled.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover { background-color: #1b5e20; }
`;

export default function Reservations() {
  const { account } = useStateContext();

  if (!account) {
    return <Container><h2 style={{textAlign: 'center', color: '#666'}}>Connect your wallet to view your reservations.</h2></Container>;
  }

  return (
    <Container>
      <h2 style={{ color: '#041E42' }}>My Active Escrows</h2>
      <p style={{ color: '#666', marginTop: '10px' }}>Wallet: {account}</p>

      {/* Dummy Data Reservation */}
      <Card>
        <div>
          <h3>Pattee 104</h3>
          <p style={{ color: '#666', marginTop: '5px' }}>Today at 10:00 AM</p>
          <p style={{ fontSize: '0.9rem', color: '#ff9800', marginTop: '5px' }}>0.01 ETH Locked</p>
        </div>
        <CheckInBtn onClick={() => alert("Smart contract refund triggered!")}>
          Check-In & Refund
        </CheckInBtn>
      </Card>
    </Container>
  );
}