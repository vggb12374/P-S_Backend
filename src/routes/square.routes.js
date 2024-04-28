import Router from 'express';
import { SquareValidMiddleware } from '../middleware/square-valid.middleware.js';
import { SquareController } from '../controllers/square.controller.js';

const squareRouter = new Router();
const squareValidMiddleware = new SquareValidMiddleware();
const squareController = new SquareController();

squareRouter.post('/squares', squareValidMiddleware.createValidMiddleware, squareController.createAvailableSquare);
squareRouter.get('/squares', squareController.getAvailableSquares);
squareRouter.get('/squares/positions', squareController.getUserPositions);

export { squareRouter };