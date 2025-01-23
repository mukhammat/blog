import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

/**
 * Middleware для авторизации пользователя с использованием JWT.
 * @param req - Экземпляр запроса Express
 * @param res - Экземпляр ответа Express
 * @param next - Функция перехода к следующему middleware
 */
export const authorize = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        
        const secretKey = process.env?.SECRET_KEY;
        if (!secretKey) {
            res.status(401).json({ message: 'No access' });
            return;
        }
        const decode = jwt.verify(token,secretKey);
        req.body.user = decode;
        next();
    } catch (error) {
        res.status(401).json({ message: 'No access' });
    }
}