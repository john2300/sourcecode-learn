let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin');
let copyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');
//小插件cleanWebpackPlugin 第三方
//打包的时候,有可能文件名不一样了,多余的文件会堆积到打包文件目录,这个插件可以在打包之前把以前的文件夹先删除了,创建一个新的打包目录

//copWebpackPlugib 第三方
//bannerPlugin 内置 版权声明

module.exports = {
  mode:'production',
  entry:{
    home:'./src/index.js'
  },
  devServer:{
    port:3000,
    progress:true,
    contentBase:'./dist',
    compress:true
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        }
      },
    ]
  },
  //文件变化,立马打包
  watch:true,
  //监控的选项
  watchOptions:{
    //每秒监控1000次
    poll:1000,
    //防抖,500毫秒以后输入的代码只打包一次
    aggregateTimeout:500,
    //忽略node_modules文件夹下的文件
    ignored:/node_modules/
  },
  output:{
    filename:'[name].js',
    path: path.resolve(__dirname,'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html',
      filename:'index.html'
    }),
    new cleanWebpackPlugin(),
    new copyWebpackPlugin([
      {
        from:'./doc',to:'./'
      }
    ]),
    new webpack.BannerPlugin('make 2019 by john')
  ]
}