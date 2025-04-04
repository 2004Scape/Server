export const enum NpcMode {
    // Default mode
    NULL = -1,
    // Do nothing
    NONE = 0,
    // Wander around the NPC's spawn point
    WANDER = 1,
    // Patrol between a list of points
    PATROL = 2,
    // Retreat from its target
    PLAYERESCAPE = 3,
    // Follow its target
    PLAYERFOLLOW = 4,
    // Face its target while within maxrange distance
    PLAYERFACE = 5,
    // Face its target while within 1 tile distance
    PLAYERFACECLOSE = 6,

    // Execute [ai_opplayerX,npc] script
    OPPLAYER1 = 7,
    OPPLAYER2 = 8,
    OPPLAYER3 = 9,
    OPPLAYER4 = 10,
    OPPLAYER5 = 11,

    // Execute [ai_applayerX,npc] script
    APPLAYER1 = 12,
    APPLAYER2 = 13,
    APPLAYER3 = 14,
    APPLAYER4 = 15,
    APPLAYER5 = 16,

    // Execute [ai_oplocX,npc] script
    OPLOC1 = 17,
    OPLOC2 = 18,
    OPLOC3 = 19,
    OPLOC4 = 20,
    OPLOC5 = 21,

    // Execute [ai_aplocX,npc] script
    APLOC1 = 22,
    APLOC2 = 23,
    APLOC3 = 24,
    APLOC4 = 25,
    APLOC5 = 26,

    // Execute [ai_opobjX,npc] script
    OPOBJ1 = 27,
    OPOBJ2 = 28,
    OPOBJ3 = 29,
    OPOBJ4 = 30,
    OPOBJ5 = 31,

    // Execute [ai_apobjX,npc] script
    APOBJ1 = 32,
    APOBJ2 = 33,
    APOBJ3 = 34,
    APOBJ4 = 35,
    APOBJ5 = 36,

    // Execute [ai_opnpcX,npc] script
    OPNPC1 = 37,
    OPNPC2 = 38,
    OPNPC3 = 39,
    OPNPC4 = 40,
    OPNPC5 = 41,

    // Execute [ai_apnpcX,npc] script
    APNPC1 = 42,
    APNPC2 = 43,
    APNPC3 = 44,
    APNPC4 = 45,
    APNPC5 = 46,

    // Execute the [ai_queueX,npc] script
    QUEUE1 = 47,
    QUEUE2 = 48,
    QUEUE3 = 49,
    QUEUE4 = 50,
    QUEUE5 = 51,
    QUEUE6 = 52,
    QUEUE7 = 53,
    QUEUE8 = 54,
    QUEUE9 = 55,
    QUEUE10 = 56,
    QUEUE11 = 57,
    QUEUE12 = 58,
    QUEUE13 = 59,
    QUEUE14 = 60,
    QUEUE15 = 61,
    QUEUE16 = 62,
    QUEUE17 = 63,
    QUEUE18 = 64,
    QUEUE19 = 65,
    QUEUE20 = 66
}

export const NpcModeMap: Map<string, number> = new Map([
    ['NULL', NpcMode.NULL],
    ['NONE', NpcMode.NONE],
    ['WANDER', NpcMode.WANDER],
    ['PATROL', NpcMode.PATROL],
    ['PLAYERESCAPE', NpcMode.PLAYERESCAPE],
    ['PLAYERFOLLOW', NpcMode.PLAYERFOLLOW],
    ['PLAYERFACE', NpcMode.PLAYERFACE],
    ['PLAYERFACECLOSE', NpcMode.PLAYERFACECLOSE],
    ['OPPLAYER1', NpcMode.OPPLAYER1],
    ['OPPLAYER2', NpcMode.OPPLAYER2],
    ['OPPLAYER3', NpcMode.OPPLAYER3],
    ['OPPLAYER4', NpcMode.OPPLAYER4],
    ['OPPLAYER5', NpcMode.OPPLAYER5],
    ['APPLAYER1', NpcMode.APPLAYER1],
    ['APPLAYER2', NpcMode.APPLAYER2],
    ['APPLAYER3', NpcMode.APPLAYER3],
    ['APPLAYER4', NpcMode.APPLAYER4],
    ['APPLAYER5', NpcMode.APPLAYER5],
    ['OPLOC1', NpcMode.OPLOC1],
    ['OPLOC2', NpcMode.OPLOC2],
    ['OPLOC3', NpcMode.OPLOC3],
    ['OPLOC4', NpcMode.OPLOC4],
    ['OPLOC5', NpcMode.OPLOC5],
    ['APLOC1', NpcMode.APLOC1],
    ['APLOC2', NpcMode.APLOC2],
    ['APLOC3', NpcMode.APLOC3],
    ['APLOC4', NpcMode.APLOC4],
    ['APLOC5', NpcMode.APLOC5],
    ['OPOBJ1', NpcMode.OPOBJ1],
    ['OPOBJ2', NpcMode.OPOBJ2],
    ['OPOBJ3', NpcMode.OPOBJ3],
    ['OPOBJ4', NpcMode.OPOBJ4],
    ['OPOBJ5', NpcMode.OPOBJ5],
    ['APOBJ1', NpcMode.APOBJ1],
    ['APOBJ2', NpcMode.APOBJ2],
    ['APOBJ3', NpcMode.APOBJ3],
    ['APOBJ4', NpcMode.APOBJ4],
    ['APOBJ5', NpcMode.APOBJ5],
    ['OPNPC1', NpcMode.OPNPC1],
    ['OPNPC2', NpcMode.OPNPC2],
    ['OPNPC3', NpcMode.OPNPC3],
    ['OPNPC4', NpcMode.OPNPC4],
    ['OPNPC5', NpcMode.OPNPC5],
    ['APNPC1', NpcMode.APNPC1],
    ['APNPC2', NpcMode.APNPC2],
    ['APNPC3', NpcMode.APNPC3],
    ['APNPC4', NpcMode.APNPC4],
    ['APNPC5', NpcMode.APNPC5],
    // TODO: these are not used?
    // ['QUEUE1', NpcMode.QUEUE1],
    // ['QUEUE2', NpcMode.QUEUE2],
    // ['QUEUE3', NpcMode.QUEUE3],
    // ['QUEUE4', NpcMode.QUEUE4],
    // ['QUEUE5', NpcMode.QUEUE5],
    // ['QUEUE6', NpcMode.QUEUE6],
    // ['QUEUE7', NpcMode.QUEUE7],
    // ['QUEUE8', NpcMode.QUEUE8],
    // ['QUEUE9', NpcMode.QUEUE9],
    // ['QUEUE10', NpcMode.QUEUE10],
    // ['QUEUE11', NpcMode.QUEUE11],
    // ['QUEUE12', NpcMode.QUEUE12],
    // ['QUEUE13', NpcMode.QUEUE13],
    // ['QUEUE14', NpcMode.QUEUE14],
    // ['QUEUE15', NpcMode.QUEUE15],
    // ['QUEUE16', NpcMode.QUEUE16],
    // ['QUEUE17', NpcMode.QUEUE17],
    // ['QUEUE18', NpcMode.QUEUE18],
    // ['QUEUE19', NpcMode.QUEUE19],
    // ['QUEUE20', NpcMode.QUEUE20],
]);
