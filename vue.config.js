// 打包 使用gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css'];

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    if (process.env.npm_lifecycle_event === 'analyze') {
      config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
        threshold: 10240, // 对超过10K的数据进行压缩
        minRatio: 0.8, // 极小比
      }),
    ]
  },
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
    hotOnly: false,
    open: true,
    proxy: {
      '/api': {
        target: 'http://172.16.1.208:9000',
        changeOrigin: true,
        pathRewrite: {}
      }
    }
  },
}