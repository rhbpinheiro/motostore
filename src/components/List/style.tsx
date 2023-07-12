import styled from 'styled-components';

export const ItemContainer = styled.li`
    width: 400;
    display: flex;
    flex-direction: row;
    padding: 8px;
    border-bottom: 1px solid gray;
    margin-top: 90px;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const ColInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Image = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 4px;
    margin-right: 16px;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

export const Price = styled.p`
    font-size: 14px;
    color: green;
    margin-bottom: 4px;
`;

export const BuyButton = styled.button`
    background-color: #ff5722;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 8px;
`;
