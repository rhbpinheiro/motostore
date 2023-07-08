import { useNavigate } from 'react-router-dom';
import * as C from './styles';
import ListItem from '../List';
import { useState } from 'react';
import IconGrid3x3Gap from '../Icons/IconGrid3x3Gap';

interface CardProps {
    image: string;
    name: string;
    brand: string;
    displacement: string;
}

interface Motorcycle {
    image: string;
    name: string;
    brand: string;
    displacement: string;
}

const motorcycles: Motorcycle[] = [
    {
        image: 'https://www.fortmotos.com.br/assets/uploads/nt_motos_imagens/10484-Galeria-510x320-4.jpg?v=1688745689',
        name: 'FORZA 350',
        brand: 'Honda',
        displacement: '330cc',
    },
    {
        image: 'https://www.fortmotos.com.br/assets/uploads/nt_motos_cores/99246-cores-560-x-340-Preto-----Graphite-Black.png?v=1688748126',
        name: 'CB 1000R BLACK EDITION',
        brand: 'Honda',
        displacement: '998,4cc',
    },
    {
        image: 'https://www.fortmotos.com.br/assets/uploads/nt_motos_cores/78823-cores-560-x-340-Vermelho-Met--lico-----Candy-Chromosphere-Red.png?v=1688748251',
        name: 'CB 1000R',
        brand: 'Honda',
        displacement: '998,4 cc',
    },
    {
        image: 'https://www.fortmotos.com.br/assets/uploads/nt_motos_cores/17276-cores-560-x-340-AZUL-PEROLADO.png?v=1688748307',
        name: 'CG 160 START',
        brand: 'Honda',
        displacement: '162,7cc',
    },
    {
        image: 'https://www.fortmotos.com.br/assets/uploads/nt_motos_cores/56159-cores-560-x-340-VERDE.png?v=1688748392',
        name: 'CBR 650R',
        brand: 'Honda',
        displacement: '649cc',
    },
    {
        image: 'https://www.fortmotos.com.br/assets/uploads/nt_motos_cores/32122-cores-560-x-340-Vermelho-----Grand-Prix-Red-NC-750X-DCT.png?v=1688748505',
        name: 'NC 750X',
        brand: 'Honda',
        displacement: '745cc',
    },

    // Adicione os dados das outras motos aqui
];

export default function MotorcycleCard({
    image,
    name,
    brand,
    displacement,
}: CardProps) {
    const navigate = useNavigate();
    const handleBuy = (motorcycle: Motorcycle) => {
        navigate('/vendas', { state: { motorcycle } });
    };
    const [changeLayout, setChangeLayout] = useState(true);
    function handleChangeLayout() {
        setChangeLayout((prevLayout) => !prevLayout);
    }

    const showAsCard = false;
    return (
        <C.Container>
            <C.OffersWeek>
                <C.Titulo>Ofertas Da Semana</C.Titulo>

                <IconGrid3x3Gap />
            </C.OffersWeek>
            {changeLayout ? (
                <C.MotorcycleListContainer>
                    {motorcycles.map((motorcycle, index) => (
                        <C.CardContainer key={index}>
                            <C.Image src={motorcycle.image} alt="Motorcycle" />
                            <C.Title>{motorcycle.name}</C.Title>
                            <C.Description>
                                Marca: {motorcycle.brand}
                            </C.Description>
                            <C.Description>
                                Cilindrada: {motorcycle.displacement}
                            </C.Description>
                            <C.BuyButton onClick={() => handleBuy(motorcycle)}>
                                Vender
                            </C.BuyButton>
                        </C.CardContainer>
                    ))}
                </C.MotorcycleListContainer>
            ) : (
                <div>
                    {motorcycles.map((motorcycle, index) => (
                        <ListItem
                            image={motorcycle.image}
                            name={motorcycle.name}
                            brand={motorcycle.brand}
                            displacement={motorcycle.displacement}
                            onBuy={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                    ))}
                </div>
            )}
        </C.Container>
    );
}
