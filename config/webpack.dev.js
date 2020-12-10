
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const paths = require('./paths')
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const {HotModuleReplacementPlugin, DefinePlugin} = require('webpack') 
const env = require('./dev.env.js')

module.exports = merge(base, {
   mode : 'development',
   devtool: 'eval-source-map',
   cache: true,
   devServer: {
     compress: true,          //生成文件压缩
     clientLogLevel: 'none',  //关闭日志
     contentBase: paths.output,
     hot: true,
     watchOptions : {
       ignored: ignoredFiles(paths.src)
     },
     host : process.env.HOST || 'ruyi.com',
     overlay: false,
     open: true,
     port: 9002,
     inline: true,
     progress: true,
   },
   plugins: [
      new DefinePlugin({
        'process.env': env
      }),
      new HotModuleReplacementPlugin(),
   ],
   performance: {
     hints : false
   },
})