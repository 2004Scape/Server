import { Worker as NodeWorker, WorkerOptions } from 'worker_threads';

import Environment from '#/util/Environment.js';

class TsWorker extends NodeWorker {
    constructor(filename: string | URL, options: WorkerOptions = {}) {
        options.workerData ??= {};
        options.workerData.__ts_worker_filename = filename.toString();
        super(new URL('../worker.mjs', import.meta.url), options);
    }
}

export function createWorker(filename: string): Worker | NodeWorker {
    if (Environment.STANDALONE_BUNDLE) {
        return new Worker(filename, {type: 'module'});
    } else {
        return new TsWorker(filename);
    }
}
