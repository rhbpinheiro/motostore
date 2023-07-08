import { BrowserRouter } from 'react-router-dom';
import MotorcycleCard from '../../components/Card';
import Content from '../../components/Content';
import Header from './header/Index';
import * as C from './styles';

export default function HomePage() {
    return (
        <C.Container>
            <Header />
            <C.ContentContainer>
             <MotorcycleCard id={''} imageUrl={''} name={''} brand={''} displacement={''} description={''}/>
            </C.ContentContainer>
        </C.Container>
    );
}
