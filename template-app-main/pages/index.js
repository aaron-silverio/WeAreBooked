import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';

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
  color: white;
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
`;

const DarkOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 30, 66, 0.7); /* Penn State Navy with 70% opacity */
  z-index: -1;
`;

// Section 1: Hero (Takes up full screen)
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
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #d1e1f9;
  line-height: 1.6;
  max-width: 800px;
  margin-bottom: 40px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
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
`;

// Section 2: How It Works (Below the fold)
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
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
`;

const StepCard = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 350px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);

  h3 {
    font-size: 1.5rem;
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

  .icon {
    font-size: 2.5rem;
    animation: ${float} 6s ease-in-out infinite;
  }
`;

// Intersection Observer Hook for Scroll Animations
function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Triggers when 20% of the element is visible
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
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
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
      {/* Background stays fixed while content scrolls over it */}
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/test-video.mp4" type="video/mp4" />
      </VideoBackground>
      <DarkOverlay />

      <HeroSection>
        <Title>Accountable Studying.</Title>
        <Subtitle>
          No more empty, reserved rooms. We Are Booked uses Ethereum smart contract escrows to ensure library study spaces go to those who actually use them. Lock your deposit, show up, and get it back.
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
              <h3><span className="icon">🔒</span> 1. Lock Deposit</h3>
              <p>Find an open room on the dashboard. Confirm your reservation by locking a micro-deposit (0.01 ETH) into the decentralized escrow contract.</p>
            </StepCard>
          </FadeInSection>
          
          <FadeInSection>
            <StepCard>
              <h3><span className="icon">📍</span> 2. Show Up</h3>
              <p>Go to your reserved room at the library at the correct time. Scan the room's QR code or enter the room PIN into your dashboard to prove you arrived.</p>
            </StepCard>
          </FadeInSection>

          <FadeInSection>
            <StepCard>
              <h3><span className="icon">💸</span> 3. Get Refunded</h3>
              <p>The smart contract instantly verifies your presence and refunds your deposit in full. If you no-show, your deposit is forfeit.</p>
            </StepCard>
          </FadeInSection>
        </StepsContainer>
      </StepsSection>
    </PageWrapper>
  );
}