enum NpcMode {
    // Do nothing
    NONE = -1,
    // Wander around the NPC's spawn point
    WANDER = 0,
    // Patrol between a list of points
    PATROL = 1,
    // Retreat from its target
    PLAYERESCAPE = 2,
    // Follow its target
    PLAYERFOLLOW = 3,
    // Face its target while within maxrange distance
    PLAYERFACE = 4,
    // Face its target while within 1 tile distance
    PLAYERFACECLOSE = 5,

    // Execute [ai_opplayerX,npc] script
    OPPLAYER1 = 6,
    OPPLAYER2 = 7,
    OPPLAYER3 = 8,
    OPPLAYER4 = 9,
    OPPLAYER5 = 10,

    // Execute [ai_applayerX,npc] script
    APPLAYER1 = 11,
    APPLAYER2 = 12,
    APPLAYER3 = 13,
    APPLAYER4 = 14,
    APPLAYER5 = 15,

    // Execute [ai_oplocX,npc] script
    OPLOC1 = 16,
    OPLOC2 = 17,
    OPLOC3 = 18,
    OPLOC4 = 19,
    OPLOC5 = 20,

    // Execute [ai_aplocX,npc] script
    APLOC1 = 21,
    APLOC2 = 22,
    APLOC3 = 23,
    APLOC4 = 24,
    APLOC5 = 25,

    // Execute [ai_opobjX,npc] script
    OPOBJ1 = 26,
    OPOBJ2 = 27,
    OPOBJ3 = 28,
    OPOBJ4 = 29,
    OPOBJ5 = 30,

    // Execute [ai_apobjX,npc] script
    APOBJ1 = 31,
    APOBJ2 = 32,
    APOBJ3 = 33,
    APOBJ4 = 34,
    APOBJ5 = 35,

    // Execute [ai_opnpcX,npc] script
    OPNPC1 = 36,
    OPNPC2 = 37,
    OPNPC3 = 38,
    OPNPC4 = 39,
    OPNPC5 = 40,

    // Execute [ai_apnpcX,npc] script
    APNPC1 = 41,
    APNPC2 = 42,
    APNPC3 = 43,
    APNPC4 = 44,
    APNPC5 = 45
};

export default NpcMode;
