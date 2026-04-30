// PAGE PURPOSE: Main dashboard for the WeAreBooked system. Displays library room
// availability and handles the smart contract 'bookRoom' function calls.

import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';

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
  background-color: ${props => props.status === 'past' ? '#ffffff' : props.status === 'available' ? '#5cb85c' : '#666666'};
  cursor: ${props => props.status === 'available' ? 'pointer' : 'not-allowed'};
`;

const rooms = ["Paterno E128A", "Paterno E128B", "Paterno E128C", "Paterno E128D", "Pattee W024", "Pattee W025"];
const times = ["3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm"];

export default function Dashboard() {
  const { account, bookLibraryRoom } = useStateContext();

  const handleBook = async (roomName, status) => {
    if (status !== 'available') return;
    if (!account) return alert("Connect wallet first!");
    await bookLibraryRoom(roomName);
  };

  return (
    <Container>
      <StatsRow>
        <StatCard>
          <h4>Wallet</h4>
          <p>{account ? 'Connected' : 'None'}</p>
        </StatCard>
        <StatCard>
          <h4>Active Booking</h4>
          <p>{account ? '1' : '0'}</p>
        </StatCard>
        <StatCard>
          <h4>Locked Deposit</h4>
          <p>{account ? '0.01' : '0.00'} tBNB</p>
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
          {rooms.map((room, rIdx) => (
            <RoomRow key={rIdx}>
              {Array(6).fill(null).map((_, bIdx) => (
                <TimeBlock 
                  key={bIdx} 
                  status={bIdx === 2 ? 'available' : 'booked'} 
                  onClick={() => handleBook(room, bIdx === 2 ? 'available' : 'booked')}
                />
              ))}
            </RoomRow>
          ))}
        </RightScroll>
      </GridWrapper>
    </Container>
  );
}