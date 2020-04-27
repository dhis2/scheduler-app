const { config } = require('@dhis2/cli-style')

module.exports = {
    root: true,
    plugins: ['react-hooks'],
    extends: [
        config.eslintReact,
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:jsx-a11y/recommended',
        'plugin:compat/recommended',
    ],
    rules: {
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
                    'cronstrue/*'
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
}
