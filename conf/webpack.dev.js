const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const webpack = require('webpack');
const path = require('path');

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const EvalSourceMapDevToolPlugin = require('webpack/lib/EvalSourceMapDevToolPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bs = require('browser-sync-webpack-plugin');
const proxy = require('proxy-middleware');
const url = require('url');

const proxyOptions = url.parse('http://localhost:3200');
proxyOptions.route = '/api/v1';

module.exports = function (options) {
  const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
  const HOST = process.env.HOST || 'localhost';
  const PORT = process.env.PORT || 3100;
  const PUBLIC = HOST + ':' + PORT;

  return webpackMerge(commonConfig({ env: ENV }), {
    mode: ENV,
    output: {
      path: helpers.root('./dist'),
      filename: 'edr-lightbox-[hash:8].min.js',
      sourceMapFilename: 'maps/[file].map'
    },
    module: {
      rules: [
        // {test: /\.css$/, use: ['style-loader', 'css-loader']},
        // {test: /\.html$/, use: ['html-loader']},

        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },

        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            { loader: 'ng-annotate-loader' },
            {
              loader: 'eslint-loader',
              options: {
                emitError: true,
                quiet: false,
                failOnWarning: false,
                clientLogLevel: true,

                // several examples !

                // default value
                formatter: require("eslint/lib/formatters/stylish"),

                // community formatter
                formatter: require("eslint-friendly-formatter")
              }
            }
          ]
        },

        // {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/font-woff']},
        // {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/font-woff']},
        // {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=application/octet-stream']},
        // {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader']},
        // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=8192&mimetype=image/svg+xml']},

      ]
    },
    plugins: [

      new bs(
        {
          host: 'localhost',
          port: 3000,
          proxy: {
            target: 'http://localhost:3100/',
            ws: true
          },
          plugins: ["bs-rewrite-rules", require("bs-switch-api-plugin")],
          middleware: [proxy(proxyOptions)]
        },
        {
          reload: false
        }
      ),

      new ExtractTextPlugin('style-[hash:8].css'),

      new EvalSourceMapDevToolPlugin({
        moduleFilenameTemplate: '[resource-path]',
        sourceRoot: 'webpack:///'
      }),
      new NamedModulesPlugin(),

      new LoaderOptionsPlugin({
        debug: true,
        options: { }
      }),
    ],
    devServer: {
      port: PORT,
      host: HOST,
      public: PUBLIC,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/
      },
      setup: function(app) {
        // For example, to define custom handlers for some paths:
        // app.get('/some/path', function(req, res) {
        //   res.json({ custom: 'response' });
        // });
      }
    },
  });

};
