import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";

export const getAll = asyncWrapper(async (req:Request, res:Response)=> {
    const posts = await prisma.post.findMany();
    res.status(200).json({posts})
});