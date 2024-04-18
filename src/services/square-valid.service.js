import { SquareSchemas } from "../schemas/square.schemas.js";
const squareSchemas = new SquareSchemas();

class SquareValidService {
    createValidation(x, y, isCurrentPosition) {
        return squareSchemas.createSchema.validate({ x: x, y: y, isCurrentPosition: isCurrentPosition });
    }
};

export function squareValidServiceFactory() {
    return new SquareValidService();
}