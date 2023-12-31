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
import { useLocation, useNavigate } from 'react-router-dom';
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
import IconDeleteOutline from '../../components/Icons/IconDeleteOutline';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

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

export default function RegisterPage() {
    const navigate = useNavigate();

    const [motocycles, setMotocycles] = useState<Motocycle[]>(
        getStoredMotocycles() || []
    );
    const [users, setUsers] = useState<User[]>(getStoredUsers() || []);
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [changeLayoutMoto, setChangeLayoutMoto] = useState<boolean>(false);
    const [changeLayoutUser, setChangeLayoutUser] = useState<boolean>(false);

    localStorage.setItem('motocycles', JSON.stringify(motocycles));
    localStorage.setItem('users', JSON.stringify(users));
    function getStoredMotocycles() {
        const storedMotocycles = localStorage.getItem('motocycles');
        return storedMotocycles ? JSON.parse(storedMotocycles) : null;
    }
    function getStoredUsers() {
        const storedMotocycles = localStorage.getItem('users');
        return storedMotocycles ? JSON.parse(storedMotocycles) : null;
    }

    function handleChangeLayoutMoto() {
        if (!changeLayoutMoto) {
            setChangeLayoutMoto(true);
            setChangeLayoutUser(false);
        }
    }
    function handleChangeLayoutUser() {
        if (!changeLayoutUser) {
            setChangeLayoutUser(true);
            setChangeLayoutMoto(false);
        }
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
        id: '',
        imageUrl: '',
        name: '',
        email: '',
        phone: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (changeLayoutMoto) {
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

    const handleUpdateMotorcycle = async () => {
        if (
            selectedMotorcycle.brand === '' ||
            selectedMotorcycle.description === '' ||
            selectedMotorcycle.displacement === '' ||
            selectedMotorcycle.imageUrl === '' ||
            selectedMotorcycle.name === '' ||
            selectedMotorcycle.price === ''
        ) {
            Swal.fire({
                position: 'center',
                title: 'Atenção!!!',
                icon: 'warning',
                text: 'Todos os campos devem ser preenchidos.',
                showConfirmButton: true,
            });
            return;
        }
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
                Swal.fire({
                    position: 'center',
                    title: 'Sucesso!!!',
                    icon: 'success',
                    text: 'Produto atualizado com sucesso!.',
                    showConfirmButton: false,
                    timer: 2000,
                });

                handleCloseModal();
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    title: 'Erro!!!',
                    icon: 'error',
                    text: 'Erro ao adicionar produto.',
                    showConfirmButton: true,
                });
            } finally {
                setIsLoading(false);
                window.location.reload();
            }
        } else {
            window.alert('Preencha todos os campos.');
            return;
        }
    };
    const handleUpdateUser = async () => {
        if (
            selectedUser.imageUrl === '' ||
            selectedUser.name === '' ||
            selectedUser.email === '' ||
            selectedUser.phone === ''
        ) {
            Swal.fire({
                position: 'center',
                title: 'Atenção!!!',
                icon: 'warning',
                text: 'Todos os campos devem ser preenchidos.',
                showConfirmButton: true,
            });
            return;
        }
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

                Swal.fire({
                    position: 'center',
                    title: 'Sucesso!!!',
                    icon: 'success',
                    text: 'Usuário editado com sucesso!',
                    showConfirmButton: false,
                    timer: 2000,
                });
                handleCloseModal();
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    title: 'Erro!!!',
                    icon: 'error',
                    text: 'Erro ao atualizar o usuário.',
                    showConfirmButton: true,
                    timer: 2000,
                });
            } finally {
                setIsLoading(false);
                window.location.reload();
            }
        }
    };

    const handleAddMotorcycle = async () => {
        if (
            selectedMotorcycle.brand === '' ||
            selectedMotorcycle.description === '' ||
            selectedMotorcycle.displacement === '' ||
            selectedMotorcycle.imageUrl === '' ||
            selectedMotorcycle.name === '' ||
            selectedMotorcycle.price === ''
        ) {
            Swal.fire({
                position: 'center',
                title: 'Atenção!!!',
                icon: 'warning',
                text: 'Todos os campos devem ser preenchidos.',
                showConfirmButton: true,
            });
            return;
        }
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
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sucesso!!!',
                    text: 'Produto adionada com sucesso!',
                    showConfirmButton: false,
                    timer: 2000,
                });

                handleCloseModal();
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    title: 'Erro!!!',
                    icon: 'error',
                    text: 'Erro ao adicionar o produto.',
                    showConfirmButton: true,
                });
            } finally {
                setIsLoading(false);
                window.location.reload();
            }
        }
    };

    const handleAddUser = async () => {
        if (
            selectedUser.imageUrl === '' ||
            selectedUser.name === '' ||
            selectedUser.email === '' ||
            selectedUser.phone === ''
        ) {
            Swal.fire({
                position: 'center',
                title: 'Atenção!!!',
                icon: 'warning',
                text: 'Todos os campos devem ser preenchidos.',
                showConfirmButton: true,
            });
            return;
        }
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
                Swal.fire({
                    position: 'center',
                    title: 'Sucesso!!!',
                    icon: 'success',
                    text: 'Usuário adicionado com sucesso!',
                    showConfirmButton: false,
                    timer: 2000,
                });
                handleCloseModal();
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    title: 'Rrro!!!',
                    icon: 'error',
                    text: 'Erro ao adicionar usuário.',
                    showConfirmButton: true,
                });
            } finally {
                setIsLoading(false);
                window.location.reload();
            }
        }
    };
    const handleDelete = async (id: string, colecttion: string) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá desfazer isso!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#35d630',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar!',
            cancelButtonText: 'Cancelar!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(doc(db, colecttion, id));
                Swal.fire('Excluido com sucesso!');
                window.location.reload();
            }
        });
    };

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/');
            }
            console.log(user);
        });
        const getMotocycles = async () => {
            const data = await getDocs(collection(db, 'motocycles'));
            const motocycleData = data.docs.map((doc) => ({
                ...(doc.data() as Motocycle),
                id: doc.id,
            }));
            setMotocycles(motocycleData);
        };
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
                <C.DivButton onClick={handleChangeLayoutMoto}>
                    <IconMotorbikeLine height={30} width={30} />
                </C.DivButton>
                <C.DivButton onClick={handleChangeLayoutUser}>
                    <IconUserAdd height={30} width={30} />
                </C.DivButton>
            </C.GroupButtons>

            {changeLayoutMoto ? (
                <div>
                    <C.DescContent>
                        <C.Title>Lista de Motos</C.Title>
                        <C.IconButton onClick={handleOpenModal}>
                            <IconAddR height={25} width={25} />
                        </C.IconButton>
                    </C.DescContent>
                    {motocycles.length === 0 ? (
                        <C.Container>
                            <IconDeleteOutline height={45} width={45} />
                            <C.Text>Nenhuma moto encontrada.</C.Text>
                        </C.Container>
                    ) : (
                        <C.Container>
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
                                                        handleEditProduct(
                                                            motocycle
                                                        )
                                                    }
                                                />
                                            </C.IconButton>
                                            <C.IconButton>
                                                <IconDelete
                                                    height={25}
                                                    width={25}
                                                    onClick={async () => {
                                                        await handleDelete(
                                                            motocycle?.id!,
                                                            'motocycles'
                                                        );
                                                    }}
                                                />
                                            </C.IconButton>
                                        </C.GroupButtons>
                                    }
                                />
                            ))}
                        </C.Container>
                    )}
                </div>
            ) : (
                <div>
                    <C.DescContent>
                        <C.Title>Lista de Usuários</C.Title>
                        <C.IconButton onClick={handleOpenModal}>
                            <IconAddR height={25} width={25} />
                        </C.IconButton>
                    </C.DescContent>
                    {users.length === 0 ? (
                        <C.Container>
                            <IconDeleteOutline height={45} width={45} />
                            <C.Text>Nenhum usuário encontrado.</C.Text>
                        </C.Container>
                    ) : (
                        <C.Container>
                            {users.map((user) => (
                                <RegisterUser
                                    key={user.id}
                                    imageUrl={user.imageUrl}
                                    name={user.name}
                                    email={user.email}
                                    phone={user.phone}
                                    onAdd={function (): void {
                                        throw new Error(
                                            'Function not implemented.'
                                        );
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
                                                    onClick={async () => {
                                                        await handleDelete(
                                                            user?.id!,
                                                            'users'
                                                        );
                                                    }}
                                                />
                                            </C.IconButton>
                                        </C.GroupButtons>
                                    }
                                />
                            ))}
                        </C.Container>
                    )}
                </div>
            )}

            <Modal open={modalOpen} onClose={handleCloseModal}>
                {changeLayoutMoto ? (
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
