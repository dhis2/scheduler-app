/* eslint-disable import/no-unused-modules */

module.exports = {
    patterns: {
        js: [
            '*.{js,jsx,ts,tsx}',
            '!coverage/**/*.js',
            '!src/locales/**/*.js',
            '!d2.config.js',
        ],
        text: '*.{md,json,yml,html}',
    },
}
