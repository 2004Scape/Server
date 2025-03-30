import { ScriptArgument } from '#/engine/entity/PlayerQueueRequest.js';
import Linkable from '#/util/Linkable.js';

export class NpcQueueRequest extends Linkable {
    queueId: number;

    /**
     * The arguments to execute the script with.
     */
    args: ScriptArgument[];

    /**
     * The number of ticks remaining until the queue executes.
     */
    delay: number;

    lastInt: number = 0;

    constructor(queueId: number, args: ScriptArgument[], delay: number) {
        super();
        this.queueId = queueId;
        this.args = args;
        this.delay = delay;
    }
}
