import { body } from "express-validator"

export const authValidation = {
    signUp: [
        body("email")
            .exists()
            .trim()
            .toLowerCase()
            .withMessage("Email обязателен!")
            .isEmail()
            .withMessage("Некорректный адрес электронной почты!"),
        body("password")
            .exists()
            .withMessage("Пароль обязателен!")
            .isString()
            .withMessage("Пароль должен быть строкой!")
            .isStrongPassword()
            .withMessage(
                "Пароль должен содержать не менее 8 символов, включать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ"
            )
            .isLength({ min: 8 })
            .withMessage("Пароль должен быть не менее 8 символов!"),
        body("name")
            .exists()
            .withMessage("Имя обязательно!")
            .isString()
            .withMessage("Имя должно быть строкой!")
            .isLength({ min: 2 })
            .withMessage("Имя должно быть не менее 2 символов!"),
    ],
    signIn: [
        body("email")
            .exists()
            .trim()
            .toLowerCase()
            .withMessage("Email обязателен!")
            .isEmail()
            .withMessage("Некорректный адрес электронной почты!"),
        body("password")
            .exists()
            .withMessage("Пароль обязателен!")
            .isString()
            .withMessage("Пароль должен быть строкой!")
            .notEmpty()
            .withMessage("Пароль не может быть пустым!"),
    ],
};
