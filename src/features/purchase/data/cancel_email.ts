import { Response } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'andidevelopmentacc@gmail.com', // Your email address
        pass: 'yukb bpow kyqb yuqk'   // Your email password (consider using environment variables)
    }
});

const sendCancelEmail = (email: string) => {
    return new Promise<void>((resolve, reject) => {
        try {
            // Send email notification
            const mailOptions = {
                from: 'andidevelopmentacc@gmail.com', // Sender address
                to: 'silverpointkosove@gmail.com',    // Recipient address from request body
                subject: `Anulohet porosia`, // Subject line
                text: `Përshendetje,\n\nBlerësi ${email} ka anuluar porosinë e tij.\n\nTelefonojeni për arsyen\n\nRegards,\nSilver Point Website` // Plain text body
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    reject(error);
                } else {
                    resolve();
                }
            });
        } catch (error) {
            console.error('Error:', error);
            reject(error);
        }
    });
};

export default sendCancelEmail;
