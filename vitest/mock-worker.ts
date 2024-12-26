import { vi } from 'vitest';

vi.mock('#/util/WorkerFactory.js', async () => {
    return {
        createWorker: () => ({
            on: vi.fn(),
            postMessage: vi.fn()
        })
    };
});
