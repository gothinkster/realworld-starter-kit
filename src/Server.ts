import { NextFunction, Request, Response } from 'express';
import RouteNoteFoundException from './Api/Exceptions/RouteNotFoundException';
import ErrorMiddleware from './Api/Middlewares/ErrorMiddleware';
import { PrivateRoutes } from './Routes/PrivateRoutes';
import { PublicRoutes } from './Routes/PublicRoutes';

export default class Server {
    constructor(private readonly application) {
        this.port = this.normalizePort();
        this.applyRoutes();
    }

    private port: number;

    public async start() {
        this.application.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }

    private normalizePort(): number {
        return Number(process.env.PORT) || 3000;
    }

    private applyRoutes(): void {
        this.application.app.use(PublicRoutes);
        this.application.app.use(PrivateRoutes);
        this.application.app.use((req: Request, res: Response, next: NextFunction) => {
            next(new RouteNoteFoundException());
        });
        this.application.app.use(ErrorMiddleware);
    }
}
