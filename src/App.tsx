import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import ProductPage from './pages/ProductPage/ProductPage';
import Cart from './pages/Cart/Cart';
import BoxDepot from './pages/BoxDepot/BoxDepot';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/box-depot" element={<BoxDepot />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
