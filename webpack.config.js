'use strict';

console.log("ran styr");

var webpack = require('webpack');
var path    = require('path');
var fse     = require('fs-extra');

// Load Webpack Plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Settings
var appEnv              = process.env.NODE_ENV || 'localhost';
var appPath             = path.join(__dirname, 'src');
var distPath            = path.join(__dirname, 'dist');
var assetsPathPattern   = '[path][name].[hash].[ext]';
var distFilenamePattern = '[name].[hash].js';
var exclude             = [/node_modules/, /\.test.js$/];
var globals             = require('./config/globals');

// Load the config, default to `localhost`
var appConfig = require('./config/config');
appConfig     = appConfig[appEnv] || appConfig.localhost;

console.log('-- PATH ENV ---');
console.log(appEnv);

var config = {

  // The base directory for resolving `entry` (must be absolute path)
  context: appPath,

  entry: {
    app: 'app.js',
    vendor: [
      'angular',
      'jquery',
      'angular-ui-router',
      'angular-animate',
      'angular-translate',
      'ngStorage',
      'moment/moment',
      'lodash',
      'algoliasearch',
      'algoliasearch-helper',
      'autocomplete.js',
      'angular-sanitize',
      'angular-filter'
    ]
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // Set proper base URL for serving resources
    //tell webpack from where to serve the output file at the webserver
    //in this case all request will go to distPath
    publicPath: '',
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: distFilenamePattern
  },

  plugins: [
    // Remove duplicate `require`d files
    new webpack.optimize.DedupePlugin(),

    // Render an index.html for the app
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: 'app.html',
      favicon: 'assets/images/favicon.ico'
    }),

    // Define global variables that will be available in any chunk
    new webpack.DefinePlugin(globals),

    // Combine all modules loaded from the `vendor` chunk into a separate file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],

  // Options affecting the resolving of modules
  resolve: {
    // Enable resolving modules relative to these paths
    root: [appPath]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          // Annotate Angular dependancy injection to support minification
          'ng-annotate?single_quotes=true',
          // Transpile ES6 into ES5
          'babel'
        ],
        exclude: exclude
      },

      // Allow `require`ing SCSS files
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css',
          'autoprefixer',
          'sass?includePaths[]=' + encodeURIComponent(appPath)
        ]
      },

      // Allow `require`ing HTML files (Views) as raw strings
      // Also handles <img> `src` attributes (only static, dynamic `src` won't work)
      {
        test: /\.html$/,
        loader: 'html',
        exclude: exclude
      },

      // Allow `require`ing JSON files as objects
      {
        test: /\.json$/,
        loader: 'json',
        exclude: exclude
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(jpe?g|png|gif|eot|woff2?|ttf|svg)(\?.*)?$/i,
        loaders: [
          'url?limit=5120&name=' + assetsPathPattern
        ]
      },

      {test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=/public/icons/[name].[ext]"}

    ]
  },

  // Specify dependencies that shouldn’t be resolved by webpack
  externals: [
    // chart.js-scatter tries to load a `Chart` module, which doesn't exist
    // This will prevent it, otherwise it throws the module is not found
    'Chart'
  ],

  // Settings for webpack-dev-server (instead of using CLI flags)
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: appPath,
    colors: true,
    inline: true,
    historyApiFallback: true
  }

};

if (appEnv === 'localhost') {
  config.devtool = '#inline-source-map';
}

if (appEnv === 'production') {

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));

  // Remove build related folders
  fse.removeSync(distPath);
}

module.exports = config;
