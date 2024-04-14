
import connection from '../../../database';

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        connection.query(`
        SELECT 
        P.ProductID,
        P.Name AS ProductName,
        C.Name AS CategoryName,
        B.Name AS BrandName,
        M.Name AS MaterialName,
        P.Price,
        P.StockQuantity,
        P.Weight,
        P.Image,
        P.Rating
    FROM 
        Produkti P
    left JOIN 
        Kategoria C ON P.TypeID = C.CategoryID
    left JOIN 
        Brendi B ON P.BrandID = B.BrandID
    left JOIN 
        Materiali M ON P.MaterialID = M.MaterialID;
    `
            , (error: string, results: string) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
    });
};
export default getAllProducts;
