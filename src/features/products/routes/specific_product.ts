import express, { Router, Request, Response } from 'express';
import checkAuth from '../../../middleware/check_auth';
import getAllProducts from '../data/get_all_products';
import getSpecificProduct from '../data/get_specific_product';
import { specificProductRequest, specificProductResponse } from '../../../types/specific_product';


const router: Router = express.Router();

router.post('/', async (req: Request<specificProductRequest>, res: Response<specificProductResponse>) => {
    const productID: number = req.body.productID;
    const products: any = await getSpecificProduct(productID);
    console.log('Products:', products);
    res.json(products);
});
export default router;
