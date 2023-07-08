import Loading from '../../assets/loading.gif';
import * as C from './styles';

export default function Carregando() {
    return (
        <C.Container>
            <C.Loading src={Loading} alt="Loading" />
        </C.Container>
    );
}
