import Router from 'express';
import { MapController } from '../controllers/map.controller.js';

const mapRouter = new Router();
const mapController = new MapController();

mapRouter.post('/maps', mapController.createMap);
mapRouter.get('/maps', mapController.getMaps);

export { mapRouter };