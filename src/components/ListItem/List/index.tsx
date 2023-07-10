import * as C from './styles';
interface ListItemProps {
    id?: string;
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description?: string;
    children?: any;
}

export default function ListItemHor({
    id,
    imageUrl,
    name,
    brand,
    displacement,
    children,
}: ListItemProps) {
    return (
        <C.ListItemContainer key={id}>
            <C.Image src={imageUrl} alt="Motorcycle" />
            <C.Title>{name}</C.Title>
            <C.Description>Marca: {brand}</C.Description>
            <C.Description>Cilindrada: {displacement}</C.Description>
            {children}
        </C.ListItemContainer>
    );
}
