import express, { Router, Request, Response } from 'express';
import checkAuth from '../../../middleware/check_auth';
import getAllProducts from '../data/get_all_products';

const router: Router = express.Router();

router.get('/', async (req, res) => {
    const products: any = await getAllProducts();
    console.log('Products:', products);
    res.json(products);
});
export default router;
