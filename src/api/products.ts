import { ECategory } from '../types/Categories';
import type { Product } from '../types/Product';

function getValueByKeyForStringEnum(value: string) {
    return Object.entries(ECategory).find(([key]) => key === value)?.[1];
}

export interface ProductPage {
    products: Product[];
    /** Number of products matching the query across all pages */
    total: number;
}

function productsUrl(query: string, priceASC: boolean, category?: string): URL {
    const url = new URL(
        'https://dummyjson.com/products' +
            (query && !category ? '/search' : '') +
            (!query && category ? `/category/${getValueByKeyForStringEnum(category)}` : '')
    );
    url.searchParams.set('sortBy', 'price');
    url.searchParams.set('order', priceASC ? 'asc' : 'desc');
    if (query) {
        url.searchParams.set('q', query);
    }
    return url;
}

export async function fetchProducts(query: string, priceASC: boolean = true, category?: string): Promise<Product[]> {
    const url = productsUrl(query, priceASC, category);

    try {
        const resp = await fetch(url);
        const data = (await resp.json()).products as Product[];
        return data;
    } catch {
        return [];
    }
}

/** One page of products. `page` starts at 1. */
export async function fetchProductPage(
    query: string,
    priceASC: boolean = true,
    category?: string,
    page: number = 1,
    limit: number = 20
): Promise<ProductPage> {
    const url = productsUrl(query, priceASC, category);
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('skip', String((Math.max(page, 1) - 1) * limit));

    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return { products: (data.products ?? []) as Product[], total: Number(data.total ?? 0) };
    } catch {
        return { products: [], total: 0 };
    }
}

export async function fetchProduct(id: number): Promise<Product> {
    const url = new URL('https://dummyjson.com/products/' + id);
    try {
        const resp = await fetch(url);
        const data = (await resp.json()) as Product;

        return data;
    } catch (err) {
        console.log(err);
        throw new Error('Could not fetch product ' + id, { cause: err });
    }
}

export interface NewProduct {
    title: string;
    category: ECategory;
    description: string;
    tags: string[];
    thumbnail?: string;
    price: number;
    stock: number;
    shippingDays?: number;
}

const toSlug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

export function productFromForm(form: FormData): NewProduct {
    const get = (key: string) => String(form.get(key) ?? '').trim();
    const days = get('time');

    return {
        title: get('title'),
        category: get('category') as ECategory,
        description: get('description'),
        tags: get('tags')
            .split(',')
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean),
        thumbnail: get('thumbnail') || undefined,
        price: Number(get('price')),
        stock: Number(get('stock')),
        shippingDays: days ? Number(days) : undefined,
    };
}

export async function postProduct(product: NewProduct): Promise<Product> {
    const { shippingDays, category, thumbnail, ...rest } = product;

    const resp = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...rest,
            category: toSlug(category),
            thumbnail,
            images: thumbnail ? [thumbnail] : [],
            shippingInformation:
                shippingDays !== undefined
                    ? `Ships in ${shippingDays} ${shippingDays === 1 ? 'day' : 'days'}`
                    : undefined,
        }),
    });

    if (!resp.ok) {
        throw new Error(`Could not post product (${resp.status})`);
    }
    return (await resp.json()) as Product;
}
