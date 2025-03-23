import Npc from '#/engine/entity/Npc.js';
import ScriptFile from '#/engine/script/ScriptFile.js';
import Linkable from '#/util/Linkable.js';

export enum NpcEventType {
    SPAWN,
    DESPAWN
}

export class NpcEventRequest extends Linkable {
    /**
     * The type of queue request.
     */
    type: NpcEventType;

    /**
     * The script to execute.
     */
    script: ScriptFile;

    /**
     * The script to execute.
     */
    npc: Npc;

    constructor(type: NpcEventType, script: ScriptFile, npc: Npc) {
        super();
        this.type = type;
        this.script = script;
        this.npc = npc;
    }
}
