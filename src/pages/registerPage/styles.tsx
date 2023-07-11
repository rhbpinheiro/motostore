import styled from 'styled-components';
import { Button } from '../register/styles';

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export const DescContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.h2`
    font-size: 35;
    color: rgb(166, 136, 54);
`;

export const IconButton = styled.div`
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

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


export const ButtonModal = styled(Button)`
    background-color: rgb(166, 136, 54);
`;

export const GroupButtons = styled.div`
    width: 70px;
    display: flex;
    justify-content: space-between;
`;

export const RegistrationOptions = styled.div`

`;

export const DivButton = styled.div`
  display: flex;
  width: 40px;
  height: 30px;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid rgb(166, 136, 54);
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color:  rgb(147, 183, 146);
  }
`
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
