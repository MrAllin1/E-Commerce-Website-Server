
import connection from '../../../database';

const getAllProductsOnSale = () => {
    return new Promise((resolve, reject) => {
        connection.query(`
        SELECT 
        O.OfferID,
        O.DiscountPercentage,
        O.StartDate,
        O.EndDate,
        P.ProductID,
        P.Name AS ProductName,
        C.Name AS CategoryName,
        B.Name AS BrandName,
        M.Name AS MaterialName,
        P.Price,
        P.OriginalPrice,
        P.StockQuantity,
        P.Weight,
        P.Image,
        P.Rating
    FROM 
        Oferta O
    JOIN 
        Produkti P ON O.ProductID = P.ProductID
    JOIN 
        Kategoria C ON P.TypeID = C.CategoryID
    JOIN 
        Brendi B ON P.BrandID = B.BrandID
    JOIN 
        Materiali M ON P.MaterialID = M.MaterialID;`
            , (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
    });
};
export default getAllProductsOnSale;
