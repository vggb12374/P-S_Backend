import { squareValidServiceFactory } from "../services/square-valid.service.js";
const squareValidService = squareValidServiceFactory();
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';

export class SquareValidMiddleware {
    createValidMiddleware(req, res, next) {
        const { x, y, isCurrentPosition } = req.body;
        const { error } = squareValidService.createValidation(x, y, isCurrentPosition);
        if (error) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, error.message);
        }
        next();
    }
};