import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useSearchParams } from 'react-router'
import ProductCard from '../ProductCard/ProductCard'
import { tilt } from '../../utils/tilt'
import type { Product } from '../../types/Product'
import { fetchProducts } from '../../api/products'

const filters = [
    { id: 'all', label: 'All bin oddities' },
    { id: 'weird', label: 'Weird but works ($0.50-$2)' },
    { id: 'cables', label: 'Vintage cables & adaptors' },
    { id: 'tools', label: 'Orphaned tools' },
    { id: 'ceramics', label: 'Odd ceramics' },
    { id: 'free', label: 'Free with $5 box purchase' },
]

const sorts = [
    { id: 'low', label: 'Lowest price first ($0.25+)' },
    { id: 'high', label: 'Highest price first' },
]

export default function BargainBin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchParams] = useSearchParams();
    const isFetching = useRef(false);
    const q = (searchParams.get('q') ?? '').toLowerCase();

    useEffect(() => {
        async function handleQuery() {
            if (!isFetching.current) {
                isFetching.current = true;
                setProducts(await fetchProducts(q));
                isFetching.current = false;
            }
        }
        handleQuery();
    }, [q])

    const [activeFilter, setActiveFilter] = useState('all');
    const [sort, setSort] = useState('low');

    const countFor = (id: string) =>
        id === 'all' ? products.length : products.filter(p => p.category === id).length

    return (
        <section className="px-4 py-6 text-left sm:px-6">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-xl">
                    <h1 className="m-0! text-3xl! font-bold uppercase tracking-tight! text-stone-900">
                        The Bargain Bin (C2C scrap &amp; oddities)
                    </h1>
                    <p className="mt-2 text-sm text-stone-700">
                        Everything has a few miles on it. Sold without guarantees, but wrapped in love, old
                        Sunday comics, and industrial packing film.
                    </p>
                </div>

                <label className="flex items-center gap-3 text-[10px] uppercase text-stone-600">
                    Sort by junkiness:
                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        className="bg-stone-200 px-3 py-2 text-xs font-bold text-stone-900 outline-none focus-visible:outline-2 focus-visible:outline-orange-700"
                    >
                        {sorts.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </label>
            </header>

            {/* Filter tape */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase text-stone-600">Filter tape:</span>
                {filters.map(f => {
                    const active = f.id === activeFilter
                    return (
                        <button
                            key={f.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setActiveFilter(f.id)}
                            style={{ '--tilt': `${tilt(f.id, 1.5)}deg` } as CSSProperties}
                            className={`rotate-(--tilt) px-3 py-1.5 text-[11px] font-bold uppercase transition-transform hover:rotate-0 focus-visible:outline-2 focus-visible:outline-orange-700 ${
                                active
                                    ? 'bg-amber-200 text-stone-900'
                                    : f.id === 'free'
                                      ? 'bg-red-100 text-stone-900'
                                      : 'bg-stone-200 text-stone-800'
                            }`}
                        >
                            {f.label}
                            {f.id !== 'free' && active && ` (${countFor(f.id)})`}
                        </button>
                    )
                })}
            </div>

            {/* Grid: generous gaps so the tilted cards don't overlap */}
            {products.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="mt-10 text-sm text-stone-700">
                    Nothing in the bin matches that. Try another filter or clear your search.
                </p>
            )}
        </section>
    )
}