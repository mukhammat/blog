import { Request, Response } from "express";
import prisma from "../../configs/prisma";
import asyncWrapper from "../../middlewares/async.middleware";
import { hashPassword } from '../../utils/password-hash';
import { jwtGenerate } from '../../utils/generate-jwt';

export const signUp = asyncWrapper(async (req: Request, res: Response)=>{
    const {email, password, name} = req.body;
    const hash = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            email,
            password: hash,
            name
        }
    });
    const payload = {id: user.id, email: user.email, name: user.name};

    const jwt = jwtGenerate(payload);
    res.status(201).json({token: jwt});
});