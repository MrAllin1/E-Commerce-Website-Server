import connection from '../../../database'; // Import the database connection

const updateProductPrice = async (productId: number, newPrice: number): Promise<boolean> => {
    try {
        const result: any = await new Promise<any>((resolve, reject) => {
            connection.query('CALL update_product_price(?, ?)', [productId, newPrice], (error: any, result: any) => {
                if (error) {
                    reject(error); // Reject with the actual error
                } else {
                    // Check if any rows were affected
                    resolve(result.affectedRows > 0); // Resolve with true if rows affected > 0, indicating update success
                }
            });
        });

        return result;
    } catch (error) {
        console.error('Error updating product price:', error);
        return false; // Return false if there's an error
    }
};

export default updateProductPrice;
