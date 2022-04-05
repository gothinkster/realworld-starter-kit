module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    env: {
        node: true,
        es2021: true,
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        camelcase: [2, { properties: 'always' }],
        complexity: ['error', { max: 15 }],
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'prettier/prettier': 'error',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    String: false,
                    Boolean: false,
                    Number: false,
                    Symbol: false,
                    '{}': false,
                    Object: false,
                    object: false,
                    Function: false,
                },
                extendDefaults: true,
            },
        ],
    },
};
