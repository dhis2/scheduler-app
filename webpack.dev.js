const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        publicPath: '/',
    },
    devServer: {
        port: 9000,
        inline: true,
        contentBase: './app',
        historyApiFallback: true,
        disableHostCheck: true,
        host: '0.0.0.0',
    },
    devtool: 'eval-source-map',
});