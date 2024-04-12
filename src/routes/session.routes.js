import Router from 'express';
const sessionRouter = new Router();
import { SessionController } from '../controllers/session.controller.js';
const sessionController = new SessionController();

sessionRouter.post('/sessions', sessionController.createSession);
sessionRouter.patch('/sessions', sessionController.addUserOnSession);

export { sessionRouter };