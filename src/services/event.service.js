import { between } from "../handlers/random-numbers";
import { MapSquares } from "../constants/map-squares.constants";
import { Events } from "../constants/events.constants";

class EventService {
    /**
     * Generate random events for map.
     * @param {string} mapSource - path to image
     * @param {number} mapSize - width/height (pixels)
     * @param {string} sessionId - session identifier
     */
    initializeSessionEvents(mapSource, mapSize, sessionId) {
        const imageData = fs.readFileSync(mapSource);

        for (let y = 0; y < mapSize; y++) {
            for (let x = 0; x < mapSize; x++) {
                const index = (y * canvas.width + x) * 4;
                const red = imageData[index];
                const green = imageData[index + 1];
                const blue = imageData[index + 2];

                const hexColor = (1 << 24) + (red << 16) + (green << 8) + blue;

                if (MapSquares.isForest(hexColor)) {
                    const forestEvents = Events.getForestEventsList();
                    const event = between(forestEvents.at(0), forestEvents.at(-1));
                    const data = {
                        sessionId, event, x, y
                    };
                } else if (MapSquares.isBoatSpawnPoint(hexColor)) {
                    const event = !!between(0, 1) ? Events.BOAT : null;
                    const data = {
                        sessionId, event, x, y
                    };
                } else if (MapSquares.isCaveSpawnPoint(hexColor)) {
                    const event = !!between(0, 1) ? Events.CAVE : null;
                    const data = {
                        sessionId, event, x, y
                    };
                }
            }
        }
    }
}

export function eventServiceFactory() {
    return new EventService();
}