import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export const ContentContainer = styled.div`
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Text = styled.h3`
    font-size: 15px;
    color: rgb(166, 136, 54);
`;

export const MotorcycleListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    gap: 30px;
    justify-content: center;
    align-items: flex-start;
`;

export const OffersWeek = styled.div`
    width: 100%;
    display: flex;

    padding: 20px 85px 20px 0;
    justify-content: space-between;
`;

export const ToogleLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const Titulo = styled.h2`
    font-size: 35;
    color: rgb(166, 136, 54);
    text-align: center;
`;
