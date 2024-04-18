import { mapServiceFactory } from '../services/map.service.js';
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../handlers/logger.js';

const mapService = mapServiceFactory();

export class MapController {
    constructor() {
        this.createMap = logger(this.createMap.bind(this));
        this.getMaps = logger(this.getMaps.bind(this));
    }

    async createMap(req, res) {
        const { source } = req.body;

        await mapService.createMap(source);
        return sendResponse(res, StatusCodes.OK, "Map created");
    }

    async getMaps(req, res) {
        const maps = await mapService.getMaps();
        return sendResponse(res, StatusCodes.OK, "Get maps successfull", maps);
    }
};