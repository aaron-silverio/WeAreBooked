import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #041E42;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding: 30px 20px;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto; /* Pushes footer to the bottom of the page */
  z-index: 10;
  position: relative;

  p {
    margin: 5px 0;
  }

  .highlight {
    color: #a0bde6;
    font-weight: bold;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <p>Developed by <span className="highlight">Aaron Silverio</span></p>
      <p>CMPSC 263 - Blockchain and Web Development</p>
      <p>&copy; {new Date().getFullYear()} We Are Booked. Class Project.</p>
    </FooterContainer>
  );
}