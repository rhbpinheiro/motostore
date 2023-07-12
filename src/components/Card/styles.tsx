import styled from 'styled-components';

export const CardContainer = styled.div`
    width: 250px;
    border: 1px solid rgb(166, 136, 54);
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const IconButton = styled.div`
    width: 30px;
    height: 30px;
    cursor: pointer;
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
