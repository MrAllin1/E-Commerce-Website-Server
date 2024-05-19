import express, { Router, Request, Response } from 'express';
import getSpecificUserBuyHistory from '../data/get_specific_user_buy_history';

const router: Router = express.Router();

router.get('/:userId', async (req, res) => {
    console.log('Request:', req.params);
    const userId: string = req.params.userId;
    const products: any = await getSpecificUserBuyHistory(userId);
    console.log('Products:', products);
    res.json(products);
});
export default router;
