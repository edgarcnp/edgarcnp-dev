module.exports = {
    extends: [
        'next/core-web-vitals',
        '@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        // General JavaScript rules
        'no-console': 'warn',
        'no-unused-vars': 'off', // We'll rely on TypeScript for this

        // TypeScript-specific rules
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/prefer-const': 'error',
        '@typescript-eslint/no-inferrable-types': 'warn',
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'error',
            },
        },
    ],
    ignorePatterns: ['node_modules/', '.next/', 'out/'],
};
