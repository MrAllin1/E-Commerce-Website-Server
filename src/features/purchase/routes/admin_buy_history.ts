import express, { Router, Request, Response } from 'express';
import getSpecificUserBuyHistory from '../data/get_specific_user_buy_history';
import getAdminBuyHistory from '../data/get_admin_buy_history';

const router: Router = express.Router();

router.get('/', async (req, res) => {
    const products: any = await getAdminBuyHistory();
    res.json(products);
});
export default router;
