import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";
import path from "path";

export const getMedia = asyncWrapper(async (req:Request, res:Response)=> {
    const {media_path} = req.params;
    if(typeof media_path !== "string" || !media_path) {
        return res.status(400).json({ error: 'Invalid media path' });
    }

    const userId = req.body?.user.id;
    if(!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const posts = await prisma.post.findMany({
        where: {
            userId: user.id,
        },
    });

    const post = posts.find((value) => value.media === media_path);
    if (!post || !post.media) {
        return res.status(404).json({ message: "Media not found" });
    }
    res.sendFile(post?.media, { root: path.join("../../../uploads/") });
});