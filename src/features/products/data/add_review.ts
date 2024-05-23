import connection from "../../../database";
import { AddReviewRequest } from "../../../types/add_review";

export const addReview = async (review: AddReviewRequest): Promise<boolean> => {
    try {
        const result: boolean = await new Promise<boolean>((resolve, reject) => {
            const sql = 'CALL AddReview(?, ?, ?, ?, ?)';
            const { userId, productId, rating, comment, timestamp } = review;

            connection.query(sql, [userId, productId, rating, comment, timestamp], (error: any, results: any) => {
                if (error) {
                    reject(error); // Reject with the actual error
                } else {
                    const affectedRows = results.affectedRows || 0;
                    resolve(affectedRows > 0); // Resolve with true if rows affected > 0, indicating insertion success
                }
            });
        });

        return result;
    } catch (error) {
        console.error('Error adding review:', error);
        return false; // Return false if there's an error
    }
};