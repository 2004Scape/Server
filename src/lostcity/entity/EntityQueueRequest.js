/** @typedef {'weak' | 'normal' | 'strong'} QueueType */
/** @typedef {number|string} ScriptArgument */
export class EntityQueueRequest {
    /**
     * The type of queue request.
     * @type {QueueType|null}
     */
    type = null;

    /**
     * The script to execute.
     * @type {any|null}
     */
    script = null;

    /**
     * The arguments to execute the script with.
     * @type {ScriptArgument[]|null}
     */
    args = null;

    /**
     * The number of ticks remaining until the queue executes.
     * @type {number}
     */
    delay = -1;

    constructor(type, script, args, delay) {
        this.type = type;
        this.script = script;
        this.args = args;
        this.delay = delay;
    }
}
