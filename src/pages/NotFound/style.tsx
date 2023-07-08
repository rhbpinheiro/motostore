import styled from 'styled-components';
import ImageLogin from '../../assets/LOGIN.webp';


export const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    margin: auto;
    color: #5e1a1a;
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
    background-color: rgba(131, 130, 130, 0.8);
}
`;

export const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 400px;
    height: 80px;
    border-radius: 10px;
    background-image: url(${ImageLogin});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: .8;
`;
