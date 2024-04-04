import Router from 'express';
const authRouter = new Router();
import { UserController } from '../controllers/user.controller.js';
const userController = new UserController();
import { ValidationMiddleware } from '../middleware/validation.middleware.js';
const validationMiddleware = new ValidationMiddleware();

authRouter.post('/register', validationMiddleware.authValidMiddleware, userController.register);
authRouter.post('/login', validationMiddleware.authValidMiddleware, userController.login);

export { authRouter };