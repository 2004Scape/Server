import World from '#lostcity/engine/World.js';
import WorkerServer from '#lostcity/server/worker/WorkerServer.js';

await World.start();

const workerServer = new WorkerServer();
workerServer.start();
self.postMessage({ type: 'ready' });
