import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";
import { hashPassword } from "../../utils/password-hash";
import { jwtGenerate } from "../../utils/generate-jwt";

/**
 * Контроллер для регистрации пользователя
 * @route POST /auth/signup
 * @param {Request} req - Экземпляр запроса Express
 * @param {Response} res - Экземпляр ответа Express
 */
export const signUp = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    // Хеширование пароля
    const hashedPassword = await hashPassword(password);

    // Создание нового пользователя в базе данных
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    // Формирование payload для токена
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
    };

    // Генерация JWT токена
    const jwt = jwtGenerate(payload);

    // Возврат токена клиенту
    res.status(201).json({ token: jwt });
});