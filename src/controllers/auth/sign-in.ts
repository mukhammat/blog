import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";
import { comparePassword } from "../../utils/password-hash";
import { jwtGenerate } from "../../utils/generate-jwt";

/**
 * Контроллер для входа пользователя
 * @route POST /auth/signin
 * @param {Request} req - Экземпляр запроса Express
 * @param {Response} res - Экземпляр ответа Express
 */
export const signIn = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Проверяем наличие пользователя с указанным email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(400).json({ message: "User not found." });
    }

    // Сравниваем пароль пользователя
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password." });
    }

    // Генерируем JWT токен
    const jwt = jwtGenerate({
        id: user.id,
        email: user.email,
        name: user.name,
    });

    // Возвращаем токен клиенту
    return res.status(200).json({ token: jwt });
});
