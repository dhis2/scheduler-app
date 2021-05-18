/* eslint-disable import/no-unused-modules */

const { config } = require('@dhis2/cli-style')

module.exports = {
    root: true,
    plugins: ['react-hooks', 'i18next'],
    extends: [
        config.eslintReact,
        'plugin:jsx-a11y/recommended',
        'plugin:compat/recommended',
    ],
    globals: {
        cy: 'readonly',
    },
    rules: {
        'compat/compat': 'warn',
        'i18next/no-literal-string': [
            'error',
            { markupOnly: true, onlyAttribute: ['label'] },
        ],
        'import/export': 'error',
        'import/extensions': ['error', 'never'],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-cycle': 'error',
        'import/no-duplicates': 'error',
        'import/no-named-as-default': 'error',
        'import/no-named-as-default-member': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-unassigned-import': ['error', { allow: ['**/*.css'] }],
        'import/no-unused-modules': [
            'error',
            {
                unusedExports: true,
                missingExports: true,
            },
        ],
        'import/no-useless-path-segments': 'error',
        'import/order': ['error', { 'newlines-between': 'never' }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
    },
    overrides: [
        {
            files: ['*.test.js', '**/__tests__/*.js'],
            rules: {
                'i18next/no-literal-string': 'off',
                'react/prop-types': 'off',
                'react/display-name': 'off',
                'import/no-unused-modules': 'off',
                'jsx-a11y/anchor-has-content': 'off',
            },
        },
        {
            files: ['**/Temporary/**'],
            rules: {
                'import/extensions': 'off',
                'import/no-internal-modules': 'off',
                'import/no-unused-modules': 'off',
            },
        },
        {
            files: ['cypress/**/*.js'],
            rules: {
                'import/no-unassigned-import': 'off',
                'import/no-unused-modules': 'off',
            },
        },
    ],
}
