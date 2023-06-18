interface USER_MODEL {
    id: number;
    display_name: string;
    email: string;
    password: string;
}

interface QUESTION_MODEL {
    id: number;
    question: string;
    additional_info: string;
    category: string;
}