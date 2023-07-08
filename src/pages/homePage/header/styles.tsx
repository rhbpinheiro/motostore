import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.header`
    width: 100vw;
    position: fixed;
    display: flex;
    justify-content: center;
    background-color: white;

`;

export const Header = styled.div`
    height: 85px;
    width: 1000px;
    padding: 0 20px 0 20px;
    border-bottom: 1px solid rgb(166, 136, 54);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
`;

export const ImageLogo = styled.img`
    width: 80px;
    height: 80px;
    top: -90px;
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`;

export const Menu = styled.nav`
    display: flex;
    justify-content: space-around;
`;
export const MenuItem = styled(Link)`
    text-decoration: none;
    display: flex;
    margin-left: 15px;
    color: rgb(166, 136, 54);
    font-weight: 500;
    font-size: 18px;
`;
