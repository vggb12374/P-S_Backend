export class MapSquares {
    static _FOREST = 16812577;
    static _OCEAN = 16777471;
    static _BEACH = 33522688;
    static _ROCK = 24343411;
    static _LAKE = 16842735;
    static _BOAT_SPAWN_POINT = 33550080;
    static _PLAYER_SPAWN_POINT = 33488896;
    static _CAVE_SPAWN_POINT = 29753599;

    static isMovable(squareType) {
        return (
            MapSquares.isForest(squareType) ||
            MapSquares.isBeach(squareType) ||
            MapSquares.isBoatSpawnPoint(squareType) ||
            MapSquares.isPlayerSpawnPoint(squareType) ||
            MapSquares.isCaveSpawnPoint(squareType)
        )
    }

    static isVisibility(squareType) {
        return (
            MapSquares.isOcean(squareType) ||
            MapSquares.isBeach(squareType) ||
            MapSquares.isRock(squareType) ||
            MapSquares.isLake(squareType) ||
            MapSquares.isBoatSpawnPoint(squareType) ||
            MapSquares.isPlayerSpawnPoint(squareType) ||
            MapSquares.isCaveSpawnPoint(squareType)
        )
    }

    static isForest(squareType) {
        return squareType === MapSquares._FOREST;
    }

    static isOcean(squareType) {
        return squareType === MapSquares._OCEAN;
    }

    static isBeach(squareType) {
        return squareType === MapSquares._BEACH;
    }

    static isRock(squareType) {
        return squareType === MapSquares._ROCK;
    }

    static isLake(squareType) {
        return squareType === MapSquares._LAKE;
    }

    static isBoatSpawnPoint(squareType) {
        return squareType === MapSquares._BOAT_SPAWN_POINT;
    }

    static isPlayerSpawnPoint(squareType) {
        return squareType === MapSquares._PLAYER_SPAWN_POINT;
    }

    static isCaveSpawnPoint(squareType) {
        return squareType === MapSquares._CAVE_SPAWN_POINT;
    }
}
