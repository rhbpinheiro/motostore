import styled from 'styled-components';
export const Container = styled.div`
    width: 1000px;
    margin-top: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const Titulo = styled.h2`
    font-size: 35;
    color: rgb(166, 136, 54);
    text-align: center;
`;

export const MotorcycleListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
`;

export const CardContainer = styled.div`
    width: 250px;
    border: 1px solid rgb(166, 136, 54);
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
    width: 100%;
    height: auto;
    border-radius: 4px;
`;

export const Title = styled.h2`
    font-size: 18px;
    margin: 12px 0;
    color: rgb(166, 136, 54);
`;

export const Description = styled.p`
    font-size: 14px;
    margin-bottom: 8px;
`;

export const BuyButton = styled.button`
    background-color: #ff5722;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;
export const OffersWeek = styled.div`
    width: 100%;
    margin: auto;
    display: flex;
    padding: 20px 0 20px 0;
    justify-content: space-between;
`;

export const ToogleLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
