import { Product } from "./product.interface";

export interface PurchaseLogIdentity {
    userId: string;
    email: string;
}


export interface PurchaseLogInfo extends PurchaseLogIdentity {
    adress: string;
    products: Product[];
}

export interface PurchaseLog extends PurchaseLogInfo{
    priceTotal: number
}