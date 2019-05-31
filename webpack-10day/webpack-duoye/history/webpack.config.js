let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode:'development',
  //多入口,写成一个对象
  entry:{
    home:'./src/index.js',
    other:'./src/other.js'
  },
  //两个出口
  output:{
    // filename:'bundle.js',
    //多个出口,[name]代表home或者other,分别打包一次
    filename:'[name].js',
    path: path.resolve(__dirname,'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html',
      filename:'home.html',
      //代码块放home ,home.html引入home.js
      chunks:['home']
    }),
    new HtmlWebpackPlugin({
      template:'./index.html',
      filename:'other.html',
      //other.html引入other.js,再需要home,就再写一个home 
      chunks:['other']
    })
  ]
}