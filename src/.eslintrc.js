const { config } = require('@dhis2/cli-style')

module.exports = {
    root: true,
    plugins: ['react-hooks', 'i18next'],
    extends: [
        config.eslintReact,
        'plugin:jsx-a11y/recommended',
        'plugin:compat/recommended',
    ],
    rules: {
        'i18next/no-literal-string': [
            'error',
            { markupOnly: true, onlyAttribute: [""] },
        ],
        'compat/compat': 'warn',
        'import/export': 'error',
        'import/extensions': ['error', 'never'],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-cycle': 'error',
        'import/no-duplicates': 'error',
        'import/no-internal-modules': [
            'error',
            {
                allow: [
                    '**/components/*',
                    '**/hooks/*',
                    '**/pages/*',
                    '**/services/*',
                    'cronstrue/*',
                    'test/*',
                ],
            },
        ],
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
                ignoreExports: [
                    '**/*.test.js',
                    'src/setupTests.js',
                    'src/components/App/index.js',
                ],
            },
        ],
        'import/no-useless-path-segments': 'error',
        'import/order': ['error', { 'newlines-between': 'never' }],
        'react/require-default-props': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    overrides: [
        {
            files: ['*.test.js'],
            rules: {
                'i18next/no-literal-string': 'off',
                'react/prop-types': 'off',
            },
        },
    ],
}