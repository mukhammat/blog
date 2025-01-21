import { body, param } from "express-validator"

export const postValidation = {
    create: [
        body("message")
            .optional()
            .isLength({max: 200})
            .withMessage("Максимум 200 символов"),
        body("userId")
            .exists()
            .notEmpty()
            .withMessage("Id не может быть пустым!")
            .isInt()
            .withMessage("Id должен цифрами")
    ], 
    destroy: [
        param("id")
        .exists()
        .notEmpty()
        .withMessage("Id не может быть пустым!")
        .isInt()
        .withMessage("Id должен цифрами")
    ]
};
