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
        'import/order': ['error', { 'newlines-between': 'never' }],
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
        'react/require-default-props': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
}
