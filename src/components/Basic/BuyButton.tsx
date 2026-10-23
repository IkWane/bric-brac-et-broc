import { useCart } from '../../contexts/Cart/CartContext';
import type { Product } from '../../types/Product';
import Button, { type ButtonProps } from './Button';

function BuyButton({ product, ...props }: Omit<ButtonProps, 'onClick'> & { product: Product }) {
    const { add } = useCart();

    return <Button {...props} disabled={product.stock === 0} onClick={() => add(product)} />;
}

export default BuyButton;
