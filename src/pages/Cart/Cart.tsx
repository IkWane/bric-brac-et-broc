import { useState } from 'react';
import { Link } from 'react-router';
import { useCart } from '../../contexts/Cart/CartContext';
import CartItemPanel from './CartItemPanel';
import CartSummary from './CartSummary';
import { useCredit } from '../../contexts/Credit/CreditContext';
import { BuyError } from '../../types/ErrorState';

function Cart() {
    const { items, count, total, clear } = useCart();
    const [ordered, setOrdered] = useState(false);
    const { credits, setCredits } = useCredit();
    const [error, setError] = useState(BuyError.NONE);

    function handleBuy() {
        if (credits >= total) {
            clear();
            setCredits(credits - total);
            setOrdered(true);
        } else {
            setError(BuyError.INSUFFICIENT_CREDIT);
        }
    }

    return (
        <main className="flex-1 px-4 py-8 text-left sm:px-6">
            <h1 className="m-0! flex flex-wrap items-baseline gap-x-4 gap-y-1 text-4xl! font-bold uppercase tracking-tight! text-stone-900">
                Cart
                {items.length > 0 && (
                    <span className="text-sm font-bold tracking-normal text-stone-500">
                        {items.length} {items.length === 1 ? 'item' : 'items'}, {count} {count === 1 ? 'unit' : 'units'}{' '}
                        in total
                    </span>
                )}
            </h1>

            {items.length > 0 ? (
                <>
                    <ul className="mt-8 flex flex-col gap-6 p-0">
                        {items.map((item) => (
                            <CartItemPanel key={item.id} item={item} />
                        ))}
                    </ul>

                    <CartSummary subtotal={total} onBuy={handleBuy} error={error} />
                </>
            ) : (
                <p className="mt-6 text-sm text-stone-700">
                    {ordered
                        ? 'Order taped and sealed. Your box is on its way.'
                        : 'Your cart is empty. Nothing taped yet.'}{' '}
                    <Link to="/" className="font-bold text-orange-800 underline">
                        Back to the Bargain Bin
                    </Link>
                </p>
            )}
        </main>
    );
}

export default Cart;
