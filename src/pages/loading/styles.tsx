import styled from 'styled-components';
import ImageLogin from '../../assets/LOGIN.webp';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url(${ImageLogin});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.5;
`;

export const Loading = styled.img`
    width: 200;
    height: 200;
`;
