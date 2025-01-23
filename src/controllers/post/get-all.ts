import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";

/**
 * Контроллер получения всех постов
 * @route GET /post/get-all
 * @param {Request} req - Экземпляр запроса Express
 * @param {Response} res - Экземпляр ответа Express
 */
export const getAll = asyncWrapper(async (req:Request, res:Response)=> {
    const posts = await prisma.post.findMany();
    res.status(200).json({posts})
});