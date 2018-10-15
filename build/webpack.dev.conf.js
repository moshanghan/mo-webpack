// const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack');
// 自动打开浏览器，使用webpack-dev-server 指令可以直接
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');


function resolveApp(relativePath) {
  return path.resolve(relativePath);
}
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: './src/main.js',
  },

  output: {
    path: __dirname + "/build",
    filename: "[name].[hash].js"
  },
  // module: merge({}, baseWebpackConfig.module),
  resolve: merge({}, baseWebpackConfig.resolve),

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // include: [resolve('src'), resolve('test')],
        include: path.resolve(__dirname, 'src')
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     // name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // },
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      //   }
      // },
    ]
  },
  optimization: {
    minimize:false,
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
  // "start": "cross-env NODE_ENV=development webpack-dev-server --port 30303 --open  --devtool eval --progress --colors --hot --inline --content-base --config build/webpack.dev.conf.js",
  devServer: {
    // 指定启动服务的更目录
    contentBase: __dirname + '/src',
    // 指定端口号
    port: 3003,
    host: 'localhost',
    // 启用热更新
    hot: true,
    open:true,
    inline:true,
    // 以下信息可有可无，为了完整
    // inline: true,
    // historyApiFallback: true,
    // noInfo: false,
    // disableHostCheck:true,
    // stats: 'minimal',
    // publicPath: publicPath
  },
  // resolve: {
  //   extensions: ['.js', '.vue', '.json']
  // },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: resolveApp('favicon.ico'),
    }),
    // new webpack.HotModuleReplacementPlugin(), //热加载插件
    // new webpack.optimize.OccurrenceOrderPlugin(), // 为组件分配ID，通过这个插件Webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new VueLoaderPlugin(),
    // --hot 可以在启动时添加，方便
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new OpenBrowserPlugin({ url: 'http://localhost:3003' })
  ],
}
