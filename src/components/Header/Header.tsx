import { NavLink, useSearchParams } from 'react-router'
import { type SubmitEvent } from 'react'

const navItems = [
    { label: 'Bargain Bin', sub: '(C2C)', to: '/' },
    { label: 'Box Depot', sub: '(B2C)', to: '/box-depot' },
]

export default function Header() {
    const [searchParams, setSearchParams] = useSearchParams();

    function handleSearch(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const q = String(new FormData(e.currentTarget).get('q') ?? '').trim()

        setSearchParams(prev => {
            const next = new URLSearchParams(prev)
            if (q) next.set('q', q) 
            else next.delete('q')
            next.delete('page')
            return next
        })
    }


    return (    
        <header className="w-full border-b-2 border-stone-800 bg-[#FFF9F5] px-4 py-2">
            <div className="flex items-center gap-6">
                {/* Logo */}
                <div className="flex flex-col leading-tight">
                    <span className="text-base font-bold uppercase tracking-wide text-stone-900">
                        Bric et Broc
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700">
                        All the stuff !
                    </span>
                </div>

                {/* Search */}
                <div className="relative">
                    <button
                        className='pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2'
                        type='submit'
                        >
                        <svg
                            className=" text-stone-800"
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
                    
                    <form action='index.html' method='get' onSubmit={handleSearch}>
                        <input
                            type="search"
                            key={searchParams.get('q') ?? ''}
                            defaultValue={searchParams.get('q') ?? ''}
                            name='q'
                            id='search'
                            aria-label="Search"
                            className="h-8 w-36 border-2 border-stone-800 bg-white pl-8 pr-2 text-sm shadow-[2px_2px_0_0_#1c1917] outline-none focus:shadow-[3px_3px_0_0_#1c1917]"
                        />
                    </form>
                </div>

                {/* Navigation */}
                <nav className="flex items-center gap-3">
                    {navItems.map(({ label, sub, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `px-3 py-1.5 text-xs font-bold uppercase leading-tight ${
                                    isActive
                                        ? 'border-2 border-stone-800 bg-[#8B5E34] text-white shadow-[2px_2px_0_0_#1c1917]'
                                        : 'border-2 border-transparent text-stone-800 hover:border-stone-800'
                                }`
                            }
                        >
                            {label}
                            <br />
                            {sub}
                        </NavLink>
                    ))}
                </nav>

                {/* Right side */}
                <div className="ml-auto flex items-center gap-4">
                    {/* Cart */}
                    <button
                        type="button"
                        className="flex items-center gap-2 border-2 border-orange-700 bg-orange-50 px-3 py-1.5 shadow-[2px_2px_0_0_#c2410c]"
                    >
                        <svg
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
                            <span className="text-sm font-bold text-stone-900">$4.20</span>
                        </span>
                    </button>

                    <div className="h-8 w-px bg-stone-300" />

                    {/* Credit + avatar */}
                    <div className="flex items-center gap-2 mr-5">
                        <span className="flex flex-col items-end leading-tight">
                            <span className="text-[10px] uppercase text-stone-600">Credit</span>
                            <span className="text-sm font-bold text-stone-900">$14.80</span>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}