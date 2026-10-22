import { createContext } from 'react';
import type { Product } from '../../types/Product';
import { useContext } from 'react';

export type CartItem = Pick<Product, 'id' | 'title' | 'price' | 'thumbnail' | 'stock'> & {
    quantity: number;
};

export interface CartContextValue {
    items: CartItem[];
    count: number;
    total: number;
    add: (product: Product, quantity?: number) => void;
    remove: (id: Product['id']) => void;
    setQuantity: (id: Product['id'], quantity: number) => void;
    getQuantity: (id: Product['id']) => number;
    clear: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
    const cart = useContext(CartContext);
    if (!cart) throw new Error('useCart must be used inside <CartProvider>');
    return cart;
}
