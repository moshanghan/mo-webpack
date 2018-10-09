const path = require('path')
const env = process.env.NODE_ENV || 'production';


module.exports = {
    build: {
        env: env,
        index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的 index.html 文件
        assetsRoot: path.resolve(__dirname, '../dist/' ), // 编译输出的静态资源路径
        assetsSubDirectory: 'static', // 编译输出的二级目录
        assetsPublicPath: './', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名

    },
    dev: {
        env: env,
        port: 2222,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
    }
}