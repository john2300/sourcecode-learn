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
  //源码映射,会单独生成一个sourcemap文件
  //错误了会标识当前报错的列和行
  //1.source-map
  // devtool:'source-map',
  //2.不会产生单独的文件,但是可以显示行和列,因为集成到文件中
  // devtool:'eval-source-map',
  //3.不会产生列,但是会有一个单独的映射文件
  devtool:'cheap-module-source-map',
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