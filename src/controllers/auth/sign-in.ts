import { Request, Response } from "express";
import prisma from "../../config/prisma";
import asyncWrapper from "../../middleware/async";
import { comparePassword } from '../../helpers/hash.helper';
import { jwtGenerate } from '../../helpers/jwt.helper';

export const signIn = asyncWrapper(async (req: Request, res: Response)=>{
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    
    if(!user){
        res.status(400).json({message: "User not found"});
        return;
    }
    if(!comparePassword(password, user.password)){
        res.status(400).json({message: "Invalid password"});
        return;
    }

    const jwt = jwtGenerate({
        id: user.id,
        email: user.email,
        name: user.name
    });

    res.status(201).json({token: jwt});
});