import styled from 'styled-components';

export const ItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-bottom: 1px solid gray;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 4px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 4px;
`;

export const BuyButton = styled.button`
  background-color: #ff5722;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;