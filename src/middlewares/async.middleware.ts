import { Request, Response, NextFunction } from "express";

/**
 * Обёртка для обработки асинхронных функций.
 * Обеспечивает централизованную обработку ошибок.
 * @param fn Асинхронная функция Express (контроллер)
 * @returns Express middleware с обработкой ошибок
 */

const asyncWrapper = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.error("Unhandled error in async function:", error);
            next(error);
        }
    };
};

export default asyncWrapper;
