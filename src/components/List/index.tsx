import React from 'react';
import  * as C from './style';


interface ListItemProps {
  image: string;
  name: string;
  brand: string;
  displacement: string;
  onBuy: () => void;
}



export default function ListItem({
  image,
  name,
  brand,
  displacement,
  onBuy,
}: ListItemProps ){
  return (
    <C.ItemContainer>
      <C.Image src={image} alt="Motorcycle" />
      <C.Title>{name}</C.Title>
      <C.Description>Marca: {brand}</C.Description>
      <C.Description>Cilindrada: {displacement}</C.Description>
      <C.BuyButton onClick={onBuy}>Vender</C.BuyButton>
    </C.ItemContainer>
  );
};
