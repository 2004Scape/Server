import { defineConfig } from 'vitest/config';

/**
 * https://vitest.dev/config/file
 */
const Configuration = defineConfig({
    test: {
        // Use the APIs globally like Jest
        globals: true,
    },
});

export default Configuration;
