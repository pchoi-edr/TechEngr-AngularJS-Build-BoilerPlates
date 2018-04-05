const helpers = require('./helpers');

const DefinePlugin = require('webpack/lib/DefinePlugin');
// const CommonsChunkPlugin = require('webpack/lib/optimization/SplitChunksPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = function (options) {
  const isProd = options.env === 'production';

  return {
    entry: {
      entry: helpers.root('./src/scripts/main.js')
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        // {
        //   test: /\.css$/,
        //   use: ['style-loader', 'css-loader']
        // },

        // /**
        //  * To string and sass loader support for *.scss files (from Angular components)
        //  * Returns compiled css content as string
        //  *
        //  */
        // {
        //   test: /\.scss$/,
        //   use: ['style-loader', 'css-loader', 'sass-loader']
        // },
      ]
    },
    plugins: [

      new ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
        // 'window.jQuery': 'jquery',
        // moment: 'moment',
        // 'window.moment': 'moment',
        // Util: 'exports-loader?Util!bootstrap/js/dist/util'
      }),

      new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' }
      ],
        isProd ? { ignore: [ 'mock-data/**/*' ] } : undefined
      ),

      // new CommonsChunkPlugin({
      //   minChunks: Infinity,
      //   name: 'inline'
      // }),

      // new CommonsChunkPlugin({
      //   name: 'main',
      //   async: 'common',
      //   children: true,
      //   minChunks: 2
      // }),

      // new HtmlWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: 'test',
        // chunksSortMode: function (a, b) {
        //   const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
        //   return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
        // },
        inject: true,
        xhtml: true,
        minify: false
      }),

      // new HtmlElementsPlugin({
      //   headTags: require('./head-config.common')
      // }),

      new LoaderOptionsPlugin({}),

      new WebpackInlineManifestPlugin(),
    ]
  }
};
