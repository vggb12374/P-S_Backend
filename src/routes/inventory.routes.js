import Router from 'express';
import { InventoryValidMiddleware } from '../middleware/inventory-valid.middleware.js';
import { InventoryController } from '../controllers/inventory.controller.js';

const inventoryRouter = new Router();
const inventoryValidMiddleware = new InventoryValidMiddleware();
const inventoryController = new InventoryController();

inventoryRouter.post('/inventories', inventoryValidMiddleware.createValidMiddleware, inventoryController.addResToInventory);
inventoryRouter.get('/inventories', inventoryController.getUserInventory);

export { inventoryRouter };