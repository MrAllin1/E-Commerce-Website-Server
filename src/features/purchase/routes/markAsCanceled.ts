import express, { Router, Request, Response } from 'express';
import postMarkAsCanceled from '../data/post_mark_as_canceled';

const router: Router = express.Router();

router.get('/:purchaseId', async (req, res) => {
    const purchaseId: string = req.params.purchaseId;
    const products: any = await postMarkAsCanceled(purchaseId);
    res.json(products);
});
export default router;
