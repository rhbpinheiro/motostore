import React, { useState } from 'react';
import { useEffect } from 'react';
import * as C from './styles';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../logic/firebase/config/firebaseconfig';
import { useLocation } from 'react-router-dom';
import Header from '../homePage/header/Index';
import ListItemHor from '../../components/ListItem/List';
import IconAddR from '../../components/Icons/IconAddR';
import Modal from '../../components/Modal';
import { Button, Input } from '../register/styles';

interface Motocycle {
    id?: string;
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description: string;
    price: string;
}

export default function ProductPage() {
    const [motocycles, setMotocycles] = useState<Motocycle[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const motorcycle = location.state?.motorcycle;

    const [newMotorcycle, setNewMotorcycle] = useState<Motocycle>({
        imageUrl: '',
        name: '',
        brand: '',
        displacement: '',
        description: '',
        price: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewMotorcycle((prevMotorcycle) => ({
            ...prevMotorcycle,
            [name]: value,
        }));
    };
    
  const handleAddMotorcycle = async () => {
    if (newMotorcycle.name && newMotorcycle.brand) {
      try {
        setIsLoading(true);

        const docRef = await addDoc(collection(db, 'motocycles'), {
          imageUrl: newMotorcycle.imageUrl,
          name: newMotorcycle.name,
          brand: newMotorcycle.brand,
          displacement: newMotorcycle.displacement,
          description: newMotorcycle.description,
          price: newMotorcycle.price,
        });
        console.log('Produto adicionado com ID:', docRef.id);

        setMotocycles((prevMotocycles) => [
          ...prevMotocycles,
          { ...newMotorcycle, id: docRef.id },
        ]);

        setNewMotorcycle({
          imageUrl: '',
          name: '',
          brand: '',
          displacement: '',
          description: '',
          price: '',
        });

        handleCloseModal();
      } catch (error) {
        console.error('Erro ao adicionar produto:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Realize as ações para lidar com a validação dos campos
    }
  };



    useEffect(() => {
        const getMotocycles = async () => {
            const data = await getDocs(collection(db, 'motocycles'));
            const motocycleData = data.docs.map((doc) => ({
                ...(doc.data() as Motocycle),
                id: doc.id,
            }));
            setMotocycles(motocycleData);
        };
        getMotocycles();
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <C.Container>
            <Header />
            <C.Content>
                <C.DescContent>
                    <C.Title>Lista de Motos</C.Title>
                    <C.IconButton onClick={handleOpenModal}>
                        <IconAddR height={25} width={25} />
                    </C.IconButton>
                </C.DescContent>
                {motocycles.map((motocycle) => (
                    <ListItemHor
                        key={motocycle.id}
                        imageUrl={motocycle.imageUrl}
                        name={motocycle.name}
                        brand={motocycle.brand}
                        displacement={motocycle.displacement}
                    />
                ))}
            </C.Content>

            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Input
                    type="text"
                    name="imageUrl"
                    placeholder="URL da imagem"
                    value={newMotorcycle.imageUrl}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={newMotorcycle.name}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="brand"
                    placeholder="Marca"
                    value={newMotorcycle.brand}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    value={newMotorcycle.description}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="displacement"
                    placeholder="Cilindrada"
                    value={newMotorcycle.displacement}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="price"
                    placeholder="Preço"
                    value={newMotorcycle.price}
                    onChange={handleInputChange}
                />

                <Button onClick={handleAddMotorcycle} disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Cadastrar'}
                </Button>
            </Modal>
        </C.Container>
    );
}
