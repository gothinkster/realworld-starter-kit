import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

export default class App {
    constructor() {
        this.app = express();
        this.applyMiddlewares();
    }

    public app: express.Application;

    private applyMiddlewares(): void {
        this.app.use(express.json({ limit: '20mb' }));
        this.app.use(express.urlencoded({ limit: '20mb', extended: true }));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }
}
