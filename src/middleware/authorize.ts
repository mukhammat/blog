import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
        const decode = jwt.verify(token,"secretKey");
        req.body.user = decode;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Нет доступа' });
    }
}