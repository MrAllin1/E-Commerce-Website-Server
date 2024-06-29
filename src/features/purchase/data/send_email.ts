import { Response } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'andidevelopmentacc@gmail.com', // Your email address
        pass: 'yukb bpow kyqb yuqk'   // Your email password (consider using environment variables)
    }
});

const sendEmail = (produkti: string, sasia: number, emri: string, mbiemri: string, adresa: string, phoneNumber: string, qyteti: string, count: number) => {
    return new Promise<void>((resolve, reject) => {
        try {
            // Send email notification
            const mailOptions = {
                from: 'andidevelopmentacc@gmail.com', // Sender address
                to: 'silverpointkosove@gmail.com',    // Recipient address from request body
                subject: `TEST ${count}`, // Subject line
                text: `Përshendetje,\n\nSapo është bërë një porosi në webfaqe!\n\nPorosia është bërë nga ${emri} ${mbiemri} \n\nPorosia është produkti: (${produkti}) personi ka porositur ${sasia} copë \n\nAdresa e shënuar është: ${adresa} \nQyteti: ${qyteti}.\n\nKontakto personin në numrin:${phoneNumber}\n\nRegards,\nSilver Point Website` // Plain text body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    reject(error);
                } else {
                    console.log('Email sent:', info.response);
                    resolve();
                }
            });
        } catch (error) {
            console.error('Error:', error);
            reject(error);
        }
    });
};

export default sendEmail;
