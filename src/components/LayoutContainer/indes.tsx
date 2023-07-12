import * as C from './styles';
import Logo from '../../assets/logo.png';
import MotoStore from '../../assets/motostore.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../logic/firebase/config/firebaseconfig';
import { useNavigate } from 'react-router-dom';

interface LayoutContainerProps {
    children: any;
}

export default function DefaultLayout({ children }: LayoutContainerProps) {
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
