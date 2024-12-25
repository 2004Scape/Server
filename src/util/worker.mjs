import { tsImport } from 'tsx/esm/api';
import { workerData } from 'node:worker_threads';

tsImport(workerData.__ts_worker_filename, import.meta.url);
