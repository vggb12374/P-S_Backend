import Router from 'express';
const inventoryRouter = new Router();
import { InventoryValidMiddleware } from '../middleware/inventory-valid.middleware.js';
const inventoryValidMiddleware = new InventoryValidMiddleware();
import { InventoryController } from '../controllers/inventory.controller.js';
const inventoryController = new InventoryController();

inventoryRouter.post('/inventories', inventoryValidMiddleware.createValidMiddleware, inventoryController.addResToInventory);
inventoryRouter.get('/inventories', inventoryController.getUserInventory);

export { inventoryRouter };