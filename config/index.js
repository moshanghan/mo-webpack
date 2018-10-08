const path = require('path')
const env = process.env.NODE_ENV || 'production';


module.exports = {
    build: {
        env: env,
        index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的 index.html 文件
        assetsRoot: path.resolve(__dirname, '../dist/' ), // 编译输出的静态资源路径
        assetsSubDirectory: 'static', // 编译输出的二级目录
        // assetsPublicPath: 'http://alicdn.avicare.cn/webresources/',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        assetsPublicPath: './', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        // assetsPublicPath: '//alicdn.avicare.cn/webresources/app/20180615V1/', // 每次打包一定要修改 20170930V1这个目录
        // assetsPublicPath: '/oldAifuke/web_wechat_ui/shop/dist/',
        productionSourceMap: true, // 是否开启 cssSourceMap
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false, // 是否开启 gzip
        productionGzipExtensions: ['js', 'css'], // 需要使用 gzip 压缩的文件扩展名
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: env,
        port: 2222,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // proxyTable: {
        //     '/api': {  //将www.exaple.com印射为/apis
        //         target: 'https://dev.avicare.cn', // 接口域名
        //         changeOrigin: true, //是否跨域
        //         pathRewrite: {
        //           '^/api': ''  //需要rewrite的,
        //         }   
        //       }
        // },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}