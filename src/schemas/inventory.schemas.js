import Joi from "joi";

export class InventorySchemas {
    createSchema = Joi.object({
        resourceId: Joi.string()
        .required()
    });
};