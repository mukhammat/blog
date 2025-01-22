import { Request,Response } from "express";
import asyncWrapper from "../../middlewares/async.middleware";
import prisma from "../../configs/prisma";

export const upload = asyncWrapper(async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send("Media upload error");
    }

    const postId = req.body?.postId;
    if (typeof postId !== 'number' || !postId) {
        return res.status(400).json({ error: 'Invalid ID. It must be a string with a length between 1 and 255 characters.' });
    }

    const userId = req.body?.user.id;
    if(!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    await prisma.post.update({
        data: {
            media: req.file?.filename
        },
        where: {
            id: postId,
            userId
        }
    })

    res.send(`Media uploaded successfully: ${req.file.filename}`);
});
