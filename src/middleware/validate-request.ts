import { validationResult } from "express-validator";
import * as validations from "../validations";
import { Request, Response,NextFunction } from "express";

type ValidationCategories = keyof typeof validations;

export const validate = (validationCategory: ValidationCategories) => {
    const validationRules = validations[validationCategory];

    if (!validationRules) {
        throw new Error(
            `Validation rules for "${validationCategory}" not defined.`
        );
    }

    return (validationRuleName: string) => {
        const rules = validationRules[validationRuleName as keyof typeof validationRules];

        if (!rules) {
            throw new Error(
                `Validation rules for "${validationRuleName}" not found in "${validationCategory}".`
            );
        }

        if (!Array.isArray(rules)) {
            throw new Error(
                `Validation rules for "${validationRuleName}" should be an array of ValidationChain.`
            );
        }

        return [
            ...rules,
            (req:Request, res:Response, next:NextFunction) => {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        success: false,
                        errors: errors.array(),
                    });
                }

                next();
            },
        ];
    };
};
