import { Id } from "./id.type";
import { Review } from "./review.interface";

export interface ProductIdentity{
    _id:string
    name: string
}

export interface ProductInfo extends ProductIdentity {
    description: string
    category: string
    price: number
    brand: string
    reviews: Review[]
}

export interface Product extends ProductInfo {
    relatedProduct: Product[]
}