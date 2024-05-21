import express, { Router, Request, Response } from 'express';
import getSpecificUserBuyHistory from '../data/get_specific_user_buy_history';
import getAdminBuyHistory from '../data/get_admin_buy_history';

const router: Router = express.Router();

router.get('/', async (req, res) => {
    console.log('Request:', req.params);
    const products: any = await getAdminBuyHistory();
    console.log('Products:', products);
    res.json(products);
});
export default router;
