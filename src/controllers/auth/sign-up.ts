import { Request, Response } from "express";
import prisma from "../../config/prisma";
import asyncWrapper from "../../middleware/async";
import { hashPassword } from '../../helpers/hash.helper';
import { jwtGenerate } from '../../helpers/jwt.helper';

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