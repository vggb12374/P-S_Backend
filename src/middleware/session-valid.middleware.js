import { sessionValidServiceFactory } from '../services/session-valid.service.js';
const sessionValidService = sessionValidServiceFactory();
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';

export class SessionValidMiddleware {
    createValidMiddleware(req, res, next) {
        const { mapId } = req.body;
        const { error } = sessionValidService.createValidation(mapId);
        if (error) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, error.message);
        }
        next();
    }

    updateValidMiddleware(req, res, next) {
        const { token } = req.body;
        const { error } = sessionValidService.updateValidation(token);
        if (error) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, error.message);
        }
        next();
    }
};