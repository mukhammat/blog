import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";

/**
 * Контроллер для удаления поста
 * @route DELETE /post/delete/:id
 * @param {Request} req - Экземпляр запроса Express
 * @param {Response} res - Экземпляр ответа Express
 */
export const destroy = asyncWrapper(async (req: Request, res: Response) => {
    const {id} = req.params;

    // Проверка наличия и корректности id
    if (!id) {
        return res.status(400).json({ message: 'Invalid ID.' });
    }
    
    // Получаем userId из из токена пользователя
    const userId = req.body?.user.id;
    if(!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    // Поиск посто по id
    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
    });

    if (!post) {
        return res.status(404).json({ message: "Post not found." });
    }

    // Проверка, принадлежит ли пост текущему пользователю
    if (post.userId !== userId) {
        return res.status(403).json({ message: "You can only delete your own posts." });
    }

    await prisma.post.delete({
        where: { id: Number(id) },
    });

    res.status(200).json({ message: "Post deleted successfully." });
});