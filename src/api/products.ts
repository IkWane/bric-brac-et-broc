import { ECategory } from '../types/Categories';
import type { Product } from '../types/Product';

function getValueByKeyForStringEnum(value: string) {
    return Object.entries(ECategory).find(([key]) => key === value)?.[1];
}

export async function fetchProducts(query: string, priceASC: boolean = true, category?: string): Promise<Product[]> {
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

    try {
        const resp = await fetch(url);
        const data = (await resp.json()).products as Product[];
        console.log(url);
        return data;
    } catch (err) {
        console.log(err);
        return [];
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
