const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false,
        }),
        new CleanWebpackPlugin(['build']),
        new CopyWebpackPlugin([
            {
                from: './manifest.webapp',
                to: './manifest.webapp',
            }, {
                from: './assets/icon.png',
                to: './icon.png',
            },
        ]),
        new ZipPlugin({
            filename: 'Scheduler.zip',
        }),
    ],
});