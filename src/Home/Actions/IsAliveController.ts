import { NextFunction, Request, Response } from 'express';
import IsAliveService from '../Services/IsAliveService';

export default class IsAliveController {
    constructor(private service: IsAliveService) {}

    public async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const dto = await this.service.handle();
            return res.status(200).send(dto);
        } catch (error) {
            next(error);
        }
    }
}
