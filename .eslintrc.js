const SEVERITY = 2

module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:jsx-a11y/recommended',
        'plugin:compat/recommended',
        'prettier',
        'prettier/react',
    ],
    rules: {
        'compat/compat': 1,
        'max-params': [
            SEVERITY,
            {
                max: 3,
            },
        ],
        'prefer-const': [
            SEVERITY,
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: false,
            },
        ],
        'import/order': ['error', { 'newlines-between': 'never' }],
        'react/require-default-props': SEVERITY,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
