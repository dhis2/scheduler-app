const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJSON = require('./package.json');
const path = require('path');

const polyfillEntry = path.join(__dirname, 'app/src/polyfills.js');
module.exports = {
    entry: {
        polyfills: polyfillEntry,
        app: ['./app/src/index.js'],
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name]_[chunkhash:8].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'DHIS2 Scheduler',
            filename: 'index.html',
            template: 'public/index.html',
        }),
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // Exclude `js` files to keep "css" loader working as it injects
                // its runtime that would otherwise processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.(js|jsx|mjs|css)$/, /\.html$/, /\.json$/],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file-loader'
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
