export default class ScriptVarType {
    static INT = 105; // i
    static AUTOINT = 97; // a - virtual type used for enum keys
    static STRING = 115; // s
    static ENUM = 103; // g
    static OBJ = 111; // o
    static LOC = 108; // l
    static COMPONENT = 73; // I
    static NAMEDOBJ = 79; // O
    static STRUCT = 74; // J
    static BOOLEAN = 49; // 1
    static COORD = 99; // c
    static CATEGORY = 121; // y
    static SPOTANIM = 116; // t
    static NPC = 110; // n
    static INV = 118; // v
    static SYNTH = 80; // P
    static SEQ = 65; // A
    static STAT = 83; // S

    static getType(type: number) {
        switch (type) {
            case ScriptVarType.INT:
                return 'int';
            case ScriptVarType.STRING:
                return 'string';
            case ScriptVarType.ENUM:
                return 'enum';
            case ScriptVarType.OBJ:
                return 'obj';
            case ScriptVarType.LOC:
                return 'loc';
            case ScriptVarType.COMPONENT:
                return 'component';
            case ScriptVarType.NAMEDOBJ:
                return 'namedobj';
            case ScriptVarType.STRUCT:
                return 'struct';
            case ScriptVarType.BOOLEAN:
                return 'boolean';
            case ScriptVarType.COORD:
                return 'coord';
            case ScriptVarType.CATEGORY:
                return 'category';
            case ScriptVarType.SPOTANIM:
                return 'spotanim';
            case ScriptVarType.NPC:
                return 'npc';
            case ScriptVarType.INV:
                return 'inv';
            case ScriptVarType.SYNTH:
                return 'synth';
            case ScriptVarType.SEQ:
                return 'seq';
            case ScriptVarType.STAT:
                return 'stat';
            default:
                return 'unknown';
        }
    }

    static getDefault(type: number) {
        if (type === ScriptVarType.STRING) {
            return '';
        } else if (type === ScriptVarType.BOOLEAN) {
            return 0;
        } else {
            return -1;
        }
    }
}
