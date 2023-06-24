/* THIRD PARTY MODULES */
import { Request, Response } from 'express';
/* CUSTOM MODULES */
import { DB_OPERATIONS } from '../helpers/DB-OPERATIONS';
import { QUESTION_MODEL } from '../interfaces/types';


/* EXPORT MODULE | getQuestions */
export const getQuestions = async (req: Request, res: Response) => {
    try {
      let questions = await (await DB_OPERATIONS.EXECUTE('GetQuestionsWithAnswersAndDisplayNames')).recordset;
  
      // Format the questions array
      const formattedQuestions = questions.map((question) => {
        // Parse the answers field from string to an array of objects
        const answers = JSON.parse(question.answers);
  
        // Format the date_created field to a more human-readable format
        const dateCreated = new Date(question.date_created);
        const formattedDate = dateCreated.toLocaleDateString(); // Adjust the formatting according to your preference
  
        // Create the formatted question object
        return {
          question_id: question.question_id,
          question: question.question,
          additional_info: question.additional_info,
          category: question.category,
          date_created: formattedDate,
          question_asker: question.question_asker,
          answers: answers
        };
      });
  
      // Send the formatted questions to the frontend
      res.status(200).json(formattedQuestions);
    } catch (error: any) {
      res.json(`ERROR: ${error.message}`);
    }
  };
  

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
export const addQuestion = async (req: QUESTION_MODEL, res: Response) => {
    try {
        /* READ Request BODY */
        const { question, additional_info, category, user_id } = req.body;

        /* CHECK IF TOKEN EXISTS */
        if (req.info) {
            await DB_OPERATIONS.EXECUTE('addQuestion', {
                question,
                additional_info,
                category,
                user_id
            });
        }

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

        /*RETRIEVE QUESTION FROM DATABSE USING ASSIGNED question_id*/
        let original_question = await (await DB_OPERATIONS.EXECUTE('getQuestionById', { question_id })).recordset[0];

        /* CHECK IF QUESTION EXISTS */
        if (!original_question) {
            res.status(404).json({
                message: 'Question not found!'
            });
        }

        /* PROCEED WITH UPDATE IF QUESTION EXISTS */
        const { question, additional_info, category, user_id } = req.body;

        await DB_OPERATIONS.EXECUTE('updateQuestion', {
            question_id, question, additional_info, category, user_id
        });

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Question updated successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | deleteQuestion */
export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        /* GET question_id */
        const { question_id } = req.params;
        /*RETRIEVE QUESTION FROM DATABSE USING ASSIGNED question_id*/
        let question = await (await DB_OPERATIONS.EXECUTE('getQuestionById', { question_id })).recordset[0];

        await (await DB_OPERATIONS.EXECUTE('deleteQuestion', { question_id }));

        /* CHECK IF QUESTION EXISTS */
        if (!question) {
            res.status(404).json({
                message: 'Question not found!'
            });
        }

        /* SUCCESS STATE */
        res.status(200).json({
            message: 'Question deleted!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}