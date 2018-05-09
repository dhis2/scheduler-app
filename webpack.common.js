const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJSON = require('./package.json');
const path = require('path');

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            'whatwg-fetch',
            './app/src/index.js',
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
            template: 'public/index.html',
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
            },
        ],
    },
    resolve: {
        alias: {
            actions: path.resolve(__dirname, 'app/src/actions'),
            api: path.resolve(__dirname, 'app/src/api'),
            components: path.resolve(__dirname, 'app/src/components'),
            constants: path.resolve(__dirname, 'app/src/constants'),
            locales: path.resolve(__dirname, 'app/src/locales'),
            react: path.resolve('./node_modules/react'),
            reducers: path.resolve(__dirname, 'app/src/reducers'),
            utils: path.resolve(__dirname, 'app/src/utils'),

            // Use the app's own d2 version in other packages
            'd2/lib/d2': path.resolve(__dirname, 'node_modules/d2/lib/d2'),
        },
        extensions: ['.js', '.jsx'],
    },
};
