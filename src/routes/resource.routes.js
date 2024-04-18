import Router from 'express';
const resourceRouter = new Router();
import { ResourceController } from '../controllers/resource.controller.js';
const resourceController = new ResourceController();

resourceRouter.get('/resources', resourceController.getResources);

export { resourceRouter };