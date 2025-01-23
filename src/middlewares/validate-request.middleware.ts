import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import asyncWrapper from "./async.middleware";

/**
 * Middleware для валидации запросов с использованием DTO классов.
 * Преобразует тело запроса в экземпляр указанного класса и выполняет валидацию.
 * Если валидация не проходит, возвращает ответ с ошибками.
 *
 * @param dtoClass - Класс DTO для валидации данных запроса
 * @returns Middleware функцию для использования в Express
 *
 * @example
 * app.post('/users', validateRequest(CreateUserDto), (req, res) => {
 *   res.send('User created successfully');
 * });
 */
export const validateRequest = (dtoClass: any) => {
  return asyncWrapper(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Преобразуем тело запроса в экземпляр DTO
    const dtoInstance = plainToInstance(dtoClass, req.body);

    // Выполняем валидацию
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      // Форматируем ошибки
      const errorMessages = errors.map(err => ({
        property: err.property,
        constraints: err.constraints,
      }));

      res.status(400).json({ errors: errorMessages });
      return;
    }

    next();
  });
};
