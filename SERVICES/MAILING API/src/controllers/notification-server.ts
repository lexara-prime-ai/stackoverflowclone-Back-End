/* CORE MODULES */
import path from 'path';
/* THIRD PARTY MODULES */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/* DEBUGGING | ERROR LOGGING */
const log = console.log;

/* EXPORT MODULE | INIT_NOTIFICATION_SERVER */
export const INIT_NOTIFICATION_SERVER = async (USER_EMAIL: string) => {
    // CREATE TRANSPORTER OBJECT USING DEFAULT SMTP TRANSPORT
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    // HTML CONTENT
    let htmlContent = `
        <h4 style="background: #eee; padding: .5rem; border-radius: .5rem; color: #242424; font-family: monospace;">
            Your answer has been marked as | <span style="font-weight:700;">preferred. Keep it up!</span>
            <a href="http://localhost:4200/reset">                   
                Navigate to homepage...
            </a>
        </h4>
    `;

    // SEND MAIL WITH DEFINED TRANSPORT OBJECT
    let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: USER_EMAIL,
        subject: '✅ StackNewbie | Your answer has been...',
        html: htmlContent
    });
    // LOG MESSAGE INFO
    log('Message sent: %s', info.messageId);
}

