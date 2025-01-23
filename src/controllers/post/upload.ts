import { Request, Response } from "express";
import asyncWrapper from "../../middlewares/async.middleware";
import prisma from "../../configs/prisma";

/**
 * Контроллер для загрузки медиа-файлов
 * @route POST /post/upload
 * @param {Request} req - Экземпляр запроса Express
 * @param {Response} res - Экземпляр ответа Express
 */
export const upload = asyncWrapper(async (req: Request, res: Response) => {
    // Проверяем наличие файла в запросе
    if (!req.file) {
        return res.status(400).json({ message: "Media upload error. No file provided." });
    }

    // Получаем ID поста из тела запроса и проверяем его валидность
    const postId = parseInt(req.body?.postId, 10);
    if (!postId || isNaN(postId)) {
        return res.status(400).json({ error: "Invalid post ID. It must be a valid number." });
    }

    // Получаем ID пользователя из тела запроса
    const userId = req.body?.user?.id;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    // Проверяем существование поста для указанного пользователя
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
            userId,
        },
    });

    if (!post) {
        return res.status(404).json({ error: "Post not found or does not belong to the user." });
    }

    // Обновляем пост, добавляя ссылку на загруженный файл
    await prisma.post.update({
        data: {
            media: req.file.filename,
        },
        where: {
            id: postId,
        },
    });

    // Возвращаем успешный ответ с информацией о загруженном файле
    return res.status(200).json({ message: "Media uploaded successfully.", filename: req.file.filename });
});