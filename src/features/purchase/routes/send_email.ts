import express, { Router, Request, Response } from 'express';
import postBuyProduct from '../data/post_buy_product';
import { sendEmailRequest, sendEmailResponse } from '../../../types/send_email';
import sendEmail from '../data/send_email';
import getBuyCount from '../data/get_buys_count';

const router: Router = express.Router();

router.post('/', async (req: Request<sendEmailRequest>, res: Response<sendEmailResponse>) => {
    try {
        const { produkti, sasia, emri, mbiemri, numri, adresa, qyteti, phoneNumber } = req.body as sendEmailRequest;
        console.log(req.body);

        const { name, purchase_count } = await getBuyCount(produkti);
        console.log(`Product Name: ${name}, Purchase Count: ${purchase_count}`);

        await sendEmail(name ?? '', sasia, emri, mbiemri, adresa, phoneNumber, qyteti, purchase_count);
        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false });
    }
});

export default router;
