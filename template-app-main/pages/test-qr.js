/* 
  NOTE: This page  purely simualtes the physical library check-in process (just for proof of concept))
*/

import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import { useState } from 'react';
import TransactionModal from '../components/TransactionModal';

const TestContainer = styled.div`
  max-width: 600px; margin: 100px auto; padding: 40px;
  background: white; border-radius: 12px; text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1); font-family: sans-serif;
`;

const ScanButton = styled.button`
  background: #00E5FF; color: #041E42; border: none;
  padding: 15px 30px; font-weight: bold; border-radius: 8px;
  cursor: pointer; margin-top: 20px;
`;

const Select = styled.select`
  padding: 10px; width: 80%; margin-bottom: 20px; border-radius: 5px;
`;

export default function TestQR() {
  const { checkInRoom, account } = useStateContext();
  const [selectedRoom, setSelectedRoom] = useState("Paterno E128A");

  const simulateScan = async () => {
    const mockSecret = "presentation_secret"; 
    await checkInRoom(selectedRoom, mockSecret);
  };

  return (
    <TestContainer>
      <h1>QR Scanner Simulator</h1>
      <p>Select the room you are standing in front of:</p>
      
      <Select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
        <option>Paterno E128A</option>
        <option>Paterno E128B</option>
        <option>Paterno E128C</option>
        <option>Pattee W024</option>
      </Select>

      <br />
      {account ? (
        <ScanButton onClick={simulateScan}>SCAN QR CODE</ScanButton>
      ) : (
        <p style={{color: 'red'}}>Connect your wallet first!</p>
      )}
      <TransactionModal />
    </TestContainer>
  );
}