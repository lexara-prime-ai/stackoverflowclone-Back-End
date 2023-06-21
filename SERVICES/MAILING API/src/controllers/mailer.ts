/* THIRD PARTY MODULES */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
/* CUSTOM MODULES */
import { DB_OPERATIONS } from "../helpers/DB_OPERATIONS";
import { VALIDATION_SCHEMA } from "../helpers/SIGN-UP-VALIDATION";
import { INIT_NOTIFICATION_SERVER } from "./notification-server";
import { INIT_MAIL_SERVER } from "./mail-server";


/* EXPORT MODULE | addUser */
export const SIGN_UP_USER = async (req: Request, res: Response) => {
    try {
        /* READ Request BODY */
        const { display_name, email, password } = req.body;
        /* VALIDATION */
        const { error } = VALIDATION_SCHEMA.validate(req.body);
        /* THROW ERROR IF VALIDATION FAILS */
        if (error) {
            return res.status(404).json(error.details[0].message);
        }

        /* HASH PASSWORD */
        const hashed_password = await bcrypt.hash(password, 10);

        await DB_OPERATIONS.EXECUTE('addUser', {
            display_name,
            email,
            password: hashed_password
        });

        await INIT_MAIL_SERVER(email);

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Sign Up successful!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`)
    }
}

/* EXPORT MODULE | MARK_AS_PREFERRED: Mark answer as preferred */
export const MARK_AS_PREFERRED = async (req: Request, res: Response) => {
    try {
        /* READ Request */
        const { answer_id } = req.params;

        const answer = await (await DB_OPERATIONS.EXECUTE('GetUserAnswer', { answer_id })).recordset[0];

        /*  CHECK IF answer EXISTS */
        if (!answer) {
            return res.status(404).json({
                message: 'Answer not found!'
            });
        }

        // SEND EMAIL TO WHOEVER POSTED THE ANSWER WHEN 
        // WHEN IT'S MARKED AS PREFERRED AND UPDATE preference
        await DB_OPERATIONS.EXECUTE('UpdatePreference', { answer_id });
        await INIT_NOTIFICATION_SERVER(answer.email);

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Answer marked as preferred!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`)
    }
}