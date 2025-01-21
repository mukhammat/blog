import { Request, Response } from "express";
import prisma from "../../config/prisma";
import asyncWrapper from "../../middleware/async";

export const destroy = asyncWrapper(async (req: Request, res: Response) => {
    const {id} = req.params;

    await prisma.post.delete({
        where: { id: Number(id) }
    });

    res.status(200).json({message: "Post deleted"})
});