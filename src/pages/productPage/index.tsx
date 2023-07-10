import React, { useState } from 'react';
import { useEffect } from 'react';
import * as C from './styles';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../logic/firebase/config/firebaseconfig';
import { useLocation } from 'react-router-dom';
import ListItemHor from '../../components/ListItem/List';
import IconAddR from '../../components/Icons/IconAddR';
import Modal from '../../components/Modal';
import { Input } from '../register/styles';
import DefaultLayout from '../../components/LayoutContainer/indes';
import IconBxEditAlt from '../../components/Icons/IconBxEditAlt';
import IconDelete from '../../components/Icons/IconDelete';

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
    const [selectedMotorcycle, setSelectedMotorcycle] =
        useState<Motocycle | null>(null);

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
    
      if (selectedMotorcycle) {
        setSelectedMotorcycle((prevMotorcycle) => ({
          ...prevMotorcycle,
          [name]: value,
        }) as Motocycle | null)
      }
    };

  

    const handleUpdateMotorcycle = async () => {
      if (selectedMotorcycle) {
          try {
              setIsLoading(true);
  
            
              setMotocycles((prevMotocycles) =>
                  prevMotocycles.map((motocycle) =>
                      motocycle.id === selectedMotorcycle.id
                          ? selectedMotorcycle
                          : motocycle
                  )
              );
  
              setSelectedMotorcycle(null);
              handleCloseModal();
          } catch (error) {
              console.error('Erro ao atualizar produto:', error);
          } finally {
              setIsLoading(false);
          }
      }
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

    const handleEdit = (motocycle: Motocycle) => {
      
        setSelectedMotorcycle(motocycle);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <DefaultLayout>
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
                    children={
                        <C.GroupButtons>
                            <IconBxEditAlt
                                height={25}
                                width={25}
                                onClick={() => handleEdit(motocycle)}
                            />
                            <IconDelete height={25} width={25} />
                        </C.GroupButtons>
                    }
                />
            ))}

            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Input
                    type="text"
                    name="imageUrl"
                    placeholder="URL da imagem"
                    value={
                        selectedMotorcycle?.imageUrl || newMotorcycle.imageUrl
                    }
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={selectedMotorcycle?.name || newMotorcycle.name}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="brand"
                    placeholder="Marca"
                    value={selectedMotorcycle?.brand || newMotorcycle.brand}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    value={
                        selectedMotorcycle?.description ||
                        newMotorcycle.description
                    }
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="displacement"
                    placeholder="Cilindrada"
                    value={
                        selectedMotorcycle?.displacement ||
                        newMotorcycle.displacement
                    }
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="price"
                    placeholder="Preço"
                    value={selectedMotorcycle?.price || newMotorcycle.price}
                    onChange={handleInputChange}
                />

                <C.ButtonModal
                    onClick={handleAddMotorcycle}
                    disabled={isLoading}
                >
                    {isLoading ? 'Enviando...' : 'Cadastrar'}
                </C.ButtonModal>
            </Modal>
        </DefaultLayout>
    );
}
