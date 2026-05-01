import styled, { keyframes } from 'styled-components';
import { useStateContext } from '../context/StateContext';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(4, 30, 66, 0.6); /* Penn State Blue with opacity */
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  font-family: 'Inter', sans-serif;
`;

const flipAnimation = keyframes`
  0% { transform: perspective(400px) rotateY(0deg); }
  100% { transform: perspective(400px) rotateY(360deg); }
`;

const LoadingIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  display: inline-block;
  animation: ${flipAnimation} 2s infinite linear;
`;

const StatusIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  color: ${(props) => props.status === 'success' ? '#5cb85c' : '#d9534f'};
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 25px;
`;

const CloseButton = styled.button`
  background: #041E42;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.2s;

  &:hover { opacity: 0.9; }
`;

export default function TransactionModal() {
  const { txState, closeTxModal } = useStateContext();

  if (!txState.show) return null;

  return (
    <Overlay>
      <ModalBox>
        {txState.status === 'loading' && <LoadingIcon>📖</LoadingIcon>}
        {txState.status === 'success' && <StatusIcon status="success">✅</StatusIcon>}
        {txState.status === 'error' && <StatusIcon status="error">❌</StatusIcon>}
        
        <Message>{txState.message}</Message>
        
        {txState.status !== 'loading' && (
          <CloseButton onClick={closeTxModal}>Close</CloseButton>
        )}
      </ModalBox>
    </Overlay>
  );
}