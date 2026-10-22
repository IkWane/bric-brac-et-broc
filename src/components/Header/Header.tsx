import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState, type SubmitEvent } from 'react';
import NavButton from '../Basic/NavButton';
import RecycleIcon from '../Basic/RecycleIcon';
import { useCart } from '../../contexts/Cart/CartContext';

const navItems = [
    { label: 'Bargain Bin', to: '/' },
    { label: 'Box Depot', to: '/box-depot' },
];

function CartLink() {
    const { total } = useCart();

    return (
        <NavButton link="/cart" activeColor="bg-[#F6ECE5]">
            <div className="flex items-center gap-2">
                <svg
                    aria-hidden="true"
                    className="h-6 w-6 text-orange-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="4" width="18" height="5" />
                    <path d="M5 9v10h14V9M10 13h4" />
                </svg>
                <span className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] uppercase text-orange-700">Cart</span>
                    <span className="text-sm font-bold text-stone-900">{total.toFixed(2)} $</span>
                </span>
            </div>
        </NavButton>
    );
}

function Credit({ align = 'end' }: { align?: 'start' | 'end' }) {
    return (
        <span className={`flex flex-col leading-tight ${align === 'end' ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] uppercase text-stone-600">Credit</span>
            <span className="text-sm font-bold text-stone-900">$14.80</span>
        </span>
    );
}

export default function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Close the burger menu with Escape
    useEffect(() => {
        if (!menuOpen) return;
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setMenuOpen(false);
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [menuOpen]);

    async function handleSearch(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setMenuOpen(false);
        const q = String(new FormData(e.currentTarget).get('q') ?? '').trim();

        if (location.pathname !== '/') {
            await navigate(q ? `/?q=${encodeURIComponent(q)}` : '/');
        } else {
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                if (q) next.set('q', q);
                else next.delete('q');
                next.delete('page');
                return next;
            });
        }
    }

    return (
        <header className="relative w-full border-b-2 border-stone-800 bg-[#FFF9F5] px-4 py-2">
            <div className="flex items-center gap-4 lg:gap-6">
                {/* Logo */}
                <div className="flex shrink-0 flex-row">
                    <RecycleIcon className="mr-2 h-9 w-9 text-orange-700" />
                    <div className="hidden flex-col leading-tight sm:flex">
                        <span className="text-base font-bold uppercase tracking-wide text-stone-900">Bric & Broc</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700">
                            All the stuff !
                        </span>
                    </div>
                </div>

                {/* Search */}
                <form
                    role="search"
                    action="/"
                    method="get"
                    onSubmit={handleSearch}
                    className="relative min-w-0 flex-1 lg:flex-none"
                >
                    <button
                        type="submit"
                        aria-label="Search"
                        className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2"
                    >
                        <svg
                            aria-hidden="true"
                            className="text-stone-800"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="M20 20l-4-4" />
                        </svg>
                    </button>
                    <input
                        type="search"
                        key={searchParams.get('q') ?? ''}
                        defaultValue={searchParams.get('q') ?? ''}
                        name="q"
                        id="search"
                        aria-label="Search"
                        className="h-8 w-full border-2 border-stone-800 bg-white pl-8 pr-2 text-sm shadow-[2px_2px_0_0_#1c1917] outline-none focus:shadow-[3px_3px_0_0_#1c1917] lg:w-36"
                    />
                </form>

                {/* Desktop navigation */}
                <nav aria-label="Main" className="hidden items-center gap-3 lg:flex">
                    {navItems.map(({ label, to }) => (
                        <NavButton key={to} label={label} link={to} />
                    ))}
                </nav>

                {/* Desktop right side */}
                <div className="ml-auto hidden items-center gap-4 lg:flex">
                    <CartLink />
                    <div className="h-8 w-px bg-stone-300" />
                    <div className="mr-5">
                        <Credit />
                    </div>
                </div>

                {/* Burger button (small screens only) */}
                <button
                    type="button"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="grid h-9 w-9 shrink-0 place-items-center border-2 border-stone-800 bg-white shadow-[2px_2px_0_0_#1c1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 lg:hidden"
                >
                    <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-stone-900"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="square"
                    >
                        {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                    </svg>
                </button>
            </div>

            {/* Burger menu panel. Clicking any link inside closes it. */}
            {menuOpen && (
                <div
                    id="mobile-menu"
                    onClick={(e) => {
                        if ((e.target as HTMLElement).closest('a')) setMenuOpen(false);
                    }}
                    className="absolute inset-x-0 top-full z-50 flex flex-col gap-4 border-b-2 border-stone-800 bg-[#FFF9F5] px-4 py-4 shadow-[0_8px_16px_-8px_rgba(60,40,20,0.35)] lg:hidden"
                >
                    <nav aria-label="Main" className="flex flex-col items-stretch gap-2">
                        {navItems.map(({ label, to }) => (
                            <NavButton key={to} label={label} link={to} />
                        ))}
                    </nav>

                    <div className="flex items-center justify-between gap-4 border-t border-stone-300 pt-4">
                        <CartLink />
                        <Credit />
                    </div>
                </div>
            )}
        </header>
    );
}
