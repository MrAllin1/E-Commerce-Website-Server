import connection from '../../../database'; // Import the database connection

const addOffer = async (product_id: number, discount_percentage: number | null, start_date: string | null, end_date: string | null): Promise<boolean> => {
    try {
        const result: any = await new Promise<any>((resolve, reject) => {
            connection.query(
                'CALL add_new_offer(?, ?, ?, ?)', 
                [product_id, discount_percentage, start_date, end_date], 
                (error: any, result: any) => {
                    if (error) {
                        reject(error); // Reject with the actual error
                    } else {
                        resolve(result && result.affectedRows > 0); // Resolve with true if rows affected > 0, indicating insertion success
                    }
                }
            );
        });

        return result;
    } catch (error) {
        console.error('Error adding offer:', error);
        return false; // Return false if there's an error
    }
};

export default addOffer;
