import { useEffect, useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router';
import { fetchProduct } from '../../api/products';
import type { Product } from '../../types/Product';
import Tag from '../../components/Basic/Tag';
import { tilt } from '../../utils/tilt';
import CheckBadge from '../../components/Basic/CheckBadge';
import Tape from '../../components/Basic/Tape';
import Panel from '../../components/Basic/Panel';
import { timeAgo } from '../../utils/time';
import InfoRow from '../../components/Basic/InfoRow';
import TapedImage from '../../components/Basic/TapedImage';
import BuyButton from '../../components/Basic/BuyButton';
import { useCart } from '../../contexts/Cart/CartContext';

// type Status = 'loading' | 'ready' | 'not-found'

enum Status {
    LOADING = 'loading',
    READY = 'ready',
    NOTFOUND = 'not-found',
}

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [status, setStatus] = useState<Status>(Status.LOADING);
    const [activeImage, setActiveImage] = useState(0);
    const { getQuantity } = useCart();

    useEffect(() => {
        async function getProduct() {
            setStatus(Status.LOADING);
            setActiveImage(0);

            const fetchedProduct = await fetchProduct(Number(id));
            if (fetchedProduct?.id) {
                setProduct(fetchedProduct);
                setStatus(Status.READY);
            } else {
                setStatus(Status.NOTFOUND);
            }
        }
        getProduct();
    }, [id]);

    if (status === Status.LOADING) {
        return (
            <main className="flex-1 px-4 py-16 text-left text-sm uppercase text-stone-600 sm:px-6">
                Unwrapping the packing film…
            </main>
        );
    }

    if (status === Status.NOTFOUND || !product) {
        return (
            <main className="flex-1 px-4 py-16 text-left sm:px-6">
                <h1 className="m-0! text-2xl! font-bold uppercase text-stone-900">Item not found</h1>
                <p className="mt-3 text-sm text-stone-700">
                    This item may have been snagged already.{' '}
                    <Link to="/" className="font-bold text-orange-800 underline">
                        Back to the Bargain Bin
                    </Link>
                </p>
            </main>
        );
    }

    const images = product.images?.length ? product.images : [product.thumbnail];
    const posted = timeAgo(product.meta?.createdAt) ?? product.postedAgo;
    const seller = product.brand || 'Anonymous scrapper';
    const sellerSlug = seller.toLowerCase().replace(/\s+/g, '_');
    const seed = String(product.id);
    const quantity = getQuantity(product.id);

    const finePrint = [
        { label: 'Shipping', value: product.shippingInformation },
        { label: 'Warranty', value: 'Absolutely None' },
        { label: 'Returns', value: 'What ?' },
    ].filter((row) => row.value);

    return (
        <main className="flex-1 px-4 py-6 text-left sm:px-6">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase text-stone-600">
                <nav
                    aria-label="Breadcrumb"
                    className="flex items-center gap-2 bg-stone-200/70 px-2.5 py-1.5 font-bold"
                >
                    <Link to="/" className="text-stone-700 hover:underline">
                        Bargain bin
                    </Link>
                    <span aria-hidden="true" className="text-sm font-normal text-stone-500">
                        /
                    </span>
                    <span aria-current="page" className="bg-red-100 px-1.5 py-0.5 text-red-800">
                        Item #{product.id}
                    </span>
                </nav>
                {posted && (
                    <span className="flex items-center gap-1.5">
                        <svg
                            aria-hidden="true"
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 2" />
                        </svg>
                        Posted {posted} by user: {sellerSlug}
                    </span>
                )}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
                {/* ---------- Left: photo + product info ---------- */}
                <section className="bg-[#F1E6DF] p-4 pb-6 shadow-[0_6px_14px_-6px_rgba(60,40,20,0.3)] sm:p-6">
                    <p className="mb-2 flex items-center justify-end gap-1 text-[9px] uppercase text-stone-500">
                        <CheckBadge className="h-3 w-3" />
                        Not quality checked
                    </p>

                    {/* Taped photo */}
                    <TapedImage image={images[activeImage]} seed={seed} alt={product.title} />

                    {/* Extra photos */}
                    {images.length > 1 && (
                        <div className="mx-auto mt-5 flex max-w-2xl flex-wrap gap-3">
                            {images.map((src, i) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => setActiveImage(i)}
                                    aria-label={`Show photo ${i + 1}`}
                                    aria-pressed={i === activeImage}
                                    style={{ '--tilt': `${tilt(`${seed}-thumb-${i}`, 3)}deg` } as CSSProperties}
                                    className={`h-14 w-14 rotate-(--tilt) bg-white p-1 shadow-sm transition-transform hover:rotate-0 focus-visible:outline-2 focus-visible:outline-orange-700 ${
                                        i === activeImage ? 'ring-2 ring-orange-700' : ''
                                    }`}
                                >
                                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Product info, same vocabulary as ProductCard */}
                    <div className="mx-auto mt-6 max-w-2xl border-t border-stone-300/60 pt-5">
                        <h2 className="m-0! text-sm! font-bold uppercase tracking-normal! text-stone-900">
                            What's in the box
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-stone-700">{product.description}</p>

                        <dl className="mt-5 flex flex-col gap-3">
                            {product.tags.length > 0 && (
                                <InfoRow label="Tags">
                                    {product.tags.map((tag) => (
                                        <Tag key={tag} label={tag} seed={`${seed}-${tag}`} />
                                    ))}
                                </InfoRow>
                            )}
                            <InfoRow label="Category">
                                <Tag label={product.category} seed={`${seed}-${product.category}`} />
                            </InfoRow>
                            {product.brand && <InfoRow label="Brand">{product.brand}</InfoRow>}
                            {product.rating !== undefined && (
                                <InfoRow label="Rating">{product.rating.toFixed(1)} / 5</InfoRow>
                            )}
                            {product.availabilityStatus && (
                                <InfoRow label="Status">{product.availabilityStatus}</InfoRow>
                            )}
                        </dl>

                        {finePrint.length > 0 && (
                            <dl className="mt-5 grid gap-3 border-t border-dashed border-stone-300 pt-4 sm:grid-cols-3">
                                {finePrint.map((row) => (
                                    <div key={row.label}>
                                        <dt className="text-[10px] uppercase text-stone-500">{row.label}</dt>
                                        <dd className="m-0 mt-1 text-xs text-stone-800">{row.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </div>
                </section>

                {/* ---------- Right: buy column ---------- */}
                <aside className="flex flex-col gap-4">
                    {/* Title + price */}
                    <Panel className="shadow-[0_6px_14px_-6px_rgba(60,40,20,0.3)]">
                        <span
                            aria-hidden="true"
                            className="absolute left-5 top-0 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-stone-300 bg-white"
                        />
                        <Tape className="-top-2 right-6 w-16 rotate-3" />

                        <p className="mt-2 text-[11px] font-bold uppercase text-stone-600">Stock: {product.stock}</p>
                        <h1 className="mb-0! mt-3! text-2xl! font-bold uppercase leading-snug! tracking-normal! text-stone-900">
                            {product.title}
                        </h1>
                        <p className="mt-6 bg-white py-4 text-center text-4xl font-bold text-orange-800">
                            ${product.price.toFixed(2)}
                        </p>
                    </Panel>

                    {/* CTA */}
                    <BuyButton
                        product={product}
                        className="relative flex items-center justify-center gap-4 bg-orange-800 px-6 py-4 text-white shadow-[0_6px_14px_-6px_rgba(60,40,20,0.4)] transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:hover:translate-y-0"
                    >
                        <Tape className="-top-2 left-5 w-10 rotate-[-4deg]" />
                        <Tape className="-bottom-2 right-5 w-10 rotate-3" />
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        >
                            <rect x="5" y="4" width="14" height="17" rx="1" />
                            <path d="M9 4V3h6v1M9 13l2 2 4-4" />
                        </svg>
                        <div className="flex flex-row gap-5">
                            <span className="text-center text-lg font-bold uppercase leading-snug tracking-wider">
                                {product.stock === 0 ? 'Already snagged' : 'Tape this to my order'}
                                <br />
                                (${product.price.toFixed(2)})
                            </span>
                            <span className="text-3xl">{quantity > 0 ? 'x' + quantity : ''}</span>
                        </div>
                    </BuyButton>

                    {/* Seller */}
                    <div className="flex items-center gap-1.5 bg-white px-3 py-3 text-sm font-bold uppercase text-stone-900">
                        {seller}
                        <CheckBadge className="h-3 w-3 text-orange-700" />
                    </div>

                    {/* Guarantee */}
                    <Panel className="flex gap-3">
                        <CheckBadge className="mt-0.5 h-5 w-5 shrink-0 text-orange-800" />
                        <div>
                            <h2 className="m-0! text-sm! font-bold uppercase tracking-normal! text-stone-900">
                                ‘No idea’ guarantee
                            </h2>
                            <p className="mt-1 text-xs leading-relaxed text-stone-600">
                                We have no idea if this is LEGITIMATE, but rest assured we are doing our VERY BEST to no
                                care at all!
                            </p>
                        </div>
                    </Panel>
                </aside>
            </div>
        </main>
    );
}
