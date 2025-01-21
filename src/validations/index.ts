import { authValidation } from "./auth.validation";
import { postValidation } from "./post.validation";

export const validations = {
    authValidation,
    postValidation,
};

// Тип для объекта validations
export type ValidationCategories = keyof typeof validations;
