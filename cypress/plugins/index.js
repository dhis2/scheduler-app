const {
    cucumberPreprocessor,
} = require('@dhis2/cypress-plugins')

module.exports = (on, config) => {
    cucumberPreprocessor(on, config)
}
