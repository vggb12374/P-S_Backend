import { logger } from '../handlers/logger.js';
import { resourceServiceFactory } from "../services/resource.service.js";
import { sendResponse } from "../handlers/response.js";
import { StatusCodes } from "http-status-codes";

const resourceService = resourceServiceFactory();

export class ResourceController {
    constructor() {
        this.getResources = logger(this.getResources.bind(this));
    }

    async getResources(req, res) {
        try {
            const resources = await resourceService.getResources();
            return sendResponse(res, StatusCodes.OK, "Get resources successfully", resources);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};