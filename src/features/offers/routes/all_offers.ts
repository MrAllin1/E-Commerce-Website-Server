import express, { Router, Request, Response } from 'express';
import getAllProductsOnSale from '../data/get_all_products_in_sale';

const router: Router = express.Router();

router.get('/', async (req, res) => {
    const offers: any = await getAllProductsOnSale();
    res.json(offers);
});

export default router;
