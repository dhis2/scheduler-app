// eslint-disable-next-line import/no-unused-modules
const { defineConfig } = require('cypress')
const webpack = require('@cypress/webpack-preprocessor')
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')

async function setupNodeEvents(on, config) {
    // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
    await preprocessor.addCucumberPreprocessorPlugin(on, config)

    on(
        'file:preprocessor',
        webpack({
            webpackOptions: {
                resolve: {
                    extensions: ['.ts', '.js'],
                },
                module: {
                    rules: [
                        {
                            test: /\.feature$/,
                            use: [
                                {
                                    loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                                    options: config,
                                },
                            ],
                        },
                    ],
                },
            },
        })
    )

    // Make sure to return the config object as it might have been modified by the plugin.
    return config
}

module.exports = defineConfig({
    projectId: 'sc56ms',
    experimentalInteractiveRunEvents: true,
    experimentalSessionSupport: true,
    video: false,
    e2e: {
        setupNodeEvents,
        baseUrl: 'http://localhost:3000',
        specPattern: 'cypress/e2e/**/*.feature',
    },
})
