/* eslint no-param-reassign: 0, no-underscore-dangle: 0 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');

const __DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = process.env.NODE_ENV === 'production';

const build_path = path.resolve(__dirname, './dist');

const fixStyleLoader = (loader) => {
  if (__PROD__) {
    const first = loader.use[0];
    const rest = loader.use.slice(1);
    loader.loader = ExtractTextPlugin.extract({ fallback: first, use: rest });
    delete loader.use;
  }
  return loader;
};

module.exports = {
  name: 'client',
  target: 'web',
  devtool: __DEV__ && 'inline-eval-cheap-source-map',
  resolve: {
    modules: [
      './node_modules',
      './src',
    ],
    extensions: ['.jsx', '.js', '.json', '.scss'],
  },
  entry: {
    app: _.compact([
      __PROD__ && 'babel-polyfill',
      __DEV__ && 'webpack-hot-middleware/client',
      './src/styles/main.scss',
      './src/index.jsx',
    ]),
    vendor: [
      'react',
      'react-router',
      'lodash',
    ],
  },
  output: {
    filename: '[name].[hash].js',
    path: build_path,
    publicPath: '/',
  },
  plugins: _.compact([
    __PROD__ && new CleanWebpackPlugin([build_path]),
    new Dotenv({
      path: '.env',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: false,
      },
    }),
    ...(
      __DEV__ ? [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'development'" }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
      ] : [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'production'" }),
        new ExtractTextPlugin({ filename: '[name].[contenthash].css', allChunks: true }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            unused: true,
            dead_code: true,
            warnings: false,
          },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ]
    ),
  ]),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: __DEV__,
        },
      },
      fixStyleLoader({
        test: /\.scss$/i,
        exclude: /styles/,
        use: [
          'style-loader',
          'css-loader?sourceMap&-minimize&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      }),
      fixStyleLoader({
        test: /\.scss$/i,
        include: /styles/,
        use: [
          'style-loader',
          'css-loader?sourceMap&-minimize',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      }),
      {
        test: /\.(graphql|gql)$/i,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
};
