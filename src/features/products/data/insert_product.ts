import { Connection } from 'mysql';
import connection from '../../../database';
import { InsertProductRequest } from '../../../types/insert_product';

const insertProduct = (body: InsertProductRequest): Promise<boolean> => {
    const { productName, productPrice, StockQuantity, Weight, Image, Rating, CategoryName, BrandName, MaterialName } = body;

    return new Promise((resolve, reject) => {
        connection.query(`
        INSERT INTO Kategoria (Name) SELECT '${CategoryName}' WHERE NOT EXISTS (SELECT * FROM Kategoria WHERE Name = '${CategoryName}');
        `, (error: string | null) => {
            if (error) {
                reject(error);
                return;
            }

            connection.query(`
            INSERT INTO Brendi (Name) SELECT 'Brandi U' WHERE NOT EXISTS (SELECT * FROM Brendi WHERE Name = 'Brandi U');
            `, (error: string | null) => {
                if (error) {
                    reject(error);
                    return;
                }

                connection.query(`
                INSERT INTO Materiali (Name) SELECT 'Materiali U' WHERE NOT EXISTS (SELECT * FROM Materiali WHERE Name = 'Materiali U');
                `, (error: string | null) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    connection.query(`
                        INSERT INTO Produkti (Name, TypeID, BrandID, MaterialID, Price, StockQuantity, Weight, Image, Rating)
                        SELECT 
                            '${productName}', 
                            COALESCE(k.CategoryID, (SELECT MAX(CategoryID) + 1 FROM Kategoria)) AS TypeID,
                            COALESCE(b.BrandID, (SELECT MAX(BrandID) + 1 FROM Brendi)) AS BrandID,
                            COALESCE(m.MaterialID, (SELECT MAX(MaterialID) + 1 FROM Materiali)) AS MaterialID,
                            ${productPrice}, ${StockQuantity}, ${Weight}, '${Image}', ${Rating}
                        FROM 
                            (SELECT CategoryID FROM Kategoria WHERE Name = '${CategoryName}' LIMIT 1) AS k
                            LEFT JOIN (SELECT BrandID FROM Brendi WHERE Name = '${BrandName}' LIMIT 1) AS b ON true
                            LEFT JOIN (SELECT MaterialID FROM Materiali WHERE Name = '${MaterialName}' LIMIT 1) AS m ON true;
                    `, (error: string | null) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(true);
                        }
                    });
                });
            });
        });
    });
};

export default insertProduct;
