import express, { Router, Request, Response } from 'express';
import { AddReviewRequest } from '../../../types/add_review';
import { addReview } from '../data/add_review';
import { getReviewsForProduct } from '../data/get_review';

const router: Router = express.Router();



router.post('/addReview', async (req: Request<{}, {}, AddReviewRequest>, res: Response) => {
    const { userId, productId, rating, comment, timestamp } = req.body;

    try {
        const success = await addReview({ userId, productId, rating, comment, timestamp });
        if (success) {
            res.status(200).json({ message: 'Review added successfully' });
        } else {
            res.status(400).json({ message: 'Failed to add review' });
        }
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Error adding review' });
    }
});


router.get('/reviews/:productId', async (req: Request, res: Response) => {
    const productId: number = parseInt(req.params.productId);

    try {
        const reviews = await getReviewsForProduct(productId);
        if (reviews.length === 0) {
            // Handle case when no reviews are found
            res.status(404).json({ message: 'No reviews found for the specified product' });
            return;
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting reviews for product:', error);
        res.status(500).json({ message: 'Error getting reviews for product' });
    }
});

export default router;