import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: calc(100vh - 70px);
  background: linear-gradient(135deg, #041E42 0%, #0a336b 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  color: white;
`;

const ContentCard = styled.div`
  max-width: 800px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  animation: ${fadeIn} 0.8s ease-out forwards;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 30px;
  text-align: center;
  background: linear-gradient(to right, #ffffff, #a0bde6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #a0bde6;
  margin-top: 40px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #d1e1f9;
  margin-bottom: 20px;
`;

export default function About() {
  return (
    <PageWrapper>
      <ContentCard>
        <Title>About We Are Booked</Title>
        // Description / Context of my project
        <Paragraph>
          <strong>We Are Booked</strong> is a proof-of-concept decentralized application (dApp) I designed to solve a common, everyday campus problem: "Ghost Bookings" in university library study spaces. 
        </Paragraph>
        <Paragraph>
          During busy academic weeks, study rooms are highly sought after. However, the current reservation systems rely purely on the honor system. Students often reserve blocks of time but fail to show up, leaving highly desirable rooms sitting empty while the rest of us struggle to find a quiet place to work.
        </Paragraph>

        <SectionTitle>My Solution</SectionTitle>
        <Paragraph>
          By leveraging the Ethereum blockchain, I introduced financial accountability to the reservation process. To book a room, a user must lock a small micro-deposit (0.01 ETH) into a secure smart contract escrow. 
        </Paragraph>
        <Paragraph>
          When the user physically arrives at the room, they scan a dynamic, rotating QR code. This acts as a cryptographic Oracle, verifying their presence to the blockchain and instantly refunding their deposit in full. If the user no-shows, the deposit is forfeited, heavily disincentivizing the hoarding of public resources.
        </Paragraph>

        <SectionTitle>Project Context</SectionTitle>
        <Paragraph>
          I built this prototype for <strong>CMPSC 263: Blockchain and Web Development</strong>to demonstrates full-stack Web3 integration, utilizing Next.js for the frontend, styled-components for responsive UI design, and Solidity smart contracts deployed on the BNB Smart Chain Testnet (via Remix and OpenZeppelin) to manage the escrow logic.
        </Paragraph>
      </ContentCard>
    </PageWrapper>
  );
}
