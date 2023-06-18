/* THIRD PARTY MODULES */
import { Request, Response } from 'express';
/* CUSTOM MODULES */
import { DB_OPERATIONS } from '../helpers/DB-OPERATIONS';
import { VALIDATION_SCHEMA } from '../helpers/LOGIN-VALIDATION';


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

/* EXPORT MODULE | getUserById */
export const getUserById = async (req: Request<{ user_id: string }>, res: Response) => {
    try {
        /* GET user_id FROM REQUEST BODY */
        const { user_id } = req.params;

        let user = await (await DB_OPERATIONS.EXECUTE('getUserById', { user_id })).recordset[0];

        /* CHECK IF user EXISTS */
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        /* SUCCESS STATE */
        return res.status(200).json(user);
    } catch (error: any) {
        res.json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | addUser */
export const addUser = async (req: Request, res: Response) => {
    try {
        /* READ Request BODY */
        const { display_name, email, password } = req.body;
        /* VALIDATION */
        const { error } = VALIDATION_SCHEMA.validate(req.body);
        /* THROW ERROR IF VALIDATION FAILS */
        if (error) {
            return res.status(404).json(error.details[0].message);
        }

        await DB_OPERATIONS.EXECUTE('addUser', {
            display_name,
            email,
            password
        });

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'User add successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`)
    }
}

/* EXPORT MODULE | updateUser */
export const updateUser = async (req: Request, res: Response) => {
    try {
        /* GET user_id */
        const { user_id } = req.params;
        /*RETRIEVE USER FROM DATABSE USING ASSIGNED user_id*/
        let user = await (await DB_OPERATIONS.EXECUTE('getUserById', { user_id })).recordset[0];

        /* CHECK IF USER EXISTS */
        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
        }

        /* PROCEED WITH UPDATE IF USER EXISTS */
        const { display_name, email, password } = req.body;

        await DB_OPERATIONS.EXECUTE('updateUser', {
            user_id, display_name, email, password
        });

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'User updated successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | deleteUser */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        /* GET user_id */
        const { user_id } = req.params;
        /*RETRIEVE USER FROM DATABSE USING ASSIGNED user_id*/
        let user = await (await DB_OPERATIONS.EXECUTE('getUserById', { user_id })).recordset[0];

        await (await DB_OPERATIONS.EXECUTE('deleteUser', { user_id }));

        /* CHECK IF USER EXISTS */
        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
        }

        /* SUCCESS STATE */
        res.status(200).json({
            message: 'User deleted!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}