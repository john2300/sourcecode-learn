let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
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
    })
  ]
}