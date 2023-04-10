import { Product } from "./product.interface";

export interface ShopcartIdentity {
    userId: string;
}


export interface ShopcartInfo extends ShopcartIdentity {
    products: Product[];
    text: string;
}

export interface Shopcart extends ShopcartInfo{
    title: string
}