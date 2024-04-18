import Joi from "joi";

export class SquareSchemas {
    createSchema = Joi.object({
        x: Joi.number()
        .required(),

        y: Joi.number()
        .required(),

        isCurrentPosition: Joi.boolean()
        .required()
    });
};