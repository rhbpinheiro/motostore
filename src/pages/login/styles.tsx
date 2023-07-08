import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ImageLogin from '../../assets/LOGIN.webp';

export const Container = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(${ImageLogin});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden; /* Adicione isso para ocultar o conteúdo que ultrapassa o contêiner */

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(131, 130, 130, 0.8);
    }
`;

export const ImageLogo = styled.img`
    width: 180px;
    height: 180px;
    position: absolute;
    top: -90px;
    @media (max-width: 768px) {
        width: 130px;
        height: 130px;
        top: -60px;
    }
`;

export const ComponentLogin = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 350px;
    background-color: rgb(255, 232, 169);
    border-radius: 10px;
    opacity: 0.8;
    @media (max-width: 768px) {
        width: 250px;
    }
`;

export const Title = styled.h1`
    font-size: 30px;
    margin-bottom: 16px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    padding: 8px;
    margin-bottom: 8px;
    border: none;
    outline: none;
    border-radius: 10px;
`;

export const Button = styled.button`
    padding: 8px 16px;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 10px;
`;

export const Register = styled.div`
    margin-top: 10px;
    font-size: 15px;
`;

export const LinkRegister = styled(Link)`
    text-decoration: none;
    color: #0c0c69;
    font-weight: 700;
`;
