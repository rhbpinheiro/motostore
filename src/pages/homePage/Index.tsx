import MotorcycleCard from '../../components/Card';
import Content from '../../components/Content';
import Header from './header/Index';
import * as C from './styles';

export default function HomePage() {
    return (
        <C.Container>
            <Header />
            <Content>
              
                <MotorcycleCard image={''} name={''} brand={''} displacement={''} />
            </Content>
        </C.Container>
    );
}
