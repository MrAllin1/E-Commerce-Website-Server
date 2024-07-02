import express, { Router, Request, Response } from 'express';
import checkAuth from '../../../middleware/check_auth';
import admin_auth from '../../../middleware/check_admin_auth';
import updateProductPrice from "../data/update_product_price";

const router: Router = express.Router();

router.put('/:id/price', async (req: Request, res: Response) => {
    try {
        const productId: number = parseInt(req.params.id, 10);
        const newPrice: number = req.body.price;

        if (isNaN(newPrice) || newPrice <= 0) {
            return res.status(400).json({ message: "Invalid price value." });
        }

        const updateResult = await updateProductPrice(productId, newPrice);
        
        if (updateResult) {
            res.status(200).json({ message: "Product price updated successfully." });
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router;
