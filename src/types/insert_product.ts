interface InsertProductRequest {
    productName: string;
    productPrice: number;
    StockQuantity: number;
    Weight: number;
    Image: string;
    Rating: number;
    CategoryName: string;
    BrandName: string;
    MaterialName: string;
    gender: string;
}

interface InsertProductResponse {
    success: boolean;
    productId?: number;
}
export { InsertProductRequest, InsertProductResponse };