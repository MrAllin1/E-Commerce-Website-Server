interface specificProductRequest {
    ProductID: number;
}

interface specificProductResponse {
    ProductID: number;
    ProductName: string;
    ProductPrice: number;
    StockQuantity: number;
    Weight: number;
    Rating: number;
    CategoryName: string;
    BrandName: string;
    MaterialName: string;
    images: string

}

export { specificProductRequest, specificProductResponse };