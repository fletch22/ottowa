'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

// new webpack.optimize.OccurenceOrderPlugin(),
//   new HtmlWebpackPlugin({
//     template: 'app/index.tpl.html',
//     inject: 'body',
//     filename: 'index.html'
//   }),
//   new ExtractTextPlugin('[name]-[hash].min.css'),
//   new webpack.optimize.UglifyJsPlugin({
//     compressor: {
//       warnings: false,
//       screw_ie8: true
//     }
//   }),
//   new StatsPlugin('webpack.stats.json', {
//     source: false,
//     modules: false
//   }),

module.exports = {
  entry: [
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    dns: 'empty',
    child_process: 'empty'
  },
  module: {
    loaders: [
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "presets": ["react", "es2015", "stage-0"]
        }
      }, {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 3 versions',
          'sass?outputStyle=expanded'
        ]
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: "file"
      }
    ]
  },
  postcss: [
    require('autoprefixer')
  ]
};
