import Router from 'express';
import { SessionValidMiddleware } from '../middleware/session-valid.middleware.js';
import { SessionController } from '../controllers/session.controller.js';

const sessionRouter = new Router();
const sessionValidMiddleware = new SessionValidMiddleware();
const sessionController = new SessionController();

sessionRouter.post('/create', sessionValidMiddleware.createValidMiddleware, sessionController.createSession);
sessionRouter.post('/connect', sessionValidMiddleware.updateValidMiddleware, sessionController.addUserOnSession);

export { sessionRouter };