/* eslint-disable */
'use-strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      title: 'Title',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'DEBUG': true,
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.MODE': ['refactor', 'router', 'example'].indexOf(process.env.MODE) > -1 ? JSON.stringify(process.env.MODE) : JSON.stringify('todo')
    })
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
    ],
    loaders: [ {
      test: /\.jsx?$/,
      loaders: [ 'babel' ],
      include: path.join(__dirname, 'src/js')
    },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader",
      },
      // {
      //     test: /\.(png|jpg|gif)$/,
      //     loader: 'file-loader?name=img/img-[hash:6].[ext]'
      // },
      // {
      //     test: /\.json$/,
      //     loader: 'json-loader'
      // },
      // {
      //     test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'
      // },
      // {
      //     test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff'
      // },
      // {
      //     test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff'
      // },
      // {
      //     test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/octet-stream'
      // },
      // {
      //     test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'
      // }

    ]
  },
  postcss: function (webpack) {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-url")(),
      require("postcss-cssnext")({
        features: {
          nesting: true,
          customMedia: true,
          colorHexAlpha: true,
          colorRgba: true,
          mediaQueriesRange: true
        }
      })
    ];
  }
};
