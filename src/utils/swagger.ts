import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import swaggerDocument from '../openapi.json';
export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
