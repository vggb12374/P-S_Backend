import Router from 'express';
import { UserController } from '../controllers/user.controller.js';
import { ValidationMiddleware } from '../middleware/validation.middleware.js';

const userRouter = new Router();
const userController = new UserController();
const validationMiddleware = new ValidationMiddleware();

userRouter.get('/user/:id', userController.getUserInfo);
userRouter.put('/user/:id', validationMiddleware.updateValidMiddleware, userController.update);
userRouter.delete('/user/:id', userController.delete);

export { userRouter };