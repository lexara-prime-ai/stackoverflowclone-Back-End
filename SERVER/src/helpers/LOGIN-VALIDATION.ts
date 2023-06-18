import joi from 'joi';
/* VALIDATION SCHEMA */
export const VALIDATION_SCHEMA = joi.object({
    display_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
})