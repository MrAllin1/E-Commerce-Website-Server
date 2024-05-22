import { Connection } from 'mysql';
import connection from '../../../database';
import { InsertProductRequest } from '../../../types/insert_product';

interface InsertionResult {
    success: boolean;
    productId?: number; // Optional ProductID
}

const insertProduct = async (body: InsertProductRequest): Promise<InsertionResult> => {
    const { productName, productPrice, StockQuantity, Weight, Rating, CategoryName, BrandName, MaterialName, gender } = body;

    try {
        const results: any = await new Promise<any>((resolve, reject) => {
            connection.query(`CALL insert_product(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [productName, productPrice, StockQuantity, Weight, Rating, CategoryName, BrandName, MaterialName,gender],
                (error: any, results: any) => {
                    if (error) {
                        reject(error); // Reject with the actual error
                    }
                    resolve(results); // Resolve with results if insertion is successful
                });
        });

        console.log('results:', results);
        if (results && results.length > 0 && results[0][0] && results[0][0].ProductID) {
            const productId = results[0][0].ProductID;
            return { success: true, productId }; // Return success along with ProductID
        } else {
            return { success: false }; // Return false if insertion failed or no ProductID found
        }
    } catch (error) {
        console.error('Error inserting product:', error);
        return { success: false }; // Return false if there's an error
    }
};

export default insertProduct;
