import { Connection } from 'mysql';
import connection from '../../../database';
import { InsertProductRequest } from '../../../types/insert_product';

const insertProduct = (body: InsertProductRequest): Promise<boolean> => {
    const { productName, productPrice, StockQuantity, Weight, Image, Rating, CategoryName, BrandName, MaterialName } = body;

    return new Promise((resolve, reject) => {
        connection.query(`CALL insert_product(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [productName, productPrice, StockQuantity, Weight, Image, Rating, CategoryName, BrandName, MaterialName], async (error: any, results: any,) => {
                if (error) {
                    reject(false); // Reject with false if there's an error
                }
                resolve(true); // Resolve with true if insertion is successful
            });
    });

};

export default insertProduct;
