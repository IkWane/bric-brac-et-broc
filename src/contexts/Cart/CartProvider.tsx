import { useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { Product } from '../../types/Product';
import { CartContext, type CartItem } from './CartContext';

type Action =
    | { type: 'add'; product: Product; quantity: number }
    | { type: 'remove'; id: Product['id'] }
    | { type: 'setQuantity'; id: Product['id']; quantity: number }
    | { type: 'clear' };

function cartReducer(items: CartItem[], action: Action): CartItem[] {
    switch (action.type) {
        case 'add': {
            const { product, quantity } = action;
            const existing = items.find((i) => i.id === product.id);
            if (existing) {
                return items.map((i) =>
                    i.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, i.stock) } : i
                );
            }
            const { id, title, price, thumbnail, stock } = product;
            return [...items, { id, title, price, thumbnail, stock, quantity: Math.min(quantity, stock) }];
        }
        case 'remove':
            return items.filter((i) => i.id !== action.id);
        case 'setQuantity':
            return action.quantity <= 0
                ? items.filter((i) => i.id !== action.id)
                : items.map((i) => (i.id === action.id ? { ...i, quantity: Math.min(action.quantity, i.stock) } : i));
        case 'clear':
            return [];
    }
}

const STORAGE_KEY = 'bric-broc-cart';

function loadCart(): CartItem[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as CartItem[];
    } catch {
        return [];
    }
}

export default function CartProvider({ children }: { children: ReactNode }) {
    const [items, dispatch] = useReducer(cartReducer, [], loadCart);

    // Keep the cart after a page refresh
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            /* storage full or blocked: the cart still works in memory */
        }
    }, [items]);

    const value = useMemo(
        () => ({
            items,
            count: items.reduce((n, i) => n + i.quantity, 0),
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
            add: (product: Product, quantity = 1) => dispatch({ type: 'add', product, quantity }),
            remove: (id: Product['id']) => dispatch({ type: 'remove', id }),
            setQuantity: (id: Product['id'], quantity: number) => dispatch({ type: 'setQuantity', id, quantity }),
            getQuantity: (id: Product['id']) => items.find((i) => i.id === id)?.quantity ?? 0,
            clear: () => dispatch({ type: 'clear' }),
        }),
        [items]
    );

    return <CartContext value={value}>{children}</CartContext>;
}
