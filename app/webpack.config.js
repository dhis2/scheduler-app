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
        path: path.join(__dirname, '..', 'target', 'classes', 'static'),
        filename: path.join('js', `[name]_${packageJSON.version}.js`),
        //this is where the files are served from
        publicPath: BASE_APP_NAME + '/',
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
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
        extensions: ['.js', '.jsx'],
        alias: {
            react: path.resolve('./node_modules/react'),
            'material-ui': path.resolve('./node_modules/material-ui'),
        },
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
            template: 'app/indexbuild.html',
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
        proxy: {
            '*': {
                "target": "http://localhost:8080"
            },
        },
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
            template: 'app/indexbuild.html',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ]
})

module.exports = isDevBuild ? dev : prod;