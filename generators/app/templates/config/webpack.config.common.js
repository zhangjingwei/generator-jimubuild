"use strict";
const webpack = require('webpack');
const path = require('path')

// 恢复到工程目录
__dirname = path.resolve(__dirname, '..')

// webpack-dev-server 配置
const devServer = {
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    noInfo: false,
    https: true,
    proxy: {
      changeOrigin: true
    }
  }

module.exports = {
    moduleWebpack:{
      rules: [
        {
          test:  [/\.js$/, /\.jsx$/, /\.es6$/],
          include: [
            path.resolve(__dirname, 'src'),
          ],
          use: [{
            loader: "babel-loader?cacheDirectory=true",
          }],
        },
        {
          test: /\.css$/,
          include: [
            path.resolve(__dirname, 'styles'),
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src')
          ],
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.less$/,
          include: [
            path.resolve(__dirname, 'styles'),
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src')
          ],
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)\w*/,
          include:[
            path.resolve(__dirname, 'styles'),
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'src')
          ],
          use: [{
            loader: "file-loader"
          }]
        },
        {
          test: /\.(png|jpg|gif)$/,
          include:[
            path.resolve(__dirname, 'styles'),
            path.resolve(__dirname, 'images'),
            path.resolve(__dirname, 'node_modules')
          ],
          use:[{
            loader: "url-loader?limit=300000"
          }]
        },
      ]
    },
    resolveWebpack: {
      alias: {
        Images: path.resolve(__dirname, 'images/'),
        Style: path.resolve(__dirname, 'styles/'),
        Components: path.resolve(__dirname, 'src/components/'),
        Actions: path.resolve(__dirname, 'src/actions/'),
        ActionsX: path.resolve(__dirname, 'src/actions/x/'),
        Reducers: path.resolve(__dirname, 'src/reducers/'),
        Libs: path.resolve(__dirname, 'src/lib/'),
      },
      extensions: ['.js', '.jsx', '.es6'],
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    devServerWebpack: devServer
}
