import Router from 'express';
const mapRouter = new Router();
import { MapController } from '../controllers/map.controller.js';
const mapController = new MapController();

mapRouter.post('/maps', mapController.createMap);
mapRouter.get('/maps', mapController.getMaps);

export { mapRouter };