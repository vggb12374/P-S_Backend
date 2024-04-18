import Router from 'express';
import { ResourceController } from '../controllers/resource.controller.js';

const resourceRouter = new Router();
const resourceController = new ResourceController();

resourceRouter.get('/resources', resourceController.getResources);

export { resourceRouter };