import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SingleProductPage from './pages/SingleProductPage';
import ProductsPage from './pages/ProductsPage';
import { Footer, Navbar, Sidebar } from './components';
import PrivateRoute from './pages/PrivateRoute';
import { AuthWrapper } from './pages/AuthWrapper';
function App() {
    return (
        <BrowserRouter>
            <AuthWrapper>
                <Navbar></Navbar>
                <Sidebar></Sidebar>
                <Routes>
                    <Route path="/" element={<HomePage></HomePage>}></Route>
                    <Route
                        path="/about"
                        element={<AboutPage></AboutPage>}
                    ></Route>
                    <Route path="/cart" element={<CartPage></CartPage>}></Route>
                    <Route
                        path="/products"
                        element={<ProductsPage></ProductsPage>}
                    ></Route>
                    <Route
                        path="/products/:id"
                        element={<SingleProductPage></SingleProductPage>}
                    ></Route>
                    <Route element={<PrivateRoute />}>
                        <Route path="/checkout" element={<CheckoutPage />} />
                    </Route>

                    <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
                </Routes>
                <Footer></Footer>
            </AuthWrapper>
        </BrowserRouter>
    );
}

export default App;
