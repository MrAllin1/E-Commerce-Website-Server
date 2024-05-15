import connection from '../../../database'; // Import the database connection
import { Connection } from 'mysql'; // Import Connection if necessary
const deleteProductById = async (productId: number): Promise<boolean> => {
    try {
        const result: any = await new Promise<any>((resolve, reject) => {
            connection.query('CALL delete_product_by_id(?)', [productId], (error: any, result: any) => {
                if (error) {
                    reject(error); // Reject with the actual error
                } else {
                    resolve(result && result.affectedRows > 0); // Resolve with true if rows affected > 0, indicating deletion success
                }
            });
        });

        return result;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false; // Return false if there's an error
    }
};

export default deleteProductById;