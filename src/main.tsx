import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import CartProvider from './contexts/Cart/CartProvider.tsx';
import CreditProvider from './contexts/Credit/CreditProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <CartProvider>
                <CreditProvider>
                    <App />
                </CreditProvider>
            </CartProvider>
        </BrowserRouter>
    </StrictMode>
);
