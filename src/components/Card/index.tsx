import { useNavigate } from 'react-router-dom';
import * as C from './styles';
import ListItem from '../List';
import { useEffect, useState } from 'react';
import IconGrid3x3Gap from '../Icons/IconGrid3x3Gap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../logic/firebase/config/firebaseconfig';

interface CardProps {
    image: string;
    name: string;
    brand: string;
    displacement: string;
}

interface Motocycle {
    id: string;
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
}

export default function MotorcycleCard({
    image,
    name,
    brand,
    displacement,
}: CardProps) {
    const navigate = useNavigate();
    const handleBuy = (motorcycle: Motocycle) => {
        navigate('/vendas', { state: { motorcycle } });
    };

    const [changeLayout, setChangeLayout] = useState<boolean>(true);
    const [motocycles, setMotocycles] = useState<Motocycle[]>([]);

    useEffect(() => {
        const getMotocycles = async () => {
            const data = await getDocs(collection(db, 'motocycles'));
            const motocycleData = (await data).docs.map((doc) => ({
                ...(doc.data() as Motocycle),
                id: doc.id,
            }));
            setMotocycles(motocycleData);
        };
        getMotocycles();
    }, []);

    return (
        <C.Container>
            <C.OffersWeek>
                <C.Titulo>Ofertas Da Semana</C.Titulo>
                <IconGrid3x3Gap />
            </C.OffersWeek>

            {!changeLayout ? (
                <C.MotorcycleListContainer>
                    {motocycles.map((motocycle) => (
                        <C.CardContainer key={motocycle.id}>
                            <C.Image src={motocycle.imageUrl} alt="Motorcycle" />
                            <C.Title>{motocycle.name}</C.Title>
                            <C.Description>
                                Marca: {motocycle.brand}
                            </C.Description>
                            <C.Description>
                                Cilindrada: {motocycle.displacement}
                            </C.Description>
                            <C.BuyButton onClick={() => handleBuy(motocycle)}>
                                Vender
                            </C.BuyButton>
                        </C.CardContainer>
                    ))}
                </C.MotorcycleListContainer>
            ) : (
                <div>
                    {motocycles.map((motocycle) => (
                        <ListItem
                            key={motocycle.id}
                            imageUrl={motocycle.imageUrl}
                            name={motocycle.name}
                            brand={motocycle.brand}
                            displacement={motocycle.displacement}
                            onBuy={() => handleBuy(motocycle)}
                        />
                    ))}
                </div>
            )}
        </C.Container>
    );
}
