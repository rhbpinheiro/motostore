import { useLocation, useNavigate } from 'react-router-dom';
import MotorcycleCard from '../../components/Card';
import * as C from './styles';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../logic/firebase/config/firebaseconfig';
import IconUnorderedList from '../../components/Icons/IconUnorderedList';
import IconGrid3x3Gap from '../../components/Icons/IconGrid3x3Gap';
import ListItemHor from '../../components/ListItem/List';
import DefaultLayout from '../../components/LayoutContainer/indes';
import { Button } from '../login/styles';
import IconBxEditAlt from '../../components/Icons/IconBxEditAlt';
import IconDelete from '../../components/Icons/IconDelete';
import IconDeleteOutline from '../../components/Icons/IconDeleteOutline';
import { Loading } from '../loading/styles';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import IconBxDetail from '../../components/Icons/IconBxDetail';

interface Motocycle {
    id: string;
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description: string;
}

export default function HomePage() {
    const savedState = localStorage.getItem('estado');
    const initialState = savedState ? JSON.parse(savedState) : true;
    const navigate = useNavigate();
    const [changeLayout, setChangeLayout] = useState<boolean>(initialState);
    const [motocycles, setMotocycles] = useState<any[]>(
        getStoredMotocycles() || []
    );
    localStorage.setItem('estado', JSON.stringify(changeLayout));

    function handleChangeLayout() {
        setChangeLayout((prevLayout) => !prevLayout);
    }

    const handleDetails = (motorcycle: Motocycle) => {
        navigate(`/home/details/:${motorcycle.id}`, { state: { motorcycle } });
    };

    useEffect(() => {
        localStorage.setItem('motocycles', JSON.stringify(motocycles));
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/');
            }
        });

        const getMotocycles = async () => {
            const motocyclesRef = collection(db, 'motocycles');

            try {
                const querySnapshot = await getDocs(motocyclesRef);
                const motocyclesData: any = [];

                querySnapshot.forEach((doc: any) => {
                    const motocycleData = doc.data();
                    const motocycleId = doc.id;
                    motocyclesData.push({ id: motocycleId, ...motocycleData });
                });
                setMotocycles(motocyclesData);
            } catch (error) {
                console.log('Erro ao obter motocicletas:', error);
            }
        };

        getMotocycles();
    }, []);

    function getStoredMotocycles() {
        const storedMotocycles = localStorage.getItem('motocycles');
        return storedMotocycles ? JSON.parse(storedMotocycles) : null;
    }

    return (
        <DefaultLayout>
            <C.OffersWeek>
                <C.Titulo>Ofertas Da Semana</C.Titulo>
                {changeLayout ? (
                    <C.ToogleLayout onClick={handleChangeLayout}>
                        <IconUnorderedList height={25} width={25} />
                    </C.ToogleLayout>
                ) : (
                    <C.ToogleLayout onClick={handleChangeLayout}>
                        <IconGrid3x3Gap height={25} width={25} />
                    </C.ToogleLayout>
                )}
            </C.OffersWeek>
            {motocycles.length === 0 ? (
                <C.Container>
                    <IconDeleteOutline height={45} width={45} />
                    <C.Text>Nenhuma moto encontrada</C.Text>
                </C.Container>
            ) : (
                <div>
                    {changeLayout ? (
                        <C.MotorcycleListContainer>
                            {motocycles.map((motocycle) => (
                                <MotorcycleCard
                                    key={motocycle.id}
                                    imageUrl={motocycle.imageUrl}
                                    name={motocycle.name}
                                    brand={motocycle.brand}
                                    displacement={motocycle.displacement}
                                    price={motocycle.price}
                                    onBuy={() => handleDetails(motocycle)}
                                />
                            ))}
                        </C.MotorcycleListContainer>
                    ) : (
                        <div>
                            {motocycles.map((motocycle) => (
                                <C.DivListContainer>
                                    <ListItemHor
                                        key={motocycle.id}
                                        id={motocycle.id}
                                        imageUrl={motocycle.imageUrl}
                                        name={motocycle.name}
                                        brand={motocycle.brand}
                                        displacement={motocycle.displacement}
                                        children={
                                        <C.IconButton onClick={() => handleDetails(motocycle)}>
                                          <IconBxDetail width={35} height={35} />
                                      </C.IconButton>
                                        }
                                    />
                                </C.DivListContainer>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </DefaultLayout>
    );
}
