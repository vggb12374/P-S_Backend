import Router from 'express';
const userRouter = new Router();
import { UserController } from '../controllers/user.controller.js';
const userController = new UserController();
import { ValidationMiddleware } from '../middleware/validation.middleware.js';
const validationMiddleware = new ValidationMiddleware();

userRouter.get('/user/:id', userController.getUserInfo);
userRouter.put('/user/:id', validationMiddleware.updateValidMiddleware, userController.update);
userRouter.delete('/user/:id', userController.delete);

export { userRouter };