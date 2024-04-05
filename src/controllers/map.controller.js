import { mapServiceFactory } from '../services/map.service.js';
const mapService = mapServiceFactory();
import { sendResponse } from '../handlers/response.js';
import { StatusCodes } from 'http-status-codes';

export class MapController {
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