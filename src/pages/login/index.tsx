import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import Loading from '../loading/Loading';
import { auth } from '../../logic/firebase/config/firebaseconfig';
import * as C from './styles';
import Logo from '../../assets/logo.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/home');
            } else {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, []);

    async function handleSignIn(e: any) {
        e.preventDefault();

        await signInWithEmailAndPassword(email, password);

        if (email && password) {
            Swal.fire({
                title: 'Sucesso!!!',
                text: 'Email e senha confirmados.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <C.Container>
            <C.ComponentLogin>
                <C.ImageLogo src={Logo} alt="logo" />
                <C.Title>Login</C.Title>
                <C.Form onSubmit={handleSignIn}>
                    <C.Input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                    <C.Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                    <C.Button type="submit" onClick={handleSignIn}>
                        Login
                    </C.Button>
                    <C.Register>
                        Não tem acesso?{' '}
                        <C.LinkRegister to="/signup">
                            Cadastre-se
                        </C.LinkRegister>
                    </C.Register>
                </C.Form>
            </C.ComponentLogin>
        </C.Container>
    );
}
