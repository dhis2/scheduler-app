const { config } = require('@dhis2/cli-style')

module.exports = {
    root: true,
    plugins: [
        "react-hooks"
    ],
    extends: [
        config.eslintReact,
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:jsx-a11y/recommended',
        'plugin:compat/recommended',
    ],
    rules: {
        'compat/compat': 1,
        'import/order': ['error', { 'newlines-between': 'never' }],
        'react/require-default-props': 2,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    }
}
