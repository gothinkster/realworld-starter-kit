import express, { NextFunction, Request, Response } from 'express';
import { isAliveController } from '../Home/Index';

const publicRoutes = express.Router();

publicRoutes.get('/', (request: Request, response: Response, nextFunction: NextFunction) => {
    return isAliveController.handle(request, response, nextFunction);
});

export { publicRoutes };
