const path = require('path');
const entryOptionPlugin = require('./src/plugins/entry-option-plugin');
module.exports = {
  entry:'./src/index.js',
  output:{
    path:path.resolve('dist'),
    filename:'bundle.js',
    //可以写个域名,作用是在打包后的文件路径前加入该域名
    publicPath:'http://img.zhufeng.cn'
  },
  resolveLoaders:{
    modules:'./src/loaders'
  },
  module:{
    rules:[
      {
        test:/\.less$/,
        loader:['style-loader','less-loader']
      }
    ]
  },
  plugins:[
    new entryOptionPlugin()
  ]
}