import { inventoryValidServiceFactory } from "../services/inventory-valid.service.js";
const inventoryValidService = inventoryValidServiceFactory();
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';

export class InventoryValidMiddleware {
    createValidMiddleware(req, res, next) {
        const { resourceId } = req.body;
        const { error } = inventoryValidService.createValidation(resourceId);
        if (error) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, error.message);
        }
        next();
    }
};