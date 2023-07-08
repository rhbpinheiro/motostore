import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from '../pages/register';
import { NotFound } from '../pages/notFound';
import { Login } from '../pages/login';
import HomePage from '../pages/homePage/Index';
import SalesPage from '../pages/salesPage';
import ProductPage from '../pages/productPage';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/motos" element={<HomePage />} />
                <Route path="/cadastro" element={<ProductPage />} />
                <Route path="/vendas" element={<SalesPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
