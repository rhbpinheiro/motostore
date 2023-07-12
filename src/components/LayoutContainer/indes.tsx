import * as C from './styles';
import Logo from '../../assets/logo.png';
import MotoStore from '../../assets/motostore.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../logic/firebase/config/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import IconMenu from '../Icons/IconMenu';
import { useState } from 'react';

interface LayoutContainerProps {
    children: any;
}

export default function DefaultLayout({ children }: LayoutContainerProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = useNavigate();
    async function handleLogout() {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <C.LayoutContainer>
            <C.Header>
                <C.ImageLogo src={Logo} alt="Logo" />
                <C.MenuIcon onClick={handleToggleMenu}>
                    <IconMenu width={30} height={30} />
                </C.MenuIcon>
                <C.DivMenu open={menuOpen}>
                    <C.MenuItemIcon to="/home">Motos</C.MenuItemIcon>
                    <C.MenuItemIcon to="/register">Cadastro</C.MenuItemIcon>
                    <C.MenuItemIcon to="/sales">Vendas</C.MenuItemIcon>
                    <C.MenuItemIcon to="/" onClick={handleLogout}>
                        Sair
                    </C.MenuItemIcon>
                </C.DivMenu>
                <C.Menu>
                    <C.MenuItem to="/home">Motos</C.MenuItem>
                    <C.MenuItem to="/register">Cadastro</C.MenuItem>
                    <C.MenuItem to="/sales">Vendas</C.MenuItem>
                    <C.MenuItem to="/" onClick={handleLogout}>
                        Sair
                    </C.MenuItem>
                </C.Menu>
              
            </C.Header>
            <C.Content>{children}</C.Content>
            <C.Footer>
                <C.ImageFooter src={MotoStore} alt="Logo" />
            </C.Footer>
        </C.LayoutContainer>
    );
}
