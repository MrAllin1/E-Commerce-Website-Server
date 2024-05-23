import express, { Router, Request, Response } from 'express';

import getSpecificGenderProduct from '../data/get_specific_gender_products';
import { specificGenderProductRequest, specificGenderProductResponse } from '../../../types/specifi_gender_products';


const router: Router = express.Router();

router.post('/', async (req: Request<specificGenderProductRequest>, res: Response<specificGenderProductResponse>) => {
    const gender: string = req.body.gender;
    const filters: string[] | undefined= req.body.categoryFilters;

    const products: any = await getSpecificGenderProduct(gender, filters);
    console.log("blblalblbl" + products.length)

    res.json(products);
});
export default router;
