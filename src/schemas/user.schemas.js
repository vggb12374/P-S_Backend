import Joi from "joi";

export class UserSchemas {
    regLogSchema = Joi.object({
        login: Joi.string()
        .alphanum()
        .min(4)
        .max(30)
        .required(),
    
        password: Joi.string()
        .min(4)
        .max(30)
        .required()
    });
    
    updateSchema = Joi.object({
        login: Joi.string()
        .alphanum()
        .min(4)
        .max(30),
    
        password: Joi.string()
        .min(4)
        .max(30)
    }).or('login', 'password');
};