let path = require('path');
let webpack = require('webpack');
module.exports = {
  mode:'development',
  entry:{
    // test:'./src/test.js'
    //打包的是react
    react:['react','react-dom']
  },
  output:{
    // filename:'[name].js',
    // path: path.resolve(__dirname,'dist'),
    // //给当前的输出的结果加上名字,接收结果的变量
    // library:'ab',
    // //把当前的结果放到export属性上,exports["ab"] = 可以在node中使用
    // // libraryTarget:'commonjs',
    // //统一资源模块
    // // libraryTarget:'umd',
    // libraryTarget:'var'
    filename:'_dll_[name].js',
    path:path.resolve(__dirname,'dist'),
    library:'_dll_[name]'
  },
  //定义成动态连接库
  plugins:[
    new webpack.DllPlugin({
      //name必须和library同名
      name:'_dll_[name]',
      //manifest.json相当于一个任务清单
      path:path.resolve(__dirname,'dist','manifest.json')
    })
  ]
}