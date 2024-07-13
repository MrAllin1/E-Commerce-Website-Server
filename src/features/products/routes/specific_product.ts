import express, { Router, Request, Response } from 'express';
import checkAuth from '../../../middleware/check_auth';
import getAllProducts from '../data/get_all_products';
import getSpecificProduct from '../data/get_specific_product';

import { specificProductRequest, specificProductResponse } from '../../../types/specific_product';
import getSpecificProducts from '../data/get_specific_products';


const router: Router = express.Router();

router.post('/', async (req: Request<specificProductRequest>, res: Response<specificProductResponse>) => {
    const productID: number = req.body.productID;
    const products: any = await getSpecificProduct(productID);
    res.json(products);
});



router.get('/:ids', async (req: Request, res: Response) => {
    try {
        const productIDs: number[] = req.params.ids.split(',').map((id: string) => parseInt(id, 10));
        const products = await getSpecificProducts(productIDs);
        res.send(products);
    } catch (error) {
        // Handle any errors
    }
});



export default router;
