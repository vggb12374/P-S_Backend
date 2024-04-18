import { InventorySchemas } from "../schemas/inventory.schemas.js";

const inventorySchemas = new InventorySchemas();

class InventoryValidService {
    createValidation(resourceId) {
        return inventorySchemas.createSchema.validate({ resourceId: resourceId });
    }
};

export function inventoryValidServiceFactory() {
    return new InventoryValidService();
}