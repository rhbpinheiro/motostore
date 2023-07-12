import React from 'react';
import * as C from './style';
import ImageFake from '../../assets/sem-imagem7.jpg';

interface ListItemProps {
    imageUrl: string;
    name: string;
    brand: string;
    displacement: string;
    description: string;
    price: string;
    onBuy: () => void;
    children: any;
    loagind: boolean;
}

export default function ListItem({
    imageUrl,
    name,
    brand,
    displacement,
    description,
    price,
    onBuy,
    children,
    loagind
}: ListItemProps) {
    return (
        <C.ItemContainer>
            <C.Image src={imageUrl || ImageFake} alt="Motorcycle" />
            <C.ColInfo>
                <C.Title>{name}</C.Title>
                <C.Description>Marca: {brand}</C.Description>
                <C.Description>Cilindrada: {displacement}</C.Description>
                <C.Description>Informações: {description}</C.Description>
                <C.Description>Preço: R$ {price}</C.Description>
                {children}
                <C.BuyButton onClick={onBuy}>
                 {loagind ? 'Enviando...' : 'Vender'} 
                  </C.BuyButton>
            </C.ColInfo>
        </C.ItemContainer>
    );
}
