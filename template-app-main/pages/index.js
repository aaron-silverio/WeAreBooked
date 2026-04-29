import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
// NEW: Import the specific icons from FontAwesome
import { FaLock, FaQrcode, FaEthereum } from 'react-icons/fa'; 

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Global Wrappers
const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-x: hidden;
  color: white;
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; 
  height: 100vh;
  object-fit: cover;
  z-index: -2;
`;

const DarkOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; 
  height: 100vh;
  background: rgba(4, 30, 66, 0.75); 
  z-index: -1;
`;

// Section 1: Hero
const HeroSection = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -1px;
  background: linear-gradient(to right, #ffffff, #a0bde6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.2rem; 
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #d1e1f9;
  line-height: 1.6;
  max-width: 800px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const PrimaryBtn = styled.button`
  background-color: white;
  color: #041E42;
  font-size: 1.1rem;
  padding: 15px 35px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SecondaryBtn = styled.button`
  background-color: transparent;
  color: white;
  font-size: 1.1rem;
  padding: 15px 35px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255,255,255,0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Section 2: How It Works
const StepsSection = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 50px;
  color: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1100px;
`;

const StepCard = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);

  h3 {
    font-size: 1.4rem;
    margin-bottom: 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  p {
    color: #b0c9ec;
    line-height: 1.6;
    font-size: 1.05rem;
  }

  /* UPDATED: We use color instead of text-fill for SVGs */
  .icon {
    font-size: 2.5rem;
    color: #ffffff; 
    animation: ${float} 6s ease-in-out infinite;
    display: flex;
    justify-content: center;
  }
`;

// Intersection Observer Hook
function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.2 }
    );
    
    if (domRef.current) observer.observe(domRef.current);
    
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        transition: 'opacity 1s ease-out, transform 1s ease-out',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        display: 'flex'
      }}
    >
      {props.children}
    </div>
  );
}

export default function Home() {
  const scrollToSteps = () => {
    document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageWrapper>
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/backgroundvid.mp4" type="video/mp4" />
      </VideoBackground>
      <DarkOverlay />

      <HeroSection>
        <Title>No More Empty Study Spots.</Title>
        <Subtitle>
          We Are Booked uses Ethereum smart contracts to ensure library spaces go to those who actually show up. Lock in a micro-deposit to secure your room, scan the dynamic QR code when you arrive, and get your crypto back instantly.
        </Subtitle>
        
        <ActionButtons>
          <Link href="/dashboard" passHref>
            <PrimaryBtn>View Availability</PrimaryBtn>
          </Link>
          <SecondaryBtn onClick={scrollToSteps}>
            How it works ↓
          </SecondaryBtn>
        </ActionButtons>
      </HeroSection>

      <StepsSection id="how-it-works">
        <FadeInSection>
          <SectionTitle>The Escrow Process</SectionTitle>
        </FadeInSection>
        
        <StepsContainer>
          <FadeInSection>
            <StepCard>
              {/* NEW: Replaced emoji with FaLock component */}
              <h3><span className="icon"><FaLock /></span> 1. Lock Deposit</h3>
              <p>Find an open room on the dashboard. Confirm your reservation by locking a micro-deposit (0.01 ETH) into our decentralized escrow contract.</p>
            </StepCard>
          </FadeInSection>
          
          <FadeInSection>
            <StepCard>
              {/* NEW: Replaced emoji with FaQrcode component */}
              <h3><span className="icon"><FaQrcode /></span> 2. Scan to Verify</h3>
              <p>Head to your reserved room. Prove you arrived on time by scanning the room's dynamic, rotating QR code with your phone.</p>
            </StepCard>
          </FadeInSection>

          <FadeInSection>
            <StepCard>
              {/* NEW: Replaced emoji with FaEthereum component */}
              <h3><span className="icon"><FaEthereum /></span> 3. Instant Refund</h3>
              <p>The smart contract instantly verifies your presence and refunds your deposit in full. If you no-show, your deposit is forfeited.</p>
            </StepCard>
          </FadeInSection>
        </StepsContainer>
      </StepsSection>
    </PageWrapper>
  );
}