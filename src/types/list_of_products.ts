interface getListOfProductsRequest {
    productIDs: number[];
}

interface getListOfProductsResponse {
    ProductID?: number;
    ProductName?: string;
    ProductPrice?: number;
    StockQuantity?: number;
    Weight?: number;
    Rating?: number;
    CategoryName?: string;
    BrandName?: string;
    MaterialName?: string;
    gender?: string;
    images?: string
    error?: string;
}

export { getListOfProductsRequest, getListOfProductsResponse };