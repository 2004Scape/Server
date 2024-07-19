import { Worker as NodeWorker } from 'worker_threads';

export function createWorker(fileName: string): Worker | NodeWorker {
    if (typeof self === 'undefined') {
        return new NodeWorker(fileName);
    } else {
        return new Worker(fileName, {type: 'module'});
    }
}
