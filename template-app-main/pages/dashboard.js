import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  font-family: Arial, sans-serif;
`;

// NEW: Stat Cards to fill whitespace and add a Web3 feel
const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-left: 5px solid #041E42;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);

  h4 {
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  p {
    color: #041E42;
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
  }

  .subtext {
    font-size: 0.85rem;
    color: #888;
    margin-top: 5px;
    font-weight: normal;
  }
`;

const DateHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h2 {
    color: #041E42;
    margin: 0;
  }
`;

const GridWrapper = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
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
  min-width: 120px; 
  padding: 0 5px;
  font-weight: bold;
  font-size: 0.85rem;
  border-right: 1px solid #ddd;
  text-align: center;
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

const TimeBlock = styled.div`
  min-width: 60px; 
  height: 100%;
  border-right: 1px solid white;
  background-color: ${(props) => {
    if (props.status === 'past') return '#ffffff';
    if (props.status === 'available') return '#5cb85c'; 
    return '#666666'; 
  }};
  cursor: ${(props) => (props.status === 'available' ? 'pointer' : 'not-allowed')};
  transition: opacity 0.1s;

  &:hover {
    opacity: ${(props) => (props.status === 'available' ? 0.8 : 1)};
  }
`;

const CurrentTimeLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 240px; 
  width: 2px;
  background-color: #d9534f;
  z-index: 1;

  &::before {
    content: '▼';
    color: #d9534f;
    position: absolute;
    top: -10px;
    left: -5px;
    font-size: 12px;
  }
`;

const Legend = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  font-size: 0.9rem;
  align-items: center;
  justify-content: flex-end;

  div {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #555;
  }

  .box {
    width: 15px;
    height: 15px;
    border-radius: 3px;
  }
`;

const times = ["3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm"];
const rooms = [
  "Paterno E128A", "Paterno E128B", "Paterno E128C", "Paterno E128D",
  "Pattee W024 - Collaboration Commons", "Pattee W025 - Collaboration Commons", 
  "Pattee W026 - Collaboration Commons Mini", "Pattee W034 - Collaboration Commons",
  "Pattee W101A - Leisure Reading Room", "Pattee W101B - Leisure Reading Room",
  "Pattee W120 - Knowledge Commons", "Pattee W121 - Knowledge Commons",
  "Pattee W124 - Knowledge Commons"
];

const generateBlocks = (roomIndex) => {
  return Array(16).fill(null).map((_, i) => {
    if (i < 4) return 'past'; 
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
      {/* NEW: Stats Row added here */}
      <StatsRow>
        <StatCard>
          <h4>Wallet Status</h4>
          <p>{account ? 'Connected' : 'Disconnected'}</p>
          <div className="subtext">{account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Please connect to book'}</div>
        </StatCard>
        <StatCard>
          <h4>Active Escrows</h4>
          <p>{account ? '1' : '0'}</p>
          <div className="subtext">Rooms currently reserved</div>
        </StatCard>
        <StatCard>
          <h4>Total Locked</h4>
          <p>{account ? '0.01' : '0.00'} ETH</p>
          <div className="subtext">Pending check-in refund</div>
        </StatCard>
      </StatsRow>

      <DateHeader>
        <h2>Current Availability</h2>
        <Legend>
          <div><div className="box" style={{ background: '#5cb85c' }}></div> Available</div>
          <div><div className="box" style={{ background: '#666666' }}></div> Unavailable</div>
        </Legend>
      </DateHeader>

      <GridWrapper>
        <LeftColumn>
          <HeaderRow style={{ padding: '0 10px', fontWeight: 'bold' }}>Space</HeaderRow>
          {rooms.map((room, idx) => (
            <RoomInfo key={idx}>
              <span className="badge">Info</span> {room} ♿🔌💻
            </RoomInfo>
          ))}
        </LeftColumn>

        <RightScroll>
          <CurrentTimeLine />
          <HeaderRow>
            {times.map((time, idx) => (
              <HeaderCell key={idx} style={{ flex: 1 }}>{time}</HeaderCell>
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
    </Container>
  );
}