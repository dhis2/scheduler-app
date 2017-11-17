const webpack = require('webpack');
const path = require('path');
const packageJSON = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';

const appstoreEnv = process.env.DHIS2_APPSTORE_ENV;
const isDevBuild = process.argv.indexOf('-p') === -1;
const BASE_APP_NAME = "scheduler"

const prod = {
    entry: {
        app: ['babel-polyfill','whatwg-fetch', './app/src/scheduler.js'],
    },
    output: {
        path: path.join(__dirname, '..', 'build'),
        filename: path.join(`[name]_${packageJSON.version}.js`),
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [`file-loader?name=[name]_${packageJSON.version}.[ext]&publicPath=${BASE_APP_NAME}/&outputPath=assets/`]
            }
        ],
    },
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react'),
            'material-ui': path.resolve('./node_modules/material-ui'),
            api: path.resolve(__dirname, 'src/api'),
            actions: path.resolve(__dirname, 'src/actions'),
            components: path.resolve(__dirname, 'src/components'),
            constants: path.resolve(__dirname, 'src/constants'),
            reducers: path.resolve(__dirname, 'src/reducers'),
        },
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new HtmlWebpackPlugin({
            title: 'DHIS2 Scheduler',
            filename: 'index.html',
            template: 'app/index.html',
        }),

        new webpack.optimize.UglifyJsPlugin({minimize: true, comments: false}),
    ]
}

const dev = Object.assign({}, prod, {
    entry: {
        app: ['babel-polyfill','whatwg-fetch', './app/src/scheduler.js'],
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/',
    },
    devServer: {
        port: 9000,
        inline: true,
        contentBase: './app',
        historyApiFallback: true,
        host: '0.0.0.0',
        disableHostCheck: true
    },
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'DHIS2 Scheduler',
            filename: 'index.html',
            template: 'app/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ]
})

module.exports = isDevBuild ? dev : prod;