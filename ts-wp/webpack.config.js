/**
 * 打印的是苹果 [ '/usr/bin/node',
  '/home/john/Desktop/sourcecode-learn/ts-wp/node_modules/.bin/webpack',
  '--mode',
  'development' ]
 *  */
// console.log("苹果",process.argv)

// yargs-parser是命令行解析器.看文档有--xx yy的地方,会自动解析为{}里的xx:yy形式,其他的功能未知
// 另外require("yargs-parser")(process.argv.slice(2)).mode;和require("yargs-parser")(process.argv.slice()).mode的结果都是一样的
const argv = require('yargs-parser')(process.argv.slice(2))
// console.log(argv.mode)
// 定义一个模式的私有变量,
const _mode = argv.mode || 'development'
console.log(_mode)
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const merge = require('webpack-merge')
const { CheckerPlugin } = require('awesome-typescript-loader')
const { join, resolve } = require('path')

const webpackConfig = {
  entry: {
    app: resolve('./src/web/index.tsx')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: [resolve("src")],
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
}
module.exports = merge(webpackConfig,_mergeConfig)
