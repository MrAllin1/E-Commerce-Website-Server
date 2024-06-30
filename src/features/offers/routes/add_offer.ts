import express, { Router, Request, Response } from 'express';
import checkAuth from '../../../middleware/check_auth';
import admin_auth from '../../../middleware/check_admin_auth';
import addOffer from '../data/add_offer';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { product_id, discount_percentage, start_date, end_date } = req.body;

    try {
        const addResult = await addOffer(product_id, discount_percentage, start_date, end_date);

        if (addResult) {
            res.status(201).json({ message: "Offer added successfully." });
        } else {
            res.status(500).json({ message: "Failed to add offer." });
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export default router;
