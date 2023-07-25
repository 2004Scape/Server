import ServerTriggerType from '#lostcity/engine/script/ServerTriggerType.js';
import Loc from '#lostcity/entity/Loc.js';
import Npc from '#lostcity/entity/Npc.js';
import Obj from '#lostcity/entity/Obj.js';
import Player from '#lostcity/entity/Player.js';

export type Interaction = {
    // TODO: accept trigger type or npc mode
    mode: ServerTriggerType;
    target: Player | Npc | Loc | Obj;
    ap: boolean;
    apRange: number;
    apRangeCalled: boolean;
}
