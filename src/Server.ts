import * as http from 'http';
import { Knex } from 'knex';
import App from './App';
import { publicRoutes } from './Routes/PublicRoutes';
import { NextFunction, Request, Response } from 'express';
import RouteNotFoundException from './Api/Exception/RouteNotFoundException';
import errorMiddleware from './Api/Middleware/ErrorMiddleware';

const GRACEFUL_SHUTDOWN_TIME = 100 * 1000; // 100 seconds

export class Server {
    protected port: number;
    protected server: http.Server;

    constructor(private readonly application: App, private readonly knexInstance: Knex) {
        this.port = Server.normalizePort(Number(process.env.PORT || 3000));

        Server.validateEnvironment();
        this.registerRouter();

        this.server = http.createServer(this.application.app);

        this.server.keepAliveTimeout = 61 * 1000;
        this.server.headersTimeout = 62 * 1000;
        this.server.maxHeadersCount = 0;
    }

    public startServer(): void {
        this.server.listen(this.port);
        this.server.on('error', this.onError);
        this.server.on('listening', () => console.info(`Server listening port ${this.port}`));
        this.processSignal();
    }

    private static normalizePort(value: number): number {
        if (isNaN(value)) return value;
        if (value >= 0) return value;
        throw new Error('PORT is undefined');
    }

    private static validateEnvironment(): void {
        if (!process.env.NODE_ENV) {
            console.error(new Error('NODE_ENV is undefined'));
            process.exit(1);
        }

        if (process.env.NODE_ENV !== 'production') {
            Server.processError();
        }
    }

    private static processError(): void {
        process.on('uncaughtException', error => {
            console.error(error);
            process.exit(1);
        });
        process.on('unhandledRejection', error => {
            console.error(error);
            process.exit(1);
        });
    }

    private registerRouter(): void {
        this.application.app.use('/', publicRoutes);
        this.application.app.use((req: Request, res: Response, next: NextFunction) => {
            next(new RouteNotFoundException());
        });
        this.application.app.use(errorMiddleware);
        // TODO: add route not found exception and error middleware
    }

    private gracefulShutdown(signal: string): void {
        console.info(`Graceful shutdown application: ${signal} signal received.`);
        this.server.close(() => {
            setTimeout(async () => {
                await this.knexInstance.destroy();
                process.exit();
            }, GRACEFUL_SHUTDOWN_TIME);
        });
    }

    private processSignal(): void {
        if (process.env.NODE_ENV === 'production') {
            this.server.on('SIGTERM', () => this.gracefulShutdown('SIGTERM'));
        }
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        const bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port;
        switch (error.code) {
            case 'EACCES':
                console.error(new Error(`${bind} requires elevated privileges`));
                break;
            case 'EADDRINUSE':
                console.error(new Error(`${bind} is already in use`));
                break;
            default:
                throw error;
        }
        process.exit(1);
    }
}
