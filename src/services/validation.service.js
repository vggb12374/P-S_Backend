import { UserSchemas } from "../schemas/user.schemas.js";
const userSchemas = new UserSchemas();

export class ValidationService {
    regLogValidation(login, password) {
        return userSchemas.regLogSchema.validate({ login: login, password: password });
    }
    
    updateValidation(login, password) {
        return userSchemas.updateSchema.validate({ login: login, password: password });
    }
};