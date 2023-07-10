import * as C from './styles';
import Logo from '../../assets/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../logic/firebase/config/firebaseconfig';

interface LayoutContainerProps {
    children: any;
}
async function handleLogout() {
    await signOut(auth).then(() => {
        localStorage.removeItem('@detailUser');
    });
}

export default function DefaultLayout({ children }: LayoutContainerProps) {
    return (
        <C.LayoutContainer>
            <C.Header>
                <C.ImageLogo src={Logo} alt="Logo" />
                <C.Menu>
                    <C.MenuItem to="/home">Moto</C.MenuItem>
                    <C.MenuItem to="/cadastro">Cadastro</C.MenuItem>
                    <C.MenuItem to="/vendas">Vendas</C.MenuItem>
                    <C.MenuItem to="/" onClick={handleLogout}>
                        Sair
                    </C.MenuItem>
                </C.Menu>
            </C.Header>
            <C.Content>{children}</C.Content>
            <C.Footer>MotoStore</C.Footer>
        </C.LayoutContainer>
    );
}
