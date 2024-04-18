import { UserSchemas } from "../schemas/user.schemas.js";

const userSchemas = new UserSchemas();

class ValidationService {
    authValidation(login, password) {
        return userSchemas.authSchema.validate({ login: login, password: password });
    }
    
    updateValidation(login, password) {
        return userSchemas.updateSchema.validate({ login: login, password: password });
    }
};

export function validationServiceFactory() {
    return new ValidationService();
}