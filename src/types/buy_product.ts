interface buyProductRequest {
    userId: number;
    productId: number;
    quantity: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
}

interface buyProductResponse {
    success?: boolean;
}

export { buyProductRequest, buyProductResponse };