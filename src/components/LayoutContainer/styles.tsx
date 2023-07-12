import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface DivMenuProps {
    open: boolean;
}

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
    @media (max-width: 768px) {
        height: 70px;
    }
`;

export const ImageLogo = styled.img`
    width: 80px;
    height: 80px;
    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`;
export const ImageFooter = styled.img`
    width: 200px;
    height: 50px;
    @media (max-width: 768px) {
        width: 120px;
        height: 40px;
    }
`;

export const Menu = styled.nav`
    display: flex;
    justify-content: space-around;
    @media (max-width: 768px) {
        display: none;
    }
`;
export const MenuIcon = styled.nav`
    display: flex;
    justify-content: space-around;
    display: none;
    cursor: pointer;
    @media (max-width: 768px) {
        display: block;
    }
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

export const DivMenu = styled.div<DivMenuProps>`
    display: ${(props) => (props.open ? 'flex' : 'none')};
    flex-direction: column;
    background-color: #f2f2f2;
    padding: 10px;
    position: absolute;
    top: 40px;
    right: 0;
`;

export const MenuItemIcon = styled(Link)`
    padding: 8px;
    cursor: pointer;
    text-decoration: none;
    margin-left: 15px;
    color: rgb(166, 136, 54);
    font-weight: 500;
    font-size: 18px;
`;
