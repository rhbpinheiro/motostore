import * as C from './styles';

import { useEffect, useState } from 'react';
import ListItem from '../../components/List';
import { collection, addDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import DefaultLayout from '../../components/LayoutContainer/indes';
import { db } from '../../logic/firebase/config/firebaseconfig';
import { Input } from './styles';
import Swal from 'sweetalert2';

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
            displacement: motocycle.displacement,
        };
        if (sale.client === '') {
            Swal.fire({
                title: 'Atenção!!!',
                text: 'Todos os campor devem ser preenchidos.',
                icon: 'warning',
                showConfirmButton: true,
            });
            return;
        }
        if (sale.client !== '') {
            try {
                Swal.fire({
                    title: 'Atenção!',
                    text: 'Deseja confirmar a venda?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#35d630',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar!',
                    cancelButtonText: 'Cancelar!',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        setIsLoading(true);
                        await addDoc(collection(db, 'sales'), sale);
                        Swal.fire('Venda realizada com sucesso'!);
                        navigate('/home');
                    }
                });

                setclientName('');
            } catch (error) {
                Swal.fire({
                    title: 'Erro!!!',
                    text: 'Erro ao ralizar a venda.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            } finally {
                setIsLoading(false);
            }
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
