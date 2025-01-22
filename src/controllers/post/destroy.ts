import { Request, Response } from "express";
import prisma from "../../config/prisma";
import asyncWrapper from "../../middleware/async";

export const destroy = asyncWrapper(async (req: Request, res: Response) => {
    const {id} = req.params;

    if (typeof id !== 'string' || id.length < 1 || id.length > 255) {
        return res.status(400).json({ error: 'Invalid ID. It must be a string with a length between 1 and 255 characters.' });
    }
    
    
    await prisma.post.delete({
        where: { id: Number(id) }
    });

    res.status(200).json({message: "Post deleted"})
});