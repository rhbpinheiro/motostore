import styled from "styled-components";

export const ListItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    width: 100%;
    padding: 16px;
    border: 1px solid rgb(166, 136, 54);
    border-radius: 15px;
    margin-bottom: 8px;
`;

export const DescContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.h2`
    font-size: 35;
    color: rgb(166, 136, 54);
`;

export const IconButton = styled.div`
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

export const Image = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 15px;
    margin-right: 16px;
`;

export const TitleUser = styled.h3`
    font-size: 18px;
    color: #333;
    margin-right: 16px;
`;

export const Description = styled.p`
    font-size: 14px;
    color: #666;
    margin-right: 16px;
`;