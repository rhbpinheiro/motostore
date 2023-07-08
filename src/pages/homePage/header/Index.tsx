import * as C from './styles';
import Logo from '../../../assets/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../../logic/firebase/config/firebaseconfig';

export default function Header() {
    async function handleLogout() {
        await signOut(auth).then(() => {
            localStorage.removeItem('@detailUser');
        });
    }
    
    return (
        <C.Container>
            <C.Header>
                <C.ImageLogo src={Logo} alt="logo" />
                <C.Menu>
                    <C.MenuItem to="/motos">Motos</C.MenuItem>
                    <C.MenuItem to="/cadastro">Cadastro</C.MenuItem>
                    <C.MenuItem to="/vendas">Vendas</C.MenuItem>
                    <C.MenuItem to="/" onClick={handleLogout}>
                        Sair
                    </C.MenuItem>
                </C.Menu>
            </C.Header>
        </C.Container>
    );
}
