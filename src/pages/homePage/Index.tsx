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

interface Motocycle {
    id: string;
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description: string;
}

export default function HomePage() {
    const navigate = useNavigate();
    const [changeLayout, setChangeLayout] = useState<boolean>(true);
    const [motocycles, setMotocycles] = useState<any[]>([]);
    function handleChangeLayout() {
        setChangeLayout((prevLayout) => !prevLayout);
    }

    const handleBuy = (motorcycle: Motocycle) => {
        navigate(`/vendas/:${motorcycle.id}`, { state: { motorcycle } });
    };
    useEffect(() => {
        const getMotocycles = async () => {
            const motocyclesRef = collection(db, 'motocycles');

            try {
                const querySnapshot = await getDocs(motocyclesRef);
                const motocyclesData: any = [];

                querySnapshot.forEach((doc: any) => {
                    const motocycleData = doc.data();
                    const motocycleId = doc.id;
                    motocyclesData.push({ id: motocycleId, ...motocycleData });
                    console.log(motocycleId);
                });
                setMotocycles(motocyclesData);
            } catch (error) {
                console.log('Erro ao obter motocicletas:', error);
            }
        };

        getMotocycles();
    }, []);
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
            {changeLayout ? (
                <C.MotorcycleListContainer>
                    {motocycles.map((motocycle) => (
                        <MotorcycleCard
                            key={motocycle.id}
                            imageUrl={motocycle.imageUrl}
                            name={motocycle.name}
                            brand={motocycle.brand}
                            displacement={motocycle.displacement}
                            onBuy={() => handleBuy(motocycle)}
                        />
                    ))}
                </C.MotorcycleListContainer>
            ) : (
                <div>
                    {motocycles.map((motocycle) => (
                        <ListItemHor
                            key={motocycle.id}
                            id={motocycle.id}
                            imageUrl={motocycle.imageUrl}
                            name={motocycle.name}
                            brand={motocycle.brand}
                            displacement={motocycle.displacement}
                            children={
                                <div>
                                   
                                </div>
                            }
                        />
                    ))}
                </div>
            )}
        </DefaultLayout>
    );
}
