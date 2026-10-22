import type { ReactNode } from "react";
import { useCart } from "../../contexts/Cart/CartContext";
import type { Product } from "../../types/Product";

function BuyButton({product, className, children }: { product: Product, className: string, children: ReactNode }) {
    const { add } = useCart();

    function handleBuy() {
        add(product);
    }

    return ( 
        <button
            type="button"
            onClick={handleBuy}
            className={className}
        >
            {children}
        </button>
);
}

export default BuyButton;