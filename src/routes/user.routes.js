import Router from 'express';
const router = new Router();
import { UserController } from '../controllers/user.controller.js';
const userController = new UserController();
import { authMiddleware } from '../middleware/auth.middleware.js';
import { ValidationMiddleware } from '../middleware/validation.middleware.js';
const validationMW = new ValidationMiddleware();

router.post('/register', validationMW.regLogValidationMW, userController.register);
router.post('/login', validationMW.regLogValidationMW, userController.login);
router.get('/user/:id', authMiddleware, userController.getUserById);
router.put('/user/:id', [authMiddleware, validationMW.updateValidationMW], userController.update);
router.delete('/user/:id', authMiddleware, userController.delete);

export { router };