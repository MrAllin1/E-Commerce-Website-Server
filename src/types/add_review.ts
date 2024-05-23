interface AddReviewRequest {
    userId: number;
    productId: number;
    rating: number;
    comment: string;
    timestamp: string;
}

export {AddReviewRequest }
