import { Request, Response } from "express";
import prisma from "../../config/prisma";
import asyncWrapper from "../../middleware/async";

export const create = asyncWrapper(async (req: Request, res: Response) => {
    const {message, userId} = req.body;

    await prisma.post.create({
        data: {
            message,
            userId
        }
    });

    res.status(201).json({message: "Post created"});
});