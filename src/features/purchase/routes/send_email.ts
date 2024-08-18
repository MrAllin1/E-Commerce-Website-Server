import express, { Router, Request, Response } from 'express';
import postBuyProduct from '../data/post_buy_product';
import { sendEmailRequest, sendEmailResponse } from '../../../types/send_email';
import sendEmail from '../data/send_email';
import getBuyCount from '../data/get_buys_count';

const router: Router = express.Router();

router.post('/', async (req: Request<sendEmailRequest>, res: Response<sendEmailResponse>) => {
    try {
        console.log('POST / endpoint called.');
        const { produkti, sasia, emri, mbiemri, numri, adresa, qyteti, phoneNumber, email, text, font, color } = req.body as sendEmailRequest;

        console.log('Request body parsed:', req.body);

        const { name, purchase_count } = await getBuyCount(produkti);
        console.log('getBuyCount called, result:', { name, purchase_count });

        await sendEmail(name ?? '', sasia, emri, mbiemri, adresa, phoneNumber, qyteti, purchase_count, email, font ?? '', text ?? '', color ?? '');
        console.log('sendEmail called successfully.');

        res.json({ success: true });
        console.log('Response sent with success: true');
    } catch (error) {
        console.error('Error encountered:', error);
        res.status(500).json({ success: false });
        console.log('Response sent with success: false due to error.');
    }
});

export default router;
