import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";

export const destroy = asyncWrapper(async (req: Request, res: Response) => {
    const {id} = req.params;
    if (typeof id !== 'string' || id.length < 1 || id.length > 255) {
        return res.status(400).json({ error: 'Invalid ID. It must be a string with a length between 1 and 255 characters.' });
    }

    const userId = req.body?.user.id;

    if(!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    
    const post = await prisma.post.delete({
        where: { id: Number(id) }
    });

    if(post.userId !== user?.id) {
        return res.status(401).json({message: "You only can delete your posts"})
    }

    res.status(200).json({message: "Post deleted"})
});