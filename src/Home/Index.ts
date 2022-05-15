import IsAliveController from './Actions/IsAliveController';
import IsAliveService from './Services/IsAliveService';

const isAliveService = new IsAliveService();

export const isAliveController = new IsAliveController(isAliveService);
