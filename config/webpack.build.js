
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const env = require('./build.env.js')
const { DefinePlugin } = require('webpack') 
const env = require('./dev.env.js')

module.exports = merge(base, {
   plugins: [
     new DefinePlugin({
        'process.env': env
      }),
   ],
   optimization:{
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // 如果在生产环境中使用 source-maps，必须设置为 true
      }),
    ],
  },
   performance: {
     hints : false
   },
})
