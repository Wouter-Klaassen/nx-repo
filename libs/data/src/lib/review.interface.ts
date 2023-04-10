export interface ReviewIdentity {
    userId: string;
    productId: string;
}


export interface ReviewInfo extends ReviewIdentity {
    rating: number;
    text: string;
}

export interface Review extends ReviewInfo{
    title: string
}