import express, { Router, Request, Response } from 'express';
import postBuyProduct from '../data/post_buy_product';
import { buyProductRequest, buyProductResponse } from '../../../types/buy_product';
import nodemailer from 'nodemailer';

const router: Router = express.Router();



router.post('/', async (req: Request<buyProductRequest>, res: Response<buyProductResponse>) => {
    const { userId, productId, quantity, firstName, lastName, phoneNumber, email, address, city } = req.body as buyProductRequest;
    try {
        console.log('buying a product')
        await postBuyProduct(userId, productId, quantity, firstName, lastName, phoneNumber, email, address, city);

        console.log('bought a product')
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false });
    }
});

export default router;
