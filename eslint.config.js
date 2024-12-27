import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['bundle.js', 'eslint.config.js', 'out/**/*', 'public/**/*', 'data/**/*', 'src/3rdparty/**/*', 'src/**/*.test.ts', 'src/**/*.bench.ts']
    },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended, // recommendedTypeChecked
    // {
    //   languageOptions: {
    //     parserOptions: {
    //       projectService: true,
    //       tsconfigRootDir: import.meta.dirname,
    //     },
    //   }
    // },
    {
        rules: {
            indent: ['error', 4, { SwitchCase: 1 }],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],

            /**
             * https://eslint.org/docs/latest/rules/no-constant-condition#checkloops
             *
             * Allows constant conditions in loops but not in if statements
             */
            'no-constant-condition': ['error', { checkLoops: false }],

            /**
             * (jkm) this rule is included in the default ruleset, we should consider
             * resolving the issues and setting it to error
             * https://eslint.org/docs/latest/rules/no-case-declarations
             */
            'no-case-declarations': 'warn',

            /**
             * (jkm)
             * The following rules are included in @typescript-eslint/recommended
             * I have set them to warn instead of error, to avoid having to fix them
             * We should consider fixing them and setting them to error
             */
            '@typescript-eslint/no-namespace': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',

            '@typescript-eslint/no-unused-vars': [
                // TODO: Set to error
                'warn',
                {
                    /**
                     * Allow variables prefixed with underscores to skip this rule.
                     * There aren't many good reasons to have unused variables,
                     * but the codebase has 100s of them.
                     */
                    'vars': 'all',
                    'varsIgnorePattern': '^_',
                    /**
                    * Allow parameters prefixed with underscores to skip this rule.
                    * This is a common practice for router methods with req and res parameters.
                    */
                    'args': 'all',
                    'argsIgnorePattern': '^_',
                }
            ],
        }
    }
];
