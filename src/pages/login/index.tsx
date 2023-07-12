import * as C from './styles';
import Logo from '../../assets/logo.png';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../logic/firebase/config/firebaseconfig';
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router-dom';

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
      }, [navigate]);

    function handleSingIn(e: any) {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <C.Container>
            <C.ComponentLogin>
                <C.ImageLogo src={Logo} alt="logo" />
                <C.Title>Login</C.Title>
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
                    <C.Button type="submit" onClick={handleSingIn}>
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
