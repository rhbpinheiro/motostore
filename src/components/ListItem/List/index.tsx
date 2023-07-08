import * as C from './styles';
interface ListItemProps {
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description?: string;
    onBuy?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function ListItemHor({
    imageUrl,
    name,
    brand,
    displacement,
    onBuy,
}: ListItemProps) {
    return (
        <C.ListItemContainer>
            <C.Image src={imageUrl} alt="Motorcycle" />
            <C.Title>{name}</C.Title>
            <C.Description>Marca: {brand}</C.Description>
            <C.Description>Cilindrada: {displacement}</C.Description>
            <C.BuyButton onClick={onBuy}>Vender</C.BuyButton>
        </C.ListItemContainer>
    );
}
