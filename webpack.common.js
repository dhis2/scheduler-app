const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const polyfillEntry = path.join(__dirname, 'src/polyfills.js');
module.exports = {
    entry: {
        polyfills: polyfillEntry,
        app: ['./src/index.js'],
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
        ],
    },
    resolve: {
        alias: {
            // Use the app's own d2 version in other packages
            'd2/lib/d2': path.resolve(__dirname, 'node_modules/d2/lib/d2'),
        },
        extensions: ['.js', '.jsx'],
    },
};
