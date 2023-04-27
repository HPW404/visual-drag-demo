const CompressionPlugin = require('compression-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: isProd ? '/visual-drag-demo/' : './',
    configureWebpack: () => {
        if (isProd) {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
                        threshold: 10240, // 归档需要进行压缩的文件大小最小值，这个对 10K 以上的进行压缩
                        deleteOriginalAssets: false, // 是否删除原文件
                    }),
                ],
            }
        }
    },
    devServer: {
        open: true, // 是否自动弹出浏览器页面
        host: 'localhost', 
        port: '8080',
        https: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3001/api', // API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
}
