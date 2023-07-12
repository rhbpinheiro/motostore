import * as C from './styles';
import { useEffect, useState } from 'react';
import ListItem from '../../components/List';
import { collection, getDocs } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import DefaultLayout from '../../components/LayoutContainer/indes';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../logic/firebase/config/firebaseconfig';
import IconDeleteOutline from '../../components/Icons/IconDeleteOutline';
import ListItemHor from '../../components/ListItem/List';

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
    date: Date;
    client: string;
    amount: number;
    motocycle: Motocycle;
}

export default function SalesPage() {
    const navigate = useNavigate();
    const savedState = localStorage.getItem('estado');
    const initialState = savedState ? JSON.parse(savedState) : true;
    const [sales, setSales] = useState<Sale[]>(getStordSales() || []);
    function getStordSales() {
        const storedSales = localStorage.getItem('sales');
        return storedSales ? JSON.parse(storedSales) : null;
    }
    const currentDate = new Date(Date.now());
    const formattedDate = `${currentDate
        .getDate()
        .toString()
        .padStart(2, '0')}/${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${currentDate.getFullYear()}`;

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/');
            }
        });

        const getSales = async () => {
            const data = await getDocs(collection(db, 'sales'));
            const saleData = data.docs.map((doc) => ({
                ...(doc.data() as Sale),
                id: doc.id,
            }));
            setSales(saleData);
        };
        getSales();
    }, []);
    return (
        <DefaultLayout>
            <C.Titulo>Lista de Vendas</C.Titulo>
            {sales.length === 0 ? (
                <C.Container>
                    <IconDeleteOutline height={45} width={45} />
                    <C.Text>Nenhuma venda encontrada</C.Text>
                </C.Container>
            ) : (
                <div>
                    <C.MotorcycleListContainer>
                        {sales.map((sale) => (
                            <ListItemHor
                                key={sale.id}
                                id={sale.id}
                                imageUrl={sale.imageUrl}
                                name={sale.name}
                                brand={sale.brand}
                                children={
                                    <>
                                        <C.Description>
                                            Cliente: {sale.client}
                                        </C.Description>
                                        <C.Description>
                                            Quantidade: {sale.amount}
                                        </C.Description>
                                        {/* <C.Description>
                                            Data: {sale.date}
                                        </C.Description> */}
                                    </>
                                }
                            />
                        ))}
                    </C.MotorcycleListContainer>
                </div>
            )}
        </DefaultLayout>
    );
}
