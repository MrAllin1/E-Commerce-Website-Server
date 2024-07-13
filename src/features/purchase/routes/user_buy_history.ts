import express, { Router, Request, Response } from 'express';
import getSpecificUserBuyHistory from '../data/get_specific_user_buy_history';

const router: Router = express.Router();

router.get('/:userId', async (req, res) => {
    const userId: string = req.params.userId;
    const products: any = await getSpecificUserBuyHistory(userId);
    res.json(products);
});
export default router;
