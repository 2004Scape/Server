export const enum NpcStat {
    ATTACK,
    DEFENCE,
    STRENGTH,
    HITPOINTS,
    RANGED,
    MAGIC
}

export const NpcStatMap: Map<string, number> = new Map([
    ['ATTACK', NpcStat.ATTACK],
    ['DEFENCE', NpcStat.DEFENCE],
    ['STRENGTH', NpcStat.STRENGTH],
    ['HITPOINTS', NpcStat.HITPOINTS],
    ['RANGED', NpcStat.RANGED],
    ['MAGIC', NpcStat.MAGIC],
]);
