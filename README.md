## Tecnologias

Lista de tecnologias utilizadas no projeto:

- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Conponents](https://styled-components.com/)

## Executando o projeto

1. Clone o repositório:

```bash
$ https://github.com/rhbpinheiro/motostore
$ cd motostore
```

2. Crie um projeto no Firebase e ative o Firestore e Autenticação com Email e Senha.


3. É preciso criar um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```
Usar as credenciais do seu projeto no Firebase.

4. Dentro da pasta do projeto, execute os comandos abaixo:

```bash
# Instalar as dependências
$ npm install

# Iniciar o projeto
$ npm start
```
O app estará disponível no endereço http://localhost:3000.

4. Para fazer o login cadastre-se com email e senha ou use um email padão:

````
email : teste@gmail.com
senha : 123456



## Sobre o Projeto

MotoStore é uma aplicação onde você pode cadastrar motos e usuários e visualizar a lista de motos vendidas.