import { Request, Response } from "express";
import { INIT_MAIL_SERVER } from "./mail-server";
import { DB_OPERATIONS } from "../helpers/DB_OPERATIONS";
import JWT from "jsonwebtoken";

/* ESTABLISH CONNECTION WITH DATABASE(SQL SERVER) */
export const GET_USER_EMAIL = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        // EXECUTE STORED PROCEDURE TO GET USER BY EMAIL | Passed as part of the request
        let user = await (await DB_OPERATIONS.EXECUTE('getUserByEmail', { email })).recordset;
        // CHECK IF USER EMAIL EXISTS
        if (!email) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        /* SEND EMAIL TO USER */
        await INIT_MAIL_SERVER(email);

        const payload = user.map(userInfo => {
            const {
                password,
                ...rest
            } = userInfo;
            return rest;
        });

        /* GENERATE NEW TOKEN */
        const TOKEN = JWT.sign(payload[0], process.env.SECRET_KEY as string, { expiresIn: '360000s' });

        /* DISPLAY SUCCESS MESSAGE */
        return res.status(200).json({
            message: 'Email sent!',
            TOKEN
        });
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
}

