import * as C from './styles';

import { useEffect, useState } from 'react';
import ListItem from '../../components/List';
import { collection, addDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import DefaultLayout from '../../components/LayoutContainer/indes';
import { db } from '../../logic/firebase/config/firebaseconfig';
import { Input } from './styles';

interface Motocycle {
    id: string;
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description: string;
    price: string;
}

interface Sale {
    id?: string;
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    date: Date;
    client: string;
    price: string;
}

export default function DetailsPage() {
    const navigate = useNavigate();
    const [motocycles, setMotocycles] = useState<Motocycle[]>([]);
    const location = useLocation();
    const motocycle = location.state?.motorcycle as Motocycle;
    const [clientName, setclientName] = useState('');
    const [saleAmount, setSaleAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const auth = getAuth();
    const currentDate = new Date(Date.now());
    const formattedDate = `${currentDate
        .getDate()
        .toString()
        .padStart(2, '0')}/${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${currentDate.getFullYear()}`;

    const handleBuy = async () => {
        const user = auth.currentUser;
        if (!user) {
            navigate('/');
            return;
        }

        const sale: Sale = {
            date: new Date(),
            client: clientName,
            imageUrl: motocycle.imageUrl,
            name: motocycle.name,
            brand: motocycle.brand,
            price: motocycle.price,
            displacement: motocycle.displacement
        };
        if (sale.client !== '') {
            const conf = window.confirm('Deseja Finalizar a venda?');
            if (conf) {
                try {
                    setIsLoading(true);
                    const docRef = await addDoc(collection(db, 'sales'), sale);
                    console.log('Sale added with ID: ', docRef.id);
                    // Reset input fields
                    setclientName('');
                    setSaleAmount(0);
                } catch (error) {
                    console.error('Error adding sale: ', error);
                } finally {
                    navigate('/home');
                    setIsLoading(false);
                }
            }
        } else {
            window.alert('Preencha os todos os campos antes de confirmar.');
        }
    };
  

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/');
            }
            console.log(user);
        });
    }, []);

    return (
        <DefaultLayout>
            <C.Container>
                <ListItem
                    key={motocycle.id}
                    imageUrl={motocycle.imageUrl}
                    name={motocycle.name}
                    brand={motocycle.brand}
                    displacement={motocycle.displacement}
                    description={motocycle.description}
                    price={parseInt(motocycle.price).toFixed(2)}
                    onBuy={handleBuy}
                    loagind={isLoading}
                >
                    <>
                        <C.DivInputSeller>
                            <C.LabelSeller htmlFor="sellerInput">
                                Cliente:
                            </C.LabelSeller>
                            <Input
                                type="text"
                                id="sellerInput"
                                placeholder="Digite o nome do cliente"
                                value={clientName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setclientName(e.target.value)}
                            />
                        </C.DivInputSeller>

                        <C.DescriptionData>
                            Data: {formattedDate}
                        </C.DescriptionData>
                    </>
                </ListItem>
            </C.Container>
        </DefaultLayout>
    );
}
