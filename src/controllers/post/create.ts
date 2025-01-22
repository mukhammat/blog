import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";

export const create = asyncWrapper(async (req: Request, res: Response) => {
    const {message} = req.body;

    const userId = req.body?.user.id;
    if(!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    await prisma.post.create({
        data: {
            message,
            userId
        }
    });

    res.status(201).json({message: "Post created"});
});