import Joi from "joi";

export class SessionSchemas {
    createSchema = Joi.object({
        mapId: Joi.string()
        .required()
    });
    
    updateSchema = Joi.object({
        token: Joi.string()
        .required()
    });
};