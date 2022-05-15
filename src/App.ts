import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

export default class App {
    constructor() {
        this.app = express();
        this.applyMiddleware();
    }

    public app: express.Application;

    private applyMiddleware(): void {
        this.app.use(express.json({ limit: '200mb' }));
        this.app.use(express.urlencoded({ limit: '200mb', extended: true }));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }
}
