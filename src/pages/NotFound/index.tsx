import * as C from './style';
import { useNavigate } from 'react-router';
export default function NotFound(){
    const navigate = useNavigate();
    function back() {
        navigate('/');
    }
    return (
        <C.Container className="container">
            <C.Title>
                <h2>Página não encontrada</h2>
            </C.Title>
            <C.BackButton onClick={back}>Voltar</C.BackButton>
        </C.Container>
    );
};
