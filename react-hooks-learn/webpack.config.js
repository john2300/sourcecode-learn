const {join,resolve} = require('path');
// const
module.exports = {
  devServer:{
    //前端假路由运行的必须一步,变成真路由
    historyApiFallback:true,
    contentBase:join(__dirname,"/dist"),
    hot:true
  },
  //错了半天,结果是这里,没有扩展,引入包的地址不写全,指定.xx的文件,就写到文件夹,不会去分析的,默认js>json两种
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  entry:'./src/web/index.js',
  module:{
    rules:[
      {
        test:/\.(jsx|js)$/,
        exclude: /node_modules/,
        include: [resolve("src")],
        loader:'babel-loader'
      }
    ]
  }
}