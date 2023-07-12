import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from '../pages/register';
import { NotFound } from '../pages/notFound';
import { Login } from '../pages/login';
import HomePage from '../pages/homePage/Index';
import SalesPage from '../pages/salesPage';
import ProductPage from '../pages/registerPage';
import DetailsPage from '../pages/DetailsPage';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/home/details/:id" element={<DetailsPage />} />
                <Route path="/register" element={<ProductPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
