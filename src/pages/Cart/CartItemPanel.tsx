import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { useCart, type CartItem } from '../../contexts/Cart/CartContext';
import { tilt } from '../../utils/tilt';
import Panel from '../../components/Basic/Panel';
import Tape from '../../components/Basic/Tape';

const money = (n: number) => `$${n.toFixed(2)}`;

export default function CartItemPanel({ item }: { item: CartItem }) {
    const { setQuantity, remove } = useCart();
    const seed = String(item.id);
    const lineTotal = item.price * item.quantity;

    return (
        <li
            style={{ '--tilt': `${tilt(`${seed}-cart`, 0.6)}deg` } as CSSProperties}
            className="relative rotate-(--tilt) list-none"
        >
            {/* Vertical tape strips holding the panel on both sides */}
            <Tape size="h-16 w-5" className="-left-2 top-1/2 -translate-y-1/2 rotate-3" />
            <Tape size="h-16 w-5" tone="blue" className="-right-2 top-1/2 -translate-y-1/2 -rotate-2" />

            <Panel className="flex flex-col gap-4 px-6 shadow-[0_6px_14px_-6px_rgba(60,40,20,0.3)] sm:flex-row sm:items-center">
                {/* Left: image + name */}
                <div className="flex min-w-0 flex-1 items-center gap-4">
                    <Link to={`/product/${item.id}`} className="shrink-0 bg-white p-1 shadow-sm">
                        <img src={item.thumbnail} alt="" className="h-20 w-20 object-cover" loading="lazy" />
                    </Link>
                    <div className="min-w-0">
                        <Link
                            to={`/product/${item.id}`}
                            className="text-base font-bold uppercase leading-tight text-stone-900 hover:underline"
                        >
                            {item.title}
                        </Link>

                        <div className="mt-2 flex items-center gap-1">
                            <button
                                type="button"
                                aria-label={`One less ${item.title}`}
                                onClick={() => setQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 bg-white text-sm font-bold text-stone-800 hover:bg-stone-200 focus-visible:outline-2 focus-visible:outline-orange-700"
                            >
                                −
                            </button>
                            <button
                                type="button"
                                aria-label={`One more ${item.title}`}
                                onClick={() => setQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                                className="h-6 w-6 bg-white text-sm font-bold text-stone-800 hover:bg-stone-200 focus-visible:outline-2 focus-visible:outline-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                +
                            </button>
                            <button
                                type="button"
                                onClick={() => remove(item.id)}
                                className="ml-2 text-[10px] font-bold uppercase text-red-800 hover:underline focus-visible:outline-2 focus-visible:outline-orange-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: figures + big xN */}
                <div className="flex items-center justify-between gap-6 sm:justify-end">
                    <dl className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 text-xs">
                        <dt className="text-[10px] uppercase text-stone-500">Quantity</dt>
                        <dd className="m-0 text-right text-stone-800">{item.quantity}</dd>
                        <dt className="text-[10px] uppercase text-stone-500">Per unit</dt>
                        <dd className="m-0 text-right text-stone-800">{money(item.price)}</dd>
                        <dt className="text-[10px] uppercase text-stone-500">Total</dt>
                        <dd className="m-0 text-right font-bold text-stone-900">{money(lineTotal)}</dd>
                    </dl>

                    <div
                        style={{ '--tilt': `${tilt(`${seed}-qty`, 4)}deg` } as CSSProperties}
                        className="relative min-w-20 rotate-(--tilt) bg-white px-3 pb-2 pt-3 text-center shadow-md"
                    >
                        <Tape size="h-3 w-9" className="-top-1.5 left-1/2 -translate-x-1/2 -rotate-3" />
                        <span className="text-3xl font-bold text-orange-800" aria-label={`Quantity ${item.quantity}`}>
                            x{item.quantity}
                        </span>
                    </div>
                </div>
            </Panel>
        </li>
    );
}
