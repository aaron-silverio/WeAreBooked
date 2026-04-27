import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  text-align: center;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #041E42;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const StartBtn = styled.button`
  background-color: #041E42;
  color: white;
  font-size: 1.2rem;
  padding: 15px 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(4, 30, 66, 0.3);

  &:hover {
    background-color: #03152e;
  }
`;

export default function Home() {
  return (
    <Container>
      <Title>Accountable Studying.</Title>
      <Subtitle>
        Welcome to We Are Booked. Reserve library study rooms by locking a small crypto deposit. Show up, get it back. Don't show up, lose your deposit. Keeping campus fair for everyone.
      </Subtitle>
      <Link href="/dashboard" passHref>
        <StartBtn>View Room Availability</StartBtn>
      </Link>
    </Container>
  );
}