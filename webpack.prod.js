const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = merge(common, {
    mode: 'production',

    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
        }),
        new CleanWebpackPlugin(['build']),

        // Only bundle english locales for moment
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new CopyWebpackPlugin([
            {
                from: './assets/icon.png',
                to: './icon.png',
            },
        ]),
    ],
    devtool: 'source-map',
});
