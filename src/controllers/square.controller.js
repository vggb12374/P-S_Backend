import { logger } from '../handlers/logger.js';
import { sessionServiceFactory } from "../services/session.service.js";
import { squareServiceFactory } from "../services/square.service.js";
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';

const sessionService = sessionServiceFactory();
const squareService = squareServiceFactory();

export class SquareController {
    constructor() {
        this.createAvailableSquare = logger(this.createAvailableSquare.bind(this));
        this.getAvailableSquares = logger(this.getAvailableSquares.bind(this));
    }

    async createAvailableSquare(req, res) {
        try {
            const { x, y, isCurrentPosition } = req.body;
            
            const square = await squareService.checkSquare(x, y, req.session.id);
            const userSession = await sessionService.checkUserSession(req.user.id, req.session.id);
            let availableSquare = await squareService.createAvailableSquare(square.id, userSession.id, isCurrentPosition);
            availableSquare.Squares = square;
            return sendResponse(res, StatusCodes.OK, null, availableSquare);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    async getAvailableSquares(req, res) {
        try {
            const userSession = await sessionService.checkUserSession(req.user.id, req.session.id);
            const availableSquares = await squareService.getAvailableSquares(userSession.id);
            return sendResponse(res, StatusCodes.OK, "Get available squares successfully", availableSquares);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
};