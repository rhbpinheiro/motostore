import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  width: 400px;
  height: 350px;
  padding: 20px;
  border-radius: 15px;
`;
