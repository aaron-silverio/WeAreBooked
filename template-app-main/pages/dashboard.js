import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  font-family: Arial, sans-serif;
`;

const DateHeader = styled.div`
  margin-bottom: 20px;
  h2 {
    color: #041E42;
    margin-bottom: 10px;
  }
`;

const GridWrapper = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const LeftColumn = styled.div`
  width: 380px;
  flex-shrink: 0;
  border-right: 1px solid #ddd;
  background: #fff;
  z-index: 2;
`;

const RightScroll = styled.div`
  flex-grow: 1;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeaderRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  background: #f9f9f9;
  height: 40px;
  align-items: center;
`;

const HeaderCell = styled.div`
  min-width: 120px; /* 1-hour block */
  padding: 0 5px;
  font-weight: bold;
  font-size: 0.85rem;
  border-right: 1px solid #ddd;
`;

const RoomRow = styled.div`
  display: flex;
  height: 35px;
  border-bottom: 1px solid #eee;
`;

const RoomInfo = styled.div`
  padding: 0 10px;
  font-size: 0.85rem;
  color: #337ab7;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 35px;
  border-bottom: 1px solid #eee;

  span.badge {
    background: #5b7b90;
    color: white;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 0.7rem;
  }
`;

// Updated styling to match the Penn State screenshot
const TimeBlock = styled.div`
  min-width: 60px; /* 30-minute block */
  height: 100%;
  border-right: 1px solid white;
  background-color: ${(props) => {
    if (props.status === 'past') return '#ffffff';
    if (props.status === 'available') return '#5cb85c'; // Penn State LibCal Green
    return '#666666'; // Penn State LibCal Dark Grey
  }};
  cursor: ${(props) => (props.status === 'available' ? 'pointer' : 'not-allowed')};

  &:hover {
    background-color: ${(props) => {
      if (props.status === 'available') return '#4cae4c';
      if (props.status === 'booked') return '#555555';
      return '#ffffff';
    }};
  }
`;

const CurrentTimeLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 240px; /* Positions the line at 5:00 PM */
  width: 1px;
  background-color: red;
  z-index: 1;

  &::before {
    content: '▼';
    color: red;
    position: absolute;
    top: -10px;
    left: -5px;
    font-size: 12px;
  }
`;

const Legend = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  font-size: 0.9rem;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .box {
    width: 15px;
    height: 15px;
    border-radius: 3px;
  }
`;

const times = ["3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm"];

// Expanded room list from your screenshots
const rooms = [
  "Paterno E128A", "Paterno E128B", "Paterno E128C", "Paterno E128D",
  "Pattee W024 - Collaboration Commons", "Pattee W025 - Collaboration Commons", 
  "Pattee W026 - Collaboration Commons Mini", "Pattee W034 - Collaboration Commons",
  "Pattee W101A - Leisure Reading Room", "Pattee W101B - Leisure Reading Room",
  "Pattee W120 - Knowledge Commons", "Pattee W121 - Knowledge Commons",
  "Pattee W124 - Knowledge Commons"
];

// Logic to simulate past (white), booked (grey), and available (green) blocks
const generateBlocks = (roomIndex) => {
  return Array(16).fill(null).map((_, i) => {
    if (i < 4) return 'past'; // Everything before 5pm is white
    
    // Randomly scatter a few green 'available' blocks, mostly grey
    const isAvailable = Math.random() > 0.85; 
    return isAvailable ? 'available' : 'booked';
  });
};

export default function Dashboard() {
  const { account } = useStateContext();

  const handleBook = (roomName, status) => {
    if (status !== 'available') return;
    if (!account) return alert("Please connect wallet first!");
    alert(`Initiating 0.01 ETH escrow for ${roomName}...`);
  };

  return (
    <Container>
      <DateHeader>
        <h2>Current Availability</h2>
      </DateHeader>

      <GridWrapper>
        {/* Left Column */}
        <LeftColumn>
          <HeaderRow style={{ padding: '0 10px', fontWeight: 'bold' }}>Space</HeaderRow>
          {rooms.map((room, idx) => (
            <RoomInfo key={idx}>
              <span className="badge">Info</span> {room} ♿🔌💻
            </RoomInfo>
          ))}
        </LeftColumn>

        {/* Scrollable Grid */}
        <RightScroll>
          <CurrentTimeLine />
          <HeaderRow>
            {times.map((time, idx) => (
              <HeaderCell key={idx}>{time}</HeaderCell>
            ))}
          </HeaderRow>
          
          {rooms.map((room, roomIdx) => (
            <RoomRow key={roomIdx}>
              {generateBlocks(roomIdx).map((status, blockIdx) => (
                <TimeBlock 
                  key={blockIdx} 
                  status={status} 
                  onClick={() => handleBook(room, status)}
                />
              ))}
            </RoomRow>
          ))}
        </RightScroll>
      </GridWrapper>

      <Legend>
        <div><div className="box" style={{ background: '#5cb85c' }}></div> Available</div>
        <div><div className="box" style={{ background: '#666666' }}></div> Unavailable</div>
      </Legend>
    </Container>
  );
}