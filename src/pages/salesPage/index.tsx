import { useEffect, useState } from 'react';
import Content from '../../components/Content';
import ListItem from '../../components/List';
import * as C from './styles';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../logic/firebase/config/firebaseconfig';
import { useLocation } from 'react-router-dom';
import Header from '../homePage/header/Index';

interface Motocycle {
    id: string;
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description: string;
    price: string;
}
export default function SalesPage() {
    const [motocycles, setMotocycles] = useState<Motocycle[]>([]);
    const location = useLocation();
    const motorcycle = location.state?.motorcycle;

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
          <Header/>
            <C.Content>
                {motocycles.map((motocycle) => (
                    <ListItem
                        key={motocycle.id}
                        imageUrl={motocycle.imageUrl}
                        name={motocycle.name}
                        brand={motocycle.brand}
                        displacement={motocycle.displacement}
                        description={motocycle.description}
                        price={motocycle.price}
                        onBuy={() => {}}
                    />
                ))}
            </C.Content>
        </C.Container>
    );
}