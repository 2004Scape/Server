import { workerData } from 'node:worker_threads';

import { tsImport } from 'tsx/esm/api';

tsImport(workerData.__ts_worker_filename, import.meta.url);
