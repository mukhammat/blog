import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";

/**
 * Контроллер для создания нового поста
 * @route POST /post/create
 * @param {Request} req - Экземпляр запроса Express
 * @param {Response} res - Экземпляр ответа Express
 */
export const create = asyncWrapper(async (req: Request, res: Response) => {
    const { message } = req.body;

    // Получаем userId из из токена пользователя
    const userId = req.body?.user.id;
    if(!userId) {
        res.status(400).json({ message: "User ID is required" });
    }

    // Создание нового поста в базе данных
    await prisma.post.create({
        data: {
            message,
            userId,
        },
    });

    // Возврат успешного ответа
    res.status(201).json({ message: "Post created successfully." });
});