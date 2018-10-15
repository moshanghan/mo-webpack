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
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
  entry: ["babel-polyfill", './src/main.js'],
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
    // minimize: true,
    minimizer: [
      // new UglifyJsPlugin({}),
      // new OptimizeCSSAssetsPlugin({})
      // 自定义js优化配置，将会覆盖默认配置
      new UglifyJsPlugin({
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false,
        extractComments: false, // 移除注释
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
      // 用于优化css文件
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: {
            disable: true
          }, // 这里是个大坑，稍后会提到
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true
      })
    ],
    runtimeChunk: true,
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
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // 可以通过.babelrc中的配置取代options
          // options: {
          //   presets: ['@babel/preset-env'],
          //   plugins: ['@babel/plugin-transform-runtime']
          // }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
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