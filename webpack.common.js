const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJSON = require('./package.json');
const path = require('path');

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            'whatwg-fetch',
            './app/src/scheduler.js',
        ],
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: `[name]_${packageJSON.version}.js`,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'DHIS2 Scheduler',
            filename: 'index.html',
            template: 'app/index.html',
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            }
        ],
    },
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react'),
            api: path.resolve(__dirname, 'app/src/api'),
            actions: path.resolve(__dirname, 'app/src/actions'),
            components: path.resolve(__dirname, 'app/src/components'),
            constants: path.resolve(__dirname, 'app/src/constants'),
            reducers: path.resolve(__dirname, 'app/src/reducers'),
        },
        extensions: ['.js', '.jsx'],
    },
};