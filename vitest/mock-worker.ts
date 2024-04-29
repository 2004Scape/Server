import { vi } from 'vitest';

vi.mock('#lostcity/util/WorkerFactory.js', async () => {
    return {
        createWorker: () => ({
            on: vi.fn(),
            postMessage: vi.fn()
        })
    };
});
