import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 1000px;
    margin: 0 auto;
`;

export const Header = styled.header`
    height: 85px;
    width: 100%;
    padding: 0 20px;
    border-bottom: 1px solid rgb(166, 136, 54);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
`;

export const ImageLogo = styled.img`
    width: 80px;
    height: 80px;
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

export const Content = styled.div`
    flex: 1;
    padding: 20px;
`;

export const Footer = styled.footer`
    height: 50px;
    width: 100%;
    border-top: 1px solid rgb(166, 136, 54);
    display: flex;
    justify-content: center;
    align-items: center;
`;
