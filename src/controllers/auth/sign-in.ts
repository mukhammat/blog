import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async";
import { hashPassword } from '../../helpers/hash.helper';
import { jwtGenerate } from '../../helpers/jwt.helper';

export const signIn = asyncWrapper(async (req: Request, res: Response)=>{
    const {email, password, name} = req.body;

    const hash = await hashPassword(password);

    //const jwt = jwtGenerate({id: admin.id,name: admin.name, email: admin.email});

    res.status(201).json({token: jwt});
});