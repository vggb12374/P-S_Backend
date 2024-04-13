import Router from 'express';
const sessionRouter = new Router();
import { SessionController } from '../controllers/session.controller.js';
const sessionController = new SessionController();

sessionRouter.post('/sessions/create', sessionController.createSession);
sessionRouter.post('/sessions/connect', sessionController.addUserOnSession);

export { sessionRouter };