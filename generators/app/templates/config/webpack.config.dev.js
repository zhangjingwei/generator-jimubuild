// "use strict";
const webpack = require('webpack');
const path = require('path')

// html 生成
const HtmlWebpackPlugin = require('html-webpack-plugin')

// css自动填充
let autoprefixer = require('autoprefixer');
let precss = require('precss')

// 告别无聊的输出
const DashboardPlugin = require('webpack-dashboard/plugin')

// 公共模块加载
let  { moduleWebpack, resolveWebpack,  devServerWebpack } = require('./webpack.config.common.js')

// 返回到当前工程目录
__dirname = path.resolve(__dirname, '..')


module.exports = {
  devtool: 'cheap-module-source-map',//生成map文件
  context: path.resolve(__dirname, "src"),
  entry: {
    'main': './index',
  },
  output: {
    filename: 'dist/[name].js',
    chunkFilename: "dist/[id].[name].js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: moduleWebpack,
  resolve: resolveWebpack,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [precss, autoprefixer];
        }
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      title: '主页',
      template: './index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  devServer: devServerWebpack
}
