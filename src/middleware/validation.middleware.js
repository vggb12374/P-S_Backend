import { ValidationService } from "../services/validation.service.js";
const validationService = new ValidationService();

export class ValidationMiddleware {
    regLogValidationMW(req, res, next) {
        const { login, password } = req.body;
        const { error } = validationService.regLogValidation(login, password);
        if (error) {
            return res.status(403).json(error.message);
        }
        next();
    }

    updateValidationMW(req, res, next) {
        const { login, password } = req.body;
        const { error } = validationService.updateValidation(login, password);
        if (error) {
            return res.status(403).json(error.message);
        }
        next();
    }
};