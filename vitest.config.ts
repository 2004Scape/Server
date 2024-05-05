import { defineConfig } from 'vitest/config';

/**
 * https://vitest.dev/config/file
 */
const Configuration = defineConfig({
    test: {
        // Use the APIs globally like Jest
        globals: true,
        // Prevent test cross-contamination when mocking implementations
        mockReset: true,
        // Files to run before tests
        setupFiles: [ './vitest/mock-worker.ts' ]
    },
});

export default Configuration;
