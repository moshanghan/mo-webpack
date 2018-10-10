const path = require('path')
const BaseConfig = require('./webpack.base.conf.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('../config')
const utils = require('./utils')
// 删除
const CleanPlugin = require('clean-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

console.log(`当前环境：${process.env.NODE_ENV}`)
// 查找根目录的上级目录
const myPath = path.resolve(__dirname, '..')
const cleanOptions = {
  root: myPath, //根目录
  verbose: true, //开启在控制台输出信息
}

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
    minimizer: [
      new UglifyJsPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
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
  // babel: {
  //   babelrc: false,
  //   presets: [
  //     ['es2015'],
  //   ],
  // },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "css-loader",
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
          {
            loader: "less-loader",
            options: {
              minimize: true
            }
          },
          // "less-loader"
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [path.join(__dirname, '..','src')]
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
    // 删除文件夹的插件
    new CleanPlugin(['dist'], cleanOptions),
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
      // filename: "[name].css",
      // chunkFilename: "[id].css"
      filename: utils.assetsPath('css/[name].[chunkhash].css'),
      chunkFilename: utils.assetsPath('css/[id].[chunkhash].css')
    }),

  ]
}