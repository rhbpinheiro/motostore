import { useEffect, useState } from 'react';
import ListItem from '../../components/List';
import { collection, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import DefaultLayout from '../../components/LayoutContainer/indes';

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
    const motocycle = location.state?.motorcycle;

    return (
        <DefaultLayout>
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
        </DefaultLayout>
    );
}
