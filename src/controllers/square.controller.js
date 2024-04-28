import { logger } from '../handlers/logger.js';
import { sessionServiceFactory } from "../services/session.service.js";
import { squareServiceFactory } from "../services/square.service.js";
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';
import { io } from '../index.js'

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
            const userSessionId = userSession.id;

            if (isCurrentPosition) {
                await squareService.resetAllCurrentPosition(userSession.id);
            }

            const availableSquare = await squareService.createAvailableSquare(square.id, userSession.id, isCurrentPosition);
            availableSquare.square = square;

            if (isCurrentPosition) {
                io.emit('USER_POSITION_MESSAGE', { x, y, userSessionId });
            }

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

    async getUserPositions(req, res) {
        try {
            const userPositions = await squareService.getUserPositions();
            return sendResponse(res, StatusCodes.OK, "Get user positions successfully", userPositions);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
};