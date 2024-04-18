import Router from 'express';
import { UserController } from '../controllers/user.controller.js';
import { ValidationMiddleware } from '../middleware/validation.middleware.js';

const authRouter = new Router();
const userController = new UserController();
const validationMiddleware = new ValidationMiddleware();

authRouter.post('/register', validationMiddleware.authValidMiddleware, userController.register);
authRouter.post('/login', validationMiddleware.authValidMiddleware, userController.login);

export { authRouter };