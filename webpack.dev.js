/* eslint-disable no-console, global-require, import/no-dynamic-require */

const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const dhisConfigPath = process.env.DHIS2_HOME && `${process.env.DHIS2_HOME}/config`;

let dhisConfig;
try {
    console.info('\nLoading DHIS2 configuration ...');
    dhisConfig = require(dhisConfigPath);
    console.info(`Retrieved configuration from ${dhisConfigPath}:\n`, dhisConfig);
} catch (e) {
    // Failed to load config file – use default config
    console.warn('\nFailed to load DHIS config:', e.message);
    dhisConfig = {
        baseUrl: 'http://localhost:8080',
        authorization: 'Basic c3lzdGVtOlN5c3RlbTEyMw==',
    };
    console.info('Using default config:', dhisConfig);
} finally {
    console.info();
}

module.exports = merge(common, {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            DHIS_CONFIG: JSON.stringify(dhisConfig),
        }),
    ],
    devServer: {
        port: 9000,
        inline: true,
        contentBase: './src',
        clientLogLevel: 'none',
        historyApiFallback: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        proxy: {
            '/dhis-web-core-resource': {
                target: dhisConfig.baseUrl,
            },
        },
    },
    devtool: 'eval-source-map',
});
