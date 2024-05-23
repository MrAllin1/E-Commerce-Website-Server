import connection from '../../../database';
import { Review } from "../../../types/get_review";

export const getReviewsForProduct = (productId: number): Promise<Review[]> => {
    return new Promise((resolve, reject) => {
        connection.query(
            `CALL GetReviewsForProduct(${productId})`,
            (error: string, results: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                // Assuming results[0] contains the rows from the query
                const rows = results[0];
                if (!Array.isArray(rows)) {
                    reject(new Error('Rows retrieved from the query are not in an array format'));
                    return;
                }
                const reviews: Review[] = rows.map((row: any) => ({
                    reviewId: row.ReviewID,
                    userId: row.UserID,
                    productId: row.ProductID,
                    rating: row.Rating,
                    comment: row.Comment,
                    timestamp: row.Timestamp
                }));
                resolve(reviews);
            }
        );
    });
};