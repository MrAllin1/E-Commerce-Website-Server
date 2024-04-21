import express, { Router, Request, Response } from 'express';
import checkAuth from '../../../middleware/check_auth';
import insertProduct from '../data/insert_product';
import { InsertProductRequest, InsertProductResponse } from '../../../types/insert_product';
import admin_auth from '../../../middleware/check_admin_auth';

const router: Router = express.Router();

router.post('/', admin_auth, async (req: Request<InsertProductRequest>, res: Response<InsertProductResponse>) => {
    const { success, productId } = await insertProduct(req.body);
    console.log('success:', success);
    console.log('productId:', productId);
    res.json({
        success: success,
        productId: productId
    });
});

export default router;
