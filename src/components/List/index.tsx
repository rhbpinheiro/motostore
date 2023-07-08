import React from 'react';
import * as C from './style';

interface ListItemProps {
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description: string;
    price: string;
    onBuy: () => void;
}

export default function ListItem({
    imageUrl,
    name,
    brand,
    displacement,
    description,
    price,
    onBuy,
}: ListItemProps) {
    return (
        <C.ItemContainer>
            <C.Image src={imageUrl} alt="Motorcycle" />
            <C.ColInfo>
                <C.Title>{name}</C.Title>
                <C.Description>Marca: {brand}</C.Description>
                <C.Description>Cilindrada: {displacement}</C.Description>
                <C.Description>Informações: {description}</C.Description>
                <C.Description>Preço: R$ {price}</C.Description>
                <C.BuyButton onClick={onBuy}>Vender</C.BuyButton>
            </C.ColInfo>
        </C.ItemContainer>
    );
}
