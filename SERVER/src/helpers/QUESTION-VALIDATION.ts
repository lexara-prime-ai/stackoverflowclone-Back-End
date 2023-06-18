import joi from 'joi';
/* VALIDATION SCHEMA */
export const VALIDATION_SCHEMA = joi.object({
    question: joi.string().required(),
    additional_info: joi.string().required(),
    category: joi.string().required()
})