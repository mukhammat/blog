import { Request, Response } from "express";
import prisma from "../../config/prisma";
import asyncWrapper from "../../middleware/async";

export const getAll = asyncWrapper(async (req:Request, res:Response)=> {
    const posts = await prisma.post.findMany();
    res.status(200).json({posts})
});