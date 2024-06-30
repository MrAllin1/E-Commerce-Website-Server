import express, { Router, Request, Response } from 'express';
import checkAuth from '../../../middleware/check_auth';
import { InsertProductRequest, InsertProductResponse } from '../../../types/insert_product';
import admin_auth from '../../../middleware/check_admin_auth';
import deleteOfferByProductId from '../data/remove_offer';

const router: Router = express.Router();

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const productId: number = parseInt(req.params.id, 10);
        const deleteResult = await deleteOfferByProductId(productId);

        if (deleteResult) {
            res.status(200).json({ message: "Oferrt deleted successfully." });
        } else {
            res.status(404).json({ message: "Offert not found." });
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});


export default router;