import styled from 'styled-components';
import { useState } from 'react';
import { useStateContext } from '../context/StateContext';

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 15px;

  h2 { color: #041E42; }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RoomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const RoomLabel = styled.div`
  width: 150px;
  font-weight: bold;
  color: #333;
`;

const TimeSlots = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;
`;

const Slot = styled.button`
  flex: 1;
  padding: 15px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: ${props => props.booked ? '#ffebee' : '#e8f5e9'};
  color: ${props => props.booked ? '#c62828' : '#2e7d32'};
  cursor: ${props => props.booked ? 'not-allowed' : 'pointer'};
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.booked ? '#ffebee' : '#c8e6c9'};
  }
`;

// Dummy data for now until Smart Contract is ready
const rooms = [
  { id: 1, name: "Pattee 104", slots: [false, true, false, false] },
  { id: 2, name: "Paterno 211", slots: [false, false, false, true] },
  { id: 3, name: "Knowledge Commons", slots: [true, true, false, false] },
];
const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];

export default function Dashboard() {
  const { account } = useStateContext();

  const handleBook = (room, timeIndex) => {
    if (!account) return alert("Please connect wallet first!");
    // Later: Call Smart Contract here
    alert(`Initiating smart contract escrow for ${room.name} at ${times[timeIndex]}...`);
  };

  return (
    <Container>
      <Header>
        <h2>Library Study Rooms</h2>
        <p>Deposit Required: <strong>0.01 ETH</strong></p>
      </Header>

      <Grid>
        {/* Header Row for Times */}
        <RoomRow>
          <RoomLabel>Room</RoomLabel>
          <TimeSlots>
            {times.map((t, i) => <div style={{flex: 1, textAlign: 'center', color: '#666'}} key={i}>{t}</div>)}
          </TimeSlots>
        </RoomRow>

        {/* Room Data */}
        {rooms.map((room) => (
          <RoomRow key={room.id}>
            <RoomLabel>{room.name}</RoomLabel>
            <TimeSlots>
              {room.slots.map((isBooked, idx) => (
                <Slot 
                  key={idx} 
                  booked={isBooked}
                  onClick={() => !isBooked && handleBook(room, idx)}
                >
                  {isBooked ? "Reserved" : "Available"}
                </Slot>
              ))}
            </TimeSlots>
          </RoomRow>
        ))}
      </Grid>
    </Container>
  );
}