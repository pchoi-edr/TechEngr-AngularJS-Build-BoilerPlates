const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
    entry: {
        entry: './src/scripts/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name]-[hash:8].min.js',
        sourceMapFilename: 'maps/[file].map'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            moment: 'moment',
            'window.moment': 'moment',
            Util: 'exports-loader?Util!bootstrap/js/dist/util'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src', 'index.html'),
            filename: path.resolve(__dirname, 'index.html'),
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin()
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        alias: {
            Services: path.resolve(__dirname, 'src/services/')
        }
    },
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.html$/, use: ['html-loader']},
            {test: /src.*\.js$/, use: ['ng-annotate-loader']},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/font-woff']},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/font-woff']},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/octet-stream']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader']},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=image/svg+xml']}
        ]
    },
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: {
                    host: '0.0.0.0',
                    protocol: 'http:',
                    port: 8000
                }
            }
        }
    }
};
