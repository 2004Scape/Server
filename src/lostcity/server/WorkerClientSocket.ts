import ClientSocket from '#lostcity/server/ClientSocket.js';

export default class WorkerClientSocket extends ClientSocket {
    worker: DedicatedWorkerGlobalScope;

    constructor(worker: DedicatedWorkerGlobalScope, uniqueId: `${string}-${string}-${string}-${string}-${string}`) {
        super();

        this.worker = worker;
        this.uniqueId = uniqueId;
    }

    send(src: Uint8Array): void {
        this.worker.postMessage({ type: 'data', data: src, id: this.uniqueId });
    }

    close(): void {
        this.worker.postMessage({ type: 'close', id: this.uniqueId });
    }

    terminate(): void {
        this.worker.postMessage({ type: 'close', id: this.uniqueId });
    }
}
