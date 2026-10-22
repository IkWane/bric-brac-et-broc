import type { ECategory } from "./Categories"

export interface Product {
    id: string
    title: string
    price: number
    thumbnail: string
    postedAgo: string
    /** Small paper label stuck on top of the card, e.g. "TAPE TAG #114" */
    label: string
    labelSide?: 'left' | 'right'
    tags: string[]
    stock: number
    brand: string
    category: ECategory
    description: string
 
    // Extra fields returned by dummyjson's /products/:id, used by ProductPage
    images?: string[]
    rating?: number
    availabilityStatus?: string
    warrantyInformation?: string
    shippingInformation?: string
    returnPolicy?: string
    meta?: { createdAt: string; updatedAt: string }
}