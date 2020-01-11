const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    aboutPage: './src/js/aboutPage.js',
    startOfSalesPage: './src/js/startOfSalesPage.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3001,
    hot: true,
    open: true,
    clientLogLevel: 'silent',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ],
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{
          loader: 'url-loader',
        }],
      },
      {
        test: /\.(svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
          publicPath: '../',
        },
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.scss',
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'About',
      filename: 'index.html',
      template: './src/html/about.html',
      hash: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Start of sales',
      filename: 'startOfSales.html',
      template: './src/html/startOfSales.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
};

module.exports = config;
