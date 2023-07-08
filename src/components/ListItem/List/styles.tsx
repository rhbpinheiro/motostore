import styled from 'styled-components';

export const ListItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    width: 100%;
    padding: 16px;
    border: 1px solid rgb(166, 136, 54);
    border-radius: 15px;
    margin-bottom: 8px;
`;

export const Image = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 15px;
    margin-right: 16px;
`;

export const Title = styled.h3`
    font-size: 18px;
    color: #333;
    margin-right: 16px;
`;

export const Description = styled.p`
    font-size: 14px;
    color: #666;
    margin-right: 16px;
`;

export const BuyButton = styled.button`
    background-color: #ff5722;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;
