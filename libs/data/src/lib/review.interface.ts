export interface ReviewIdentity {
    userId: string;
    productId: string;
    _id: string;
}


export interface ReviewInfo extends ReviewIdentity {
    rating: number;
    text: string;
}

export interface Review extends ReviewInfo{
    title: string
}