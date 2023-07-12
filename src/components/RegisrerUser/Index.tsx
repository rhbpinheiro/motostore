import * as C from './styles';
import ImagemFake from '../../assets/sem-imagem7.jpg';

interface User {
    id?: string;
    imageUrl: string;
    name: string;
    email: string;
    phone: string;
    onAdd: () => void;
    children?: any;
}

export default function RegisterUser({
    id,
    imageUrl,
    name,
    email,
    phone,
    onAdd,
    children,
}: User) {
    return (
        <C.ListItemContainer key={id}>
            <C.Image
                src={(imageUrl === null || imageUrl === '' ) ? ImagemFake : imageUrl}
                alt="Avatar"
            />
            <C.Title>{name}</C.Title>
            <C.Description>{email}</C.Description>
            <C.Description>{phone}</C.Description>
            {children}
        </C.ListItemContainer>
    );
}
