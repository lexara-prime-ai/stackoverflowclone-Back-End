import { DB_OPERATIONS } from "../helpers/DB_OPERATIONS";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const RESET_PASSWORD = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        /* GET USER TO UPDATE BY ID */
        let user = await (await DB_OPERATIONS.EXECUTE('getUserByEmail', { email })).recordset[0];

        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
        }

        /* UPDATE USER | User info */
        const {
            password /* GET INFO FROM request body */
        } = req.body;

        /* ENCRYPT UPDATED PASSWORD */
        let hashed_password = await bcrypt.hash(password, 10);

        /* EXECUTE STORED PROCEDURE TO UPDATE USER */
        await DB_OPERATIONS.EXECUTE('updatePassword', {
            email,
            password: hashed_password
        });

        res.status(201).json({
            message: 'Password updated successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}