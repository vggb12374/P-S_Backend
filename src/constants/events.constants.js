export class Events {
    static TREE = 0;
    static COBBLESTONE = 1;
    static BEAST = 2;
    static CAVE = 3;
    static BOAT = 4;
    static SPAWN_ROPE = 5;
    static SPAWN_SPEAR = 6;
    static SPAWN_RUM = 7;
    static SPAWN_AXE = 8;
    static SPAWN_PICKAXE = 9;
    static SPAWN_SHOVEL = 10;

    static FOREST_EVENTS_RATE = 4;

    /**
     * Get sorted (asc) list of events for FOREST squares.
     * @returns 
     */
    static getForestEventsList() {
        return [
            Events.TREE,
            Events.COBBLESTONE,
            Events.BEAST,
            Events.SPAWN_ROPE,
            Events.SPAWN_SPEAR,
            Events.SPAWN_RUM,
            Events.SPAWN_AXE,
            Events.SPAWN_PICKAXE,
            Events.SPAWN_SHOVEL
        ].sort((a, b) => a - b);
    }
}
