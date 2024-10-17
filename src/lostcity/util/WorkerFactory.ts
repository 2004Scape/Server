import { Worker as NodeWorker } from 'worker_threads';

import Environment from '#lostcity/util/Environment.js';

export function createWorker(fileName: string): Worker | NodeWorker {
    if (Environment.STANDALONE_BUNDLE) {
        return new Worker(fileName, {type: 'module'});
    } else {
        return new NodeWorker(fileName);
    }
}
