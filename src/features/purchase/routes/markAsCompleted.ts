import express, { Router, Request, Response } from 'express';

import postMarkAsComplete from '../data/post_mark_as_completed';

const router: Router = express.Router();

router.get('/:purchaseId', async (req, res) => {
    console.log('Request:', req.params);
    const purchaseId: string = req.params.purchaseId;
    const products: any = await postMarkAsComplete(purchaseId);
    console.log('Products:', products);
    res.json(products);
});
export default router;
