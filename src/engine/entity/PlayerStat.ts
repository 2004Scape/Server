export enum PlayerStat {
    ATTACK,
    DEFENCE,
    STRENGTH,
    HITPOINTS,
    RANGED,
    PRAYER,
    MAGIC,
    COOKING,
    WOODCUTTING,
    FLETCHING,
    FISHING,
    FIREMAKING,
    CRAFTING,
    SMITHING,
    MINING,
    HERBLORE,
    AGILITY,
    THIEVING,
    STAT18,
    STAT19,
    RUNECRAFT
}

export type PlayerStatKey = keyof typeof PlayerStat;

export const PlayerStatEnabled = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true];

export const PlayerStatFree = [true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, false, false, false, false, false, true];
