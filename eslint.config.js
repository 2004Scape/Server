import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['bundle.js', 'eslint.config.js', 'out/**/*', 'public/**/*', 'data/**/*', 'src/3rdparty/**/*', 'src/**/*.test.ts', 'src/**/*.bench.ts']
    },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended, // recommendedTypeChecked
    importPlugin.flatConfigs.recommended,
    // {
    //   languageOptions: {
    //     parserOptions: {
    //       projectService: true,
    //       tsconfigRootDir: import.meta.dirname,
    //     },
    //   }
    // },
    {
        settings: {
            'import/resolver': {
                node: true,
                typescript: true
            }
        }
    },
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
            'no-case-declarations': 'error',
            '@typescript-eslint/no-namespace': 'error',
            /**
             * (jkm)
             * The following rule is included in @typescript-eslint/recommended
             * I have set it to warn instead of error, to avoid having to fix it
             * We should consider fixing it and setting it to error
             */
            '@typescript-eslint/no-explicit-any': 'warn',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    /**
                     * Allow variables prefixed with underscores to skip this rule.
                     * There aren't many good reasons to have unused variables,
                     * but the codebase has 100s of them.
                     */
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    /**
                     * Allow parameters prefixed with underscores to skip this rule.
                     * This is a common practice for router methods with req and res parameters.
                     */
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_'
                }
            ],

            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal'],
                    pathGroups: [
                        {
                            pattern: 'node',
                            group: 'external',
                            position: 'before'
                        }
                    ],
                    pathGroupsExcludedImportTypes: ['node'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true
                    }
                }
            ]
        }
    }
];
