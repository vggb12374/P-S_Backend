import { validationServiceFactory } from "../services/validation.service.js";
const validationService = validationServiceFactory();
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';

export class ValidationMiddleware {
    authValidMiddleware(req, res, next) {
        const { login, password } = req.body;
        const { error } = validationService.authValidation(login, password);
        if (error) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, error.message);
        }
        next();
    }

    updateValidMiddleware(req, res, next) {
        const { login, password } = req.body;
        const { error } = validationService.updateValidation(login, password);
        if (error) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, error.message);
        }
        next();
    }
};