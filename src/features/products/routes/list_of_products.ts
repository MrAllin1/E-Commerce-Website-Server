import express, { Router, Request, Response } from 'express';
import getListOfProducts from '../data/get_a_list_of_products';
import { getListOfProductsRequest,getListOfProductsResponse } from '../../../types/list_of_products';

const router: Router = express.Router();

router.post('/', async (req: Request<getListOfProductsRequest>, res: Response<getListOfProductsResponse>) => {
    const productIDs: number[] = req.body.productIDs; // Assuming req.body.productIDs is an array of product IDs
    try {
        const products: any = await getListOfProducts(productIDs);
        res.json(products);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
