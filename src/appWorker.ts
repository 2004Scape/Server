import World from '#/engine/World.js';
import WorkerServer from '#/server/worker/WorkerServer.js';

await World.start();

const workerServer = new WorkerServer();
workerServer.start();
self.postMessage({ type: 'ready' });
