import * as C from './styles';
import Logo from '../../assets/logo.png';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../logic/firebase/config/firebaseconfig';
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const navigate = useNavigate();

    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);

    function handleSignIn(e: any) {
        e.preventDefault();
        if (
            password === confPassword &&
            email.length > 6 &&
            email.includes('@')
        ) {
            createUserWithEmailAndPassword(email, password);
            navigate('/');
        } else {
            alert('Preencha os campos corretamente');
        }
    }
    if (loading) {
        return <Loading />;
    }

    return (
        <C.Container>
            <C.ComponentLogin>
                <C.ImageLogo src={Logo} alt="logo" />
                <C.Title>Cadastre-se</C.Title>
                <C.Form>
                    <C.Input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                    <C.Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                    <C.Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setConfPassword(e.target.value)
                        }
                    />
                    <C.Button type="submit" onClick={handleSignIn}>
                        Cadastre-se
                    </C.Button>
                    <C.Register>
                        Já tem cadastro?
                        <C.LinkRegister to="/">Faça o Login.</C.LinkRegister>
                    </C.Register>
                </C.Form>
            </C.ComponentLogin>
        </C.Container>
    );
}
