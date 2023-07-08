import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from '../pages/register';
import { NotFound } from '../pages/NotFound';
import { Login } from '../pages/login';
import HomePage from '../pages/homePage/Index';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/motos" element={<HomePage />} />
                <Route path="/cadastro" element={<HomePage />} />
                <Route path="/vendas" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
