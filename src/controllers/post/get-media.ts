import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";
import path from "path";
import fs from "fs";

/**
 * Контроллер для получения медиа-файла пользователя
 * @route GET /post/get-media/:media_path
 * @param {Request} req - Экземпляр запроса Express
 * @param {Response} res - Экземпляр ответа Express
 */
export const getMedia = asyncWrapper(async (req: Request, res: Response) => {
    const { media_path } = req.params;

    // Проверка наличия и корректности media_path
    if (typeof media_path !== "string" || !media_path) {
        return res.status(400).json({ message: 'Invalid media path' });
    }

    // Получаем userId из из токена пользователя
    const userId = req.body.user?.id;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    // Проверяем существование пользователя с указанным userId
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Ищем все посты пользователя
    const posts = await prisma.post.findMany({
        where: {
            userId: user.id,
        },
    });

    // Проверяем, связан ли media_path с каким-либо постом
    const post = posts.find((post) => post.media === media_path);

    if (!post) {
        return res.status(404).json({ message: "Media not found" });
    }

    // Определяем полный путь до медиа-файла
    const mediaFullPath = path.join(process.cwd(), "uploads", media_path);

    // Проверяем существование файла на диске
    if (!fs.existsSync(mediaFullPath)) {
        return res.status(404).json({ message: "File not found on server" });
    }

    // Отправляем файл клиенту
    return res.sendFile(mediaFullPath);
});
