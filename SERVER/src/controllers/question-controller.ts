/* THIRD PARTY MODULES */
import { Request, Response } from 'express';
/* CUSTOM MODULES */
import { DB_OPERATIONS } from '../helpers/DB-OPERATIONS';
import { VALIDATION_SCHEMA } from '../helpers/QUESTION-VALIDATION';


/* EXPORT MODULE | getQuestions */
export const getQuestions = async (req: Request, res: Response) => {
    try {
        let questions = await (await DB_OPERATIONS.EXECUTE('getQuestions')).recordset;
        /* SUCCESS STATE */
        res.status(200).json(questions);
    } catch (error: any) {
        res.json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | getQuestionById */
export const getQuestionById = async (req: Request<{ question_id: string }>, res: Response) => {
    try {
        /* GET question_id FROM REQUEST BODY */
        const { question_id } = req.params;

        let question = await (await DB_OPERATIONS.EXECUTE('getQuestionById', { question_id })).recordset[0];

        /* CHECK IF question EXISTS */
        if (!question) {
            return res.status(404).json({
                message: 'Question not found!'
            });
        }

        /* SUCCESS STATE */
        return res.status(200).json(question);
    } catch (error: any) {
        res.json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | addQuestion */
export const addQuestion = async (req: Request, res: Response) => {
    try {
        /* READ Request BODY */
        const { question, additional_info, category } = req.body;
        /* VALIDATION */
        const { error } = VALIDATION_SCHEMA.validate(req.body);
        /* THROW ERROR IF VALIDATION FAILS */
        if (error) {
            return res.status(404).json(error.details[0].message);
        }

        await DB_OPERATIONS.EXECUTE('addQuestion', {
            question,
            additional_info,
            category
        });

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Question added successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`)
    }
}

/* EXPORT MODULE | updateQuestion */
export const updateQuestion = async (req: Request, res: Response) => {
    try {
        /* GET question_id */
        const { question_id } = req.params;
        /*RETRIEVE USER FROM DATABSE USING ASSIGNED question_id*/
        let question = await (await DB_OPERATIONS.EXECUTE('getUserById', { question_id })).recordset[0];

        /* CHECK IF USER EXISTS */
        if (!question) {
            res.status(404).json({
                message: 'User not found!'
            });
        }

        /* PROCEED WITH UPDATE IF USER EXISTS */
        const { display_name, email, password } = req.body;

        await DB_OPERATIONS.EXECUTE('updateQuestion', {
            question_id, display_name, email, password
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
        /* GET question_id */
        const { question_id } = req.params;
        /*RETRIEVE USER FROM DATABSE USING ASSIGNED question_id*/
        let question = await (await DB_OPERATIONS.EXECUTE('getUserById', { question_id })).recordset[0];

        await (await DB_OPERATIONS.EXECUTE('deleteUser', { question_id }));

        /* CHECK IF USER EXISTS */
        if (!question) {
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