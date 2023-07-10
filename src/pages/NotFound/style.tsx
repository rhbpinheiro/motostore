import styled from 'styled-components';
import ImageLogin from '../../assets/LOGIN.webp';

export const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    margin: auto;
    color: #1f1d1d;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* Adicione isso para ocultar o conteúdo que ultrapassa o contêiner */

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(227, 222, 222, 0.9);
    }
`;

export const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 100%;
    height: 100%;
    background-image: url(${ImageLogin});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.8;
`;

export const BackButton = styled.button`
    background-color: #6b6361;
    top: 60%;
    position: absolute;
    color: #f7eded;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;
