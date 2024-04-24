interface specificGenderProductRequest {
    gender: string;
    categoryFilters?: string[];
}

interface specificGenderProductResponse {
    ProductID: number;
    ProductName: string;
    ProductPrice: number;
    StockQuantity: number;
    Weight: number;
    Rating: number;
    CategoryName: string;
    BrandName: string;
    MaterialName: string;
    gender: string;
    images: string

}

export { specificGenderProductRequest, specificGenderProductResponse };