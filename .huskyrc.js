const { config } = require('@dhis2/cli-style')
const husky = require(config.husky)

const tasks = arr => arr.join(' && ')

module.exports = {
    hooks: {
        ...husky.hooks,
        'pre-commit': tasks([
            ...husky.hooks['pre-commit'],
            'stylelint "./src/**/*.css"',
            'prettier "./src/**/*.css" --check'
        ]),
    },
}
