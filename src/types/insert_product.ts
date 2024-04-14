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
}

interface InsertProductResponse {
    success: boolean;
}
export { InsertProductRequest, InsertProductResponse };