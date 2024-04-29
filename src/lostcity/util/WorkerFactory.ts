import { Worker } from 'node:worker_threads';

export function createWorker(fileName: string) {
    return new Worker(fileName);
}
