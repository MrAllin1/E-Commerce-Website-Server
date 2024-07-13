import express, { Router, Request, Response } from 'express';
import sendCancelEmail from '../data/cancel_email';
const router: Router = express.Router();

router.get('/:userEmail', async (req, res) => {
    const email: string = req.params.userEmail;
    await sendCancelEmail(email);
    res.json({
        "success": true
    }
    );
});
export default router;
