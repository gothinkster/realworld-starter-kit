import 'dotenv/config';
import 'reflect-metadata';
import App from './App';
import Server from './Server';

async function startServer() {
    const server = new Server(new App());
    await server.start();
}

startServer().then();
