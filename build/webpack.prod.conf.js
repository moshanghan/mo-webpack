// var path = require('path')
var BaseConfig = require('./webpack.base.conf.js')
var merge = require('webpack-merge')
var webpack = require('webpack')
var config = require('../config')
const utils = require('./utils')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

console.log(`当前环境：${process.env.NODE_ENV}`)


module.exports = {
  devtool: false,
  mode: "production",
  entry: {
    app: './src/main.js'
  },
  // 指定项目构建的输出位置
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'bundle.js',
    // // 为了做代码的异步加载
    // publicPath: '/',
    // // 分块名称设置
    // chunkFilename: '[name]_[chunkhash:8]_chunk.js'
  },
  optimization: {
    minimize: true,
    runtimeChunk: false,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /vue-preview.src.*?js$/,
        loader: 'babel'
      }

    ]
  },
  externals: merge({}, BaseConfig.externals),
  resolve: merge({}, BaseConfig.resolve),
  plugins: [
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      // template: './src/template.html',
      // inject: true,
      hash: true,
      minify: {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        preventAttributesEscaping: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeOptionalTags: false, // by niugm 20180725 若开启此项，生成的html中没有 body 和 head，html也未闭合
        removeRedundantAttributes: true, // 开启后 类似<input type="text" />会被压缩成 <input />
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),

    // 在构建的过程中删除警告
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      }
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}