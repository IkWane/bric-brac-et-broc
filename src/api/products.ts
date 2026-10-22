import type { Product } from "../types/Product";

export async function fetchProducts(query: string): Promise<Product[]> {
    const url = new URL('https://dummyjson.com/products' + (query ? '/search' : ''));
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