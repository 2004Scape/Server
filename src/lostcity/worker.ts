import World from '#lostcity/engine/World.js';
import WorkerServer from '#lostcity/server/WorkerServer.js';

await World.start();

const workerServer = new WorkerServer();
workerServer.start();
