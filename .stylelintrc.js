/* eslint-disable import/no-unused-modules */

module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
    plugins: ['stylelint-no-unsupported-browser-features'],
    rules: {
        'font-family-name-quotes': 'always-where-recommended',
        'color-named': 'never',
        'declaration-no-important': true,
        'font-weight-notation': 'numeric',
        'plugin/no-unsupported-browser-features': [
            true,
            {
                severity: 'warning',
            },
        ],
    },
}
