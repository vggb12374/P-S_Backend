import Router from 'express';
const squareRouter = new Router();
import { SquareValidMiddleware } from '../middleware/square-valid.middleware.js';
const squareValidMiddleware = new SquareValidMiddleware();
import { SquareController } from '../controllers/square.controller.js';
const squareController = new SquareController();

squareRouter.post('/squares', squareValidMiddleware.createValidMiddleware, squareController.createAvailableSquare);
squareRouter.get('/squares', squareController.getAvailableSquares);

export { squareRouter };