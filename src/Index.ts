import 'dotenv/config';
import { Server } from './Server';
import App from './App';
import { KnexInstance } from './Database/knex';

async function start() {
    await testDatabase();
    const server = new Server(new App(), KnexInstance);
    server.startServer();
}

async function testDatabase() {
    try {
        await KnexInstance.raw('SELECT now()');
    } catch (error) {
        throw new Error(`Database connection not set up properly: ${error}`);
    }
}

start().then();
