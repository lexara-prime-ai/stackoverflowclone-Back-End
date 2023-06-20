import { Request } from "express";

interface USER_MODEL {
    user_id: number;
    display_name: string;
    email: string;
    password: string;
}

interface QUESTION_MODEL {
    question_id: number;
    question: string;
    additional_info: string;
    category: string;
    user_id: number;
}

interface DECODED_DATA {
    user_id: number;
    display_name: string;
    email: string;
}

interface INFO extends Request {
    info?: DECODED_DATA;
}