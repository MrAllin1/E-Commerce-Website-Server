import express, { Router, Request, Response } from 'express';
import sendCancelEmail from '../data/cancel_email';

const router: Router = express.Router();

router.get('/:userEmail', async (req: Request, res: Response) => {
    try {
        console.log('GET /:userEmail endpoint called.');
        const email: string = req.params.userEmail;

        console.log('Extracted email from params:', email);

        await sendCancelEmail(email);
        console.log('sendCancelEmail called successfully.');

        res.json({
            success: true
        });
        console.log('Response sent with success: true');
    } catch (error) {
        console.error('Error encountered:', error);
        res.status(500).json({ success: false });
        console.log('Response sent with success: false due to error.');
    }
});

export default router;
