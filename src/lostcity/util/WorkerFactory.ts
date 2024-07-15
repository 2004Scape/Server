import { Worker as NodeWorker } from 'node:worker_threads';

export function createWorker(fileName: string): Worker | NodeWorker {
    if (typeof self !== 'undefined') {
        return new Worker(fileName, {type: 'module'});
    } else {
        return new NodeWorker(fileName);
    }
}
