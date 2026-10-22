import type { CSSProperties } from 'react'
import type { Product } from '../../types/Product'
import { tilt } from '../../utils/tilt'
import Tag from '../Tag/Tag'
import { Link } from 'react-router';

export default function ProductCard({ product }: { product: Product }) {
    const { id, title, price, thumbnail: image, postedAgo, label, labelSide = 'left', tags, description, category, stock } = product

    return (
        <article
            style={{ '--tilt': `${tilt(id, 1.8)}deg` } as CSSProperties}
            className="group relative rotate-(--tilt) bg-[#F8E9E0] p-3 shadow-[0_6px_14px_-4px_rgba(60,40,20,0.25)] transition-transform duration-200 hover:rotate-0 hover:z-10"
        >
            {/* Paper label stuck on top */}
            <span
                style={{ '--tilt': `${tilt(`${id}-label`, 3)}deg` } as CSSProperties}
                className={`absolute -top-3 ${
                    labelSide === 'left' ? 'left-4' : 'right-4'
                } rotate-(--tilt) bg-amber-200 px-2 py-0.5 text-[10px] font-bold uppercase text-stone-800`}
            >
                {label}
            </span>

            {/* Image */}
            <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
                <Link to={`product/${id}`}>
                    <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
                </Link>
                <span className="absolute bottom-2 left-2 bg-stone-900/85 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                    {postedAgo}
                </span>
            </div>

            {/* Title + price */}
            <div className="mt-3 flex items-start justify-between gap-3 text-left">
                <h3 className="text-base font-bold uppercase leading-tight text-stone-900">{title}</h3>
                <span
                    style={{ '--tilt': `${tilt(`${id}-price`, 2)}deg` } as CSSProperties}
                    className="shrink-0 rotate-(--tilt) bg-red-100 px-2 py-1 text-lg font-bold text-stone-900"
                >
                    ${price.toFixed(2)}
                </span>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5 text-left">
                Tags : <div className='*:mx-1'>{tags.map(tag => (
                    <Tag key={tag} label={tag} seed={`${id}-${tag}`} />
                ))}</div>
            </div>

            {/* Category */}
            <div className="mt-3 flex flex-wrap gap-1.5 text-left">
                Category : <div className='*:mx-1'><Tag key={category} label={category} seed={`${id}-${category}`}/></div>
            </div>

            {/* Description */}
            <p className="mt-3 line-clamp-3 text-left text-xs text-stone-700">{description}</p>

            {/* Stock */}
            <div className="mt-3 flex flex-wrap gap-1.5 text-left">
                Stock : {stock}
            </div>

            {/* Seller + buy button */}
            <div className="mt-3 flex items-center justify-between border-t border-stone-300/60 pt-3">
                <span className="flex items-center gap-1 text-[10px] uppercase text-stone-600">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                    Seller: 
                </span>
                <button
                    type="button"
                    className="flex items-center gap-2 bg-[#6B4A24] px-3 py-1.5 text-sm font-bold uppercase text-white shadow-[2px_2px_0_0_#1c1917] transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                        <path d="M5 8h14l-1 12H6L5 8z" />
                        <path d="M9 8a3 3 0 016 0" />
                    </svg>
                    Snag it
                </button>
            </div>
        </article>
    )
}