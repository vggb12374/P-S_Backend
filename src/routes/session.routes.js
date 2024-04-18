import Router from 'express';
const sessionRouter = new Router();
import { SessionValidMiddleware } from '../middleware/session-valid.middleware.js';
const sessionValidMiddleware = new SessionValidMiddleware();
import { SessionController } from '../controllers/session.controller.js';
const sessionController = new SessionController();

sessionRouter.post('/create', sessionValidMiddleware.createValidMiddleware, sessionController.createSession);
sessionRouter.post('/connect', sessionValidMiddleware.updateValidMiddleware, sessionController.addUserOnSession);

export { sessionRouter };