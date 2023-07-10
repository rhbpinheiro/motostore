import * as C from './styles';

interface Motocycle {
    id?: string;
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description?: string;
    onBuy?: () => void;
}

export default function MotorcycleCard({
    id,
    imageUrl,
    name,
    brand,
    displacement,
    description,
    onBuy,
}: Motocycle) {
    return (
        <C.CardContainer key={id}>
            <C.Image src={imageUrl} alt="Motorcycle" />
            <C.Title>{name}</C.Title>
            <C.Description>Marca: {brand}</C.Description>
            <C.Description>Cilindrada: {displacement}</C.Description>
            <C.BuyButton onClick={onBuy}>Vender</C.BuyButton>
        </C.CardContainer>
    );
}
