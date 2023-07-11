import React, { useState } from 'react';
import { useEffect } from 'react';
import * as C from './styles';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../../logic/firebase/config/firebaseconfig';
import { useLocation } from 'react-router-dom';
import ListItemHor from '../../components/ListItem/List';
import IconAddR from '../../components/Icons/IconAddR';
import Modal from '../../components/Modal';
import { Input } from '../register/styles';
import DefaultLayout from '../../components/LayoutContainer/indes';
import IconBxEditAlt from '../../components/Icons/IconBxEditAlt';
import IconDelete from '../../components/Icons/IconDelete';
import IconMotorbikeLine from '../../components/Icons/IconMotorbikeLine';
import IconUserAdd from '../../components/Icons/IconUserAdd';
import RegisterUser from '../../components/RegisrerUser/Index';

interface Motocycle {
    id?: string;
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description: string;
    price: string;
}

interface User {
    id?: string;
    imageUrl: string;
    name: string;
    email: string;
    phone: string;
}

export default function ProductPage() {
    const [motocycles, setMotocycles] = useState<Motocycle[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [changeLayout, setChangeLayout] = useState<boolean>(true);

    function handleChangeLayout() {
        setChangeLayout((prevLayout) => !prevLayout);
    }

    const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motocycle>({
        imageUrl: '',
        name: '',
        brand: '',
        displacement: '',
        description: '',
        price: '',
    });
    const [selectedUser, setSelectedUser] = useState<User>({
        imageUrl: '',
        name: '',
        email: '',
        phone: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (changeLayout) {
            setSelectedMotorcycle(
                (prevMotorcycle) =>
                    ({
                        ...prevMotorcycle,
                        [name]: value,
                    } as Motocycle)
            );
        } else {
            setSelectedUser(
                (prevUser) =>
                    ({
                        ...prevUser,
                        [name]: value,
                    } as User)
            );
        }
    };

    const handleDelete = async (motocycle: Motocycle) => {
        if (window.confirm('Tem certeza que deseja excluir este item?')) {
            try {
                const motoCollection = collection(db, 'motocycles');
                const docRef = doc(motoCollection, selectedMotorcycle.id);
                await deleteDoc(docRef);

                // setMotocycles((prevMotocycles) =>
                //     prevMotocycles.filter((item) => item.id !== motocycle.id)
                // );
                window.location.reload();
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
            }
        }
    };

    const handleUpdateMotorcycle = async () => {
        if (selectedMotorcycle) {
            try {
                setIsLoading(true);
                const motoCollection = collection(db, 'motocycles');
                const docRef = doc(motoCollection, selectedMotorcycle.id);
                const {
                    imageUrl,
                    name,
                    brand,
                    displacement,
                    description,
                    price,
                } = selectedMotorcycle;
                await updateDoc(docRef, {
                    imageUrl,
                    name,
                    brand,
                    displacement,
                    description,
                    price,
                });

                setMotocycles((prevMotocycles) =>
                    prevMotocycles.map((motocycle) =>
                        motocycle.id === selectedMotorcycle.id
                            ? selectedMotorcycle
                            : motocycle
                    )
                );

                handleCloseModal();
                window.location.reload();
            } catch (error) {
                console.error('Erro ao atualizar produto:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    const handleUpdateUser = async () => {
        if (selectedUser) {
            try {
                setIsLoading(true);
                const userCollection = collection(db, 'users');
                const docRef = doc(userCollection, selectedUser.id);
                const { imageUrl, name, email, phone } = selectedUser;
                await updateDoc(docRef, {
                    imageUrl,
                    name,
                    email,
                    phone,
                });

                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === selectedUser.id ? selectedUser : user
                    )
                );

                handleCloseModal();
                window.location.reload();
            } catch (error) {
                console.error('Erro ao atualizar produto:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleAddMotorcycle = async () => {
        if (selectedMotorcycle) {
            try {
                setIsLoading(true);
                const {
                    imageUrl,
                    name,
                    brand,
                    displacement,
                    description,
                    price,
                } = selectedMotorcycle;
                const docRef = await addDoc(collection(db, 'motocycles'), {
                    imageUrl,
                    name,
                    brand,
                    displacement,
                    description,
                    price,
                });
                console.log('Produto adicionado com ID:', docRef.id);

                handleCloseModal();
            } catch (error) {
                console.error('Erro ao adicionar produto:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleAddUser = async () => {
        if (selectedUser) {
            try {
                setIsLoading(true);
                const { imageUrl, name, email, phone } = selectedUser;
                const docRef = await addDoc(collection(db, 'users'), {
                    imageUrl,
                    name,
                    email,
                    phone,
                });
                console.log('Produto adicionado com ID:', docRef.id);

                handleCloseModal();
            } catch (error) {
                console.error('Erro ao adicionar produto:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(collection(db, 'users'));
            const usersData = data.docs.map((doc) => ({
                ...(doc.data() as User),
                id: doc.id,
            }));
            setUsers(usersData);
            console.log(usersData);
        };
        getUsers();
    }, []);

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

    const handleEditProduct = (motocycle: Motocycle) => {
        setSelectedMotorcycle(motocycle);
        setModalOpen(true);
    };
    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedMotorcycle({
            imageUrl: '',
            name: '',
            brand: '',
            displacement: '',
            description: '',
            price: '',
        });
        setSelectedUser({
            imageUrl: '',
            name: '',
            email: '',
            phone: '',
        });
        setModalOpen(false);
    };

    return (
        <DefaultLayout>
            <C.Title>Cadastro</C.Title>
            <C.GroupButtons>
                <C.DivButton onClick={handleChangeLayout}>
                    <IconMotorbikeLine height={30} width={30} />
                </C.DivButton>
                <C.DivButton onClick={handleChangeLayout}>
                    <IconUserAdd height={30} width={30} />
                </C.DivButton>
            </C.GroupButtons>
            {changeLayout ? (
                <div>
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
                                    <C.IconButton>
                                        <IconBxEditAlt
                                            height={25}
                                            width={25}
                                            onClick={() =>
                                                handleEditProduct(motocycle)
                                            }
                                        />
                                    </C.IconButton>
                                    <C.IconButton>
                                        <IconDelete
                                            height={25}
                                            width={25}
                                            onClick={() =>
                                                handleDelete(motocycle)
                                            }
                                        />
                                    </C.IconButton>
                                </C.GroupButtons>
                            }
                        />
                    ))}
                </div>
            ) : (
                <div>
                    <C.DescContent>
                        <C.Title>Lista de Usuários</C.Title>
                        <C.IconButton onClick={handleOpenModal}>
                            <IconAddR height={25} width={25} />
                        </C.IconButton>
                    </C.DescContent>
                    {users.map((user) => (
                        <RegisterUser
                            key={user.id}
                            imageUrl={user.imageUrl}
                            name={user.name}
                            email={user.email}
                            phone={user.phone}
                            onAdd={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                            children={
                                <C.GroupButtons>
                                    <C.IconButton>
                                        <IconBxEditAlt
                                            height={25}
                                            width={25}
                                            onClick={() => {
                                                handleEditUser(user);
                                            }}
                                        />
                                    </C.IconButton>
                                    <C.IconButton>
                                        <IconDelete
                                            height={25}
                                            width={25}
                                            onClick={
                                                () => {}
                                                // handleDelete(motocycle)
                                            }
                                        />
                                    </C.IconButton>
                                </C.GroupButtons>
                            }
                        />
                    ))}
                </div>
            )}

            <Modal open={modalOpen} onClose={handleCloseModal}>
                {changeLayout ? (
                    <C.ModalContent onClick={(e: any) => e.stopPropagation()}>
                        <Input
                            type="text"
                            name="imageUrl"
                            placeholder="URL da imagem"
                            value={selectedMotorcycle?.imageUrl}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={selectedMotorcycle?.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="text"
                            name="brand"
                            placeholder="Marca"
                            value={selectedMotorcycle?.brand}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="text"
                            name="description"
                            placeholder="Descrição"
                            value={selectedMotorcycle?.description}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="text"
                            name="displacement"
                            placeholder="Cilindrada"
                            value={selectedMotorcycle?.displacement}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="text"
                            name="price"
                            placeholder="Preço"
                            value={selectedMotorcycle?.price}
                            onChange={handleInputChange}
                        />
                        {selectedMotorcycle?.id ? (
                            <C.ButtonModal
                                onClick={handleUpdateMotorcycle}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enviando...' : 'Editar'}
                            </C.ButtonModal>
                        ) : (
                            <C.ButtonModal
                                onClick={handleAddMotorcycle}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enviando...' : 'Cadastrar'}
                            </C.ButtonModal>
                        )}
                    </C.ModalContent>
                ) : (
                    <C.ModalContent onClick={(e: any) => e.stopPropagation()}>
                        <Input
                            type="text"
                            name="imageUrl"
                            placeholder="Url da Imagem"
                            value={selectedUser?.imageUrl}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={selectedUser.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={selectedUser.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="text"
                            name="phone"
                            placeholder="Telefone"
                            value={selectedUser.phone}
                            onChange={handleInputChange}
                        />
                        {selectedUser?.id ? (
                            <C.ButtonModal
                                onClick={handleUpdateUser}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enviando...' : 'Editar'}
                            </C.ButtonModal>
                        ) : (
                            <C.ButtonModal
                                onClick={handleAddUser}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enviando...' : 'Cadastrar'}
                            </C.ButtonModal>
                        )}
                    </C.ModalContent>
                )}
            </Modal>
        </DefaultLayout>
    );
}
