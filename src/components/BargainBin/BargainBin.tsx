import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../types/Product';
import { fetchProductPage } from '../../api/products';
import { ECategory } from '../../types/Categories';
import Select from '../Basic/Form/Select';
import Pagination from './Pagination';

enum SortType {
    LOW = 'low',
    HIGH = 'high',
}

const ALL = 'ALL';
const categoryOptions = [
    { value: ALL, label: 'All' },
    ...Object.entries(ECategory).map(([key, name]) => ({ value: key, label: name })),
];

const sorts = [
    { id: SortType.LOW, label: 'Lowest price first' },
    { id: SortType.HIGH, label: 'Highest price first' },
];

const DEFAULT_PAGE_SIZE = 20;
const pageSizeOptions = [10, 20, 50].map((n) => ({ value: String(n), label: `${n} per page` }));

export default function BargainBin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const q = (searchParams.get('q') ?? '').toLowerCase();
    const page = Math.max(1, Math.floor(Number(searchParams.get('page')) || 1));
    const [activeFilter, setActiveFilter] = useState(ALL);
    const [sort, setSort] = useState(SortType.LOW);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const sectionRef = useRef<HTMLElement>(null);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    useEffect(() => {
        // Ignore answers to requests that a newer one has replaced (fast page clicks)
        let ignore = false;
        async function handleQuery() {
            const result = await fetchProductPage(
                q,
                sort === SortType.LOW,
                activeFilter in ECategory ? activeFilter : undefined,
                page,
                pageSize
            );
            if (!ignore) {
                setProducts(result.products);
                setTotal(result.total);
            }
        }
        handleQuery();
        return () => {
            ignore = true;
        };
    }, [q, sort, activeFilter, page, pageSize]);

    function goToPage(next: number, scroll = true) {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            if (next > 1) params.set('page', String(next));
            else params.delete('page');
            return params;
        });
        if (scroll) sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // A page past the end (old link, smaller result set) jumps to the last page
    useEffect(() => {
        if (total > 0 && page > totalPages) goToPage(totalPages, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, page, totalPages]);

    return (
        <section ref={sectionRef} className="scroll-mt-4 px-4 py-6 text-left sm:px-6">
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
                        onChange={(e) => {
                            setSort(e.target.value as SortType);
                            goToPage(1, false);
                        }}
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

            {/* Category + page size */}
            <div className="mt-8 flex flex-wrap items-start gap-x-10 gap-y-6">
                <div className="w-64">
                    <Select
                        name="category"
                        label="Category"
                        options={categoryOptions}
                        value={activeFilter}
                        hint={`${total} ${total === 1 ? 'item' : 'items'} in the bin`}
                        onChange={(e) => {
                            setActiveFilter(e.target.value);
                            goToPage(1, false);
                        }}
                    />
                </div>
                <div className="w-52">
                    <Select
                        name="pageSize"
                        label="Show"
                        options={pageSizeOptions}
                        value={String(pageSize)}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            goToPage(1, false);
                        }}
                    />
                </div>
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

            <Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onChange={goToPage} />
        </section>
    );
}
