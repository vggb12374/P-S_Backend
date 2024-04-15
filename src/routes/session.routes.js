import Router from 'express';
const sessionRouter = new Router();
import { SessionValidMiddleware } from '../middleware/session-valid.middleware.js';
const sessionValidMiddleware = new SessionValidMiddleware();
import { SessionController } from '../controllers/session.controller.js';
const sessionController = new SessionController();

sessionRouter.post('/sessions/create', sessionValidMiddleware.createValidMiddleware, sessionController.createSession);
sessionRouter.post('/sessions/connect', sessionValidMiddleware.updateValidMiddleware, sessionController.addUserOnSession);

export { sessionRouter };