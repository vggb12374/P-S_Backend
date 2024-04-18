import { logger } from '../handlers/logger.js';
import { sessionServiceFactory } from "../services/session.service.js";
const sessionService = sessionServiceFactory();
import { inventoryServiceFactory } from "../services/inventory.service.js";
const inventoryService = inventoryServiceFactory();
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';

export class InventoryController {
    constructor() {
        this.addResToInventory = logger(this.addResToInventory.bind(this));
        this.getUserInventory = logger(this.getUserInventory.bind(this));
    }

    async addResToInventory(req, res) {
        try {
            const { resourceId } = req.body;
            const userId = req.user.id;
            const sessionId = req.session.id;
            const userSession = await sessionService.checkUserSession(userId, sessionId);
            const inventory = await inventoryService.addResToInventory(resourceId, userSession.id);
            return sendResponse(res, StatusCodes.OK, "Resource added to inventory", inventory);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    async getUserInventory(req, res) {
        try {
            const userId = req.user.id;
            const sessionId = req.session.id;
            const userSession = await sessionService.checkUserSession(userId, sessionId);
            const userInventory = await inventoryService.getUserInventory(userSession.id);
            return sendResponse(res, StatusCodes.OK, "Get user inventory successfully", userInventory);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
};