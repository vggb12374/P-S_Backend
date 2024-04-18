import { readFileSync } from "fs";
import { PNG } from "pngjs";
import { between } from "../handlers/random-numbers.js";
import { MapSquares } from "../constants/map-squares.constants.js";
import { Events } from "../constants/events.constants.js";
import { squareServiceFactory } from "./square.service.js";
import { writeErrorData } from "../handlers/logger.js";

class EventService {
    /**
     * Generate random events for map.
     * @param {string} mapSource - path to image
     * @param {string} sessionId - session identifier
     */
    async initializeSessionEvents(mapSource, sessionId) {
        try {
            const data = readFileSync("src/static" + mapSource);
            const png = PNG.sync.read(data);

            const width = png.width;
            const height = png.height;

            const squareService = squareServiceFactory();
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4;
                    const red = png.data[index];
                    const green = png.data[index + 1];
                    const blue = png.data[index + 2];
    
                    const hexColor = (1 << 24) + (red << 16) + (green << 8) + blue;
    
                    if (MapSquares.isForest(hexColor)) {
                        if (between(1, Events.FOREST_EVENTS_RATE) !== Events.FOREST_EVENTS_RATE) {
                            continue;
                        }
                        const forestEvents = Events.getForestEventsList();
                        const event = between(forestEvents.at(0), forestEvents.at(-1));
                        await squareService.createSquare(x, y, sessionId, event);
                    } else if (MapSquares.isBoatSpawnPoint(hexColor)) {
                        const event = !!between(0, 1) ? Events.BOAT : null;
                        await squareService.createSquare(x, y, sessionId, event);
                    } else if (MapSquares.isCaveSpawnPoint(hexColor)) {
                        const event = !!between(0, 1) ? Events.CAVE : null;
                        await squareService.createSquare(x, y, sessionId, event);
                    }
                }
            }
            return true;
        } catch (err) {
            writeErrorData(`EventService.initializeSessionEvents => ${err}`);
            throw new Error();
        }
    }
}

export function eventServiceFactory() {
    return new EventService();
}