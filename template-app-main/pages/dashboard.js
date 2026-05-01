/*
  UX/UI DECISIONS: 
  - Utilizes a visual grid system (Green = Available, Gray = Booked, Yellow = Pending).
  - Implements a custom transaction modal to prevent UI blocking from native browser alerts.
  - Dynamically updates "Stat Cards" based on the global Web3 state to provide instant feedback on wallet connection and locked escrow funds.
 */

import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import { useState, useEffect } from 'react';
import TransactionModal from '../components/TransactionModal';

const Container = styled.div`
  max-width: 1200px; margin: 30px auto; padding: 20px;
  background: white; font-family: 'Inter', sans-serif;
`;

const StatsRow = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px; margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: #f8f9fa; border: 1px solid #e0e0e0; border-left: 5px solid #041E42;
  border-radius: 8px; padding: 20px;
  h4 { color: #666; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 10px; }
  p { color: #041E42; font-size: 1.8rem; font-weight: bold; margin: 0; }
`;

const GridWrapper = styled.div`
  display: flex; border: 1px solid #ddd; border-radius: 4px; overflow: hidden;
`;

const LeftColumn = styled.div` width: 380px; border-right: 1px solid #ddd; background: #fff; `;

const RightScroll = styled.div` flex-grow: 1; overflow-x: auto; display: flex; flex-direction: column; `;

const HeaderRow = styled.div` display: flex; border-bottom: 1px solid #ddd; background: #f9f9f9; height: 40px; align-items: center; `;

const HeaderCell = styled.div` min-width: 120px; padding: 0 5px; font-weight: bold; border-right: 1px solid #ddd; text-align: center; `;

const RoomRow = styled.div` display: flex; height: 35px; border-bottom: 1px solid #eee; `;

const RoomInfo = styled.div` padding: 0 10px; font-size: 0.85rem; color: #337ab7; display: flex; align-items: center; height: 35px; `;

const TimeBlock = styled.div`
  min-width: 60px; height: 100%; border-right: 1px solid white;
  background-color: ${(props) => {
    if (props.status === 'past') return '#ffffff';
    if (props.status === 'available') return '#5cb85c'; // Green
    if (props.status === 'pending') return '#ffc107'; // Yellow
    return '#666666'; // Gray (Booked)
  }};
  cursor: ${(props) => (props.status === 'available' ? 'pointer' : 'not-allowed')};
  transition: background-color 0.3s ease;
`;

const rooms = ["Paterno E128A", "Paterno E128B", "Paterno E128C", "Paterno E128D", "Pattee W024", "Pattee W025"];
const times = ["3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm"];

export default function Dashboard() {
  const { account, bookLibraryRoom, setTxState, activeBooking } = useStateContext();
  
  const [gridState, setGridState] = useState([]);

  useEffect(() => {
    const initialGrid = rooms.map(() => 
      Array(6).fill(null).map((_, bIdx) => (bIdx === 2 ? 'available' : 'booked'))
    );
    setGridState(initialGrid);
  }, []);

  const handleBook = async (roomName, rIdx, bIdx, currentStatus) => {
    if (currentStatus !== 'available') return;
    
    if (!account) {
      return setTxState({ show: true, status: 'error', message: 'Wallet not connected. Please connect your MetaMask in the top right!' });
    }

    const newGrid = [...gridState];
    newGrid[rIdx][bIdx] = 'pending';
    setGridState([...newGrid]);

    const success = await bookLibraryRoom(roomName);

    if (success) {
      newGrid[rIdx][bIdx] = 'booked';
    } else {
      newGrid[rIdx][bIdx] = 'available'; 
    }
    setGridState([...newGrid]);
  };

  return (
    <Container>
      <TransactionModal />
      
      <StatsRow>
        <StatCard>
          <h4>Wallet</h4>
          <p>{account ? 'Connected' : 'None'}</p>
        </StatCard>
        <StatCard>
          <h4>Active Booking</h4>
          {/* 2. NEW: Now it only shows 1 if activeBooking has a room name in it */}
          <p>{activeBooking ? '1' : '0'}</p>
        </StatCard>
        <StatCard>
          <h4>Locked Deposit</h4>
          {/* 3. NEW: Only shows 0.01 if activeBooking has a room name in it */}
          <p>{activeBooking ? '0.01' : '0.00'} tBNB</p>
        </StatCard>
      </StatsRow>

      <GridWrapper>
        <LeftColumn>
          <HeaderRow style={{paddingLeft: '10px'}}>Room</HeaderRow>
          {rooms.map((r, i) => <RoomInfo key={i}>{r}</RoomInfo>)}
        </LeftColumn>
        <RightScroll>
          <HeaderRow>
            {times.map((t, i) => <HeaderCell key={i}>{t}</HeaderCell>)}
          </HeaderRow>
          
          {gridState.map((row, rIdx) => (
            <RoomRow key={rIdx}>
              {row.map((status, bIdx) => (
                <TimeBlock 
                  key={bIdx} 
                  status={status} 
                  onClick={() => handleBook(rooms[rIdx], rIdx, bIdx, status)}
                />
              ))}
            </RoomRow>
          ))}
        </RightScroll>
      </GridWrapper>
    </Container>
  );
}