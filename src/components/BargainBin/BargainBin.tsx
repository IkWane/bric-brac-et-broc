import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useSearchParams } from 'react-router';
import ProductCard from '../ProductCard/ProductCard';
import { tilt } from '../../utils/tilt';
import type { Product } from '../../types/Product';
import { fetchProducts } from '../../api/products';
import { ECategory } from '../../types/Categories';

enum SortType {
    LOW = 'low',
    HIGH = 'high',
}

const filters = ['ALL'].concat(Object.keys(ECategory));

const sorts = [
    { id: SortType.LOW, label: 'Lowest price first' },
    { id: SortType.HIGH, label: 'Highest price first' },
];

export default function BargainBin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchParams] = useSearchParams();
    const isFetching = useRef(false);
    const q = (searchParams.get('q') ?? '').toLowerCase();
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [sort, setSort] = useState(SortType.LOW);

    useEffect(() => {
        async function handleQuery() {
            if (!isFetching.current) {
                isFetching.current = true;
                setProducts(
                    await fetchProducts(q, sort === SortType.LOW, activeFilter in ECategory ? activeFilter : undefined)
                );
                isFetching.current = false;
            }
        }
        handleQuery();
    }, [q, sort, activeFilter]);

    return (
        <section className="px-4 py-6 text-left sm:px-6">
            <header className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-xl">
                    <h1 className="m-0! text-3xl! font-bold uppercase tracking-tight! text-stone-900">
                        The Bargain Bin (C2C scrap &amp; oddities)
                    </h1>
                    <p className="mt-2 text-sm text-stone-700">
                        Everything has a few miles on it. Sold without guarantees, but wrapped in love, old Sunday
                        comics, and industrial packing film.
                    </p>
                </div>

                <label className="flex items-center gap-3 text-[10px] uppercase text-stone-600">
                    Sort by junkiness:
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortType)}
                        className="bg-stone-200 px-3 py-2 text-xs font-bold text-stone-900 outline-none focus-visible:outline-2 focus-visible:outline-orange-700"
                    >
                        {sorts.map((s) => (
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
                {filters.map((f) => {
                    const active = f === activeFilter;
                    return (
                        <button
                            key={f}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setActiveFilter(f)}
                            style={{ '--tilt': `${tilt(f, 1.5)}deg` } as CSSProperties}
                            className={`rotate-(--tilt) px-3 py-1.5 text-[11px] font-bold uppercase transition-transform hover:rotate-0 focus-visible:outline-2 focus-visible:outline-orange-700 ${
                                active ? 'bg-amber-200 text-stone-900' : 'bg-stone-200 text-stone-800'
                            }`}
                        >
                            {f}
                            {active && ` (${products.length})`}
                        </button>
                    );
                })}
            </div>

            {/* Grid: generous gaps so the tilted cards don't overlap */}
            {products.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="mt-10 text-sm text-stone-700">
                    Nothing in the bin matches that. Try another filter or clear your search.
                </p>
            )}
        </section>
    );
}
