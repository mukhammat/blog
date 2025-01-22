import { Request,Response } from "express";
import asyncWrapper from "../../middlewares/async.middleware";
import prisma from "../../configs/prisma";

export const upload = asyncWrapper(async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send("Media upload error");
    }
    res.send(`Media uploaded successfully: ${req.file.filename}`);
});
