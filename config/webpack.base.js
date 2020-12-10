const paths = require('./paths')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')                //浏览器前缀处理
const HtmlWebpackPlugin = require('html-webpack-plugin')    //生成html
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const env = process.env.NODE_ENV === 'production' ? false : true

module.exports = {
  entry: {
    app: paths.entry
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: paths.output
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: { }
  },
  module: {
    rules:[
      {
        test: /\.tsx?$/,
        include: paths.src,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        include: paths.src,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.(jpe?g|png)$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'image/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders : 1
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
               plugins: ()=>[
                 require('postcss-loader'),
                 autoprefixer({
                   browsers: [
                     '>1%',
                     'Firefox ESR',
                     'not ie < 9',
                   ],
                   flexbox: 'no-2009',
                 })
               ]
            }
          }
        ]
      },
      {
        exclude: [/\.(js|jsx|mjs|tsx|ts)$/, /\.html$/, /\.json$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'media/[name].[hash:8].[ext]',
        }
      }
    ]
  },
  plugins: [
     new HtmlWebpackPlugin({
       template: paths.html,
       cache: true,
       favicon: paths.ico
     }),
     new HardSourceWebpackPlugin(),
     new ForkTsCheckerWebpackPlugin({
       typescript: {
          configFile: paths.tsConfig
       }
     })
  ]
}