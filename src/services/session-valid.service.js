import { SessionSchemas } from "../schemas/session.schemas.js";

const sessionSchemas = new SessionSchemas();

class SessionValidService {
    createValidation(mapId) {
        return sessionSchemas.createSchema.validate({ mapId: mapId });
    }
    
    updateValidation(token) {
        return sessionSchemas.updateSchema.validate({ token: token });
    }
};

export function sessionValidServiceFactory() {
    return new SessionValidService();
}