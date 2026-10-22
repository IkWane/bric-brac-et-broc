import Panel from '../../components/Basic/Panel';
import Tag from '../../components/Basic/Tag';
import Tape from '../../components/Basic/Tape';
import { BuyError } from './Cart';

export const TAX_RATE = 0.2;

const money = (n: number) => `$${n.toFixed(2)}`;

export default function CartSummary({ subtotal, onBuy, error }: { subtotal: number; onBuy: () => void, error: BuyError }) {
    const tax = subtotal * TAX_RATE;
    const final = subtotal + tax;

    return (
        <Panel className="mt-10 flex flex-col gap-6 p-6 shadow-[0_10px_24px_-8px_rgba(60,40,20,0.3)] sm:flex-row sm:items-end sm:justify-between">
            <Tape className="-top-2 left-8 -rotate-3" />
            <Tape tone="blue" className="-top-2 right-8 rotate-2" />

            {/* Left: totals */}
            <div className="w-full max-w-sm">
                <Tag label="Total" seed="cart-total-label" size="lg" />

                <dl className="mt-5 grid grid-cols-[1fr_auto] gap-y-2 text-sm">
                    <dt className="text-[11px] uppercase text-stone-500">Subtotal</dt>
                    <dd className="m-0 text-right text-stone-800">{money(subtotal)}</dd>
                    <dt className="text-[11px] uppercase text-stone-500">Tax (20%)</dt>
                    <dd className="m-0 text-right text-stone-800">{money(tax)}</dd>
                    <dt className="border-t border-dashed border-stone-300 pt-2 text-[11px] font-bold uppercase text-stone-900">
                        Final price
                    </dt>
                    <dd className="m-0 border-t border-dashed border-stone-300 pt-2 text-right text-3xl font-bold text-orange-800">
                        {money(final)}
                    </dd>
                </dl>
            </div>

            {/* Right: buy */}
            <div className='flex flex-col gap-10'>
                <Tag seed='error' label="Error: Not enough credits to complete purchase !" size='sm' hidden={error !== BuyError.INSUFFICIENT_CREDIT} />
                <button
                    type="button"
                    onClick={onBuy}
                    className="relative flex items-center justify-center gap-3 bg-orange-800 px-8 py-4 text-lg font-bold uppercase tracking-wider text-white shadow-[0_6px_14px_-6px_rgba(60,40,20,0.4)] transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800"
                >
                    <Tape size="h-5 w-10" className="-left-5 top-1/2 -translate-y-1/2 -rotate-96" />
                    <Tape size="h-5 w-10" className="-right-5 top-1/2 -translate-y-1/2 rotate-87" />
                    <svg
                        aria-hidden="true"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                    >
                        <path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3z" />
                        <path d="M3 7.5 12 12l9-4.5M12 12v9" />
                    </svg>
                    Seal the box &amp; pay
                </button>
            </div>
        </Panel>
    );
}
