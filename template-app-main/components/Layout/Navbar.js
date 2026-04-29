import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image'; // <-- NEW: Next.js optimized image component
import { useStateContext } from '../../context/StateContext';

const Nav = styled.nav`
  background-color: #041E42;
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px 20px;
    gap: 15px;
  }
`;

// UPDATED: Changed from text to an image container
const LogoContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 15px;
  }

  a {
    color: #e0e0e0;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    text-align: center;
    
    &:hover {
      color: white;
    }
  }
`;

const Button = styled.button`
  background-color: white;
  color: #041E42;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function Navbar() {
  const { account, connectWallet } = useStateContext();

  return (
    <Nav>
      <Link href="/" passHref>
        <LogoContainer>
          {/* NEW: The actual image placement */}
          <Image 
            src="/logo.png" 
            alt="We Are Booked Logo" 
            width={160} 
            height={45} 
            style={{ objectFit: 'contain' }}
          />
        </LogoContainer>
      </Link>
      
      <NavLinks>
        <Link href="/about">About</Link>
        <Link href="/dashboard">Book a Room</Link>
        <Link href="/reservations">My Reservations</Link>
        {account ? (
          <Button>
            {account.slice(0, 6)}...{account.slice(-4)}
          </Button>
        ) : (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
      </NavLinks>
    </Nav>
  );
}