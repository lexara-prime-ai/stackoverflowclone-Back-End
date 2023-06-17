import { Request, Response } from 'express';
import { DB_OPERATIONS } from '../helpers/DB-OPERATIONS';

/* EXPORT MODULE | getUsers */
export const getUsers = async (req: Request, res: Response) => {
    try {
        let users = await (await DB_OPERATIONS.EXECUTE('getUsers')).recordset;
        /* SUCCESS STATE */
        res.status(200).json(users);
    } catch (error: any) {
        res.json(`ERROR: ${error.message}`);
    }
}