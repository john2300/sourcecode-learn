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
  // mode:'production',
  entry:{
    home:'./src/index.js'
  },
  //解析第三方包
  resolve:{
    //查找包路径设置,不会再往上查找
    modules:[path.resolve('node_modules')],
    //别名,便于把长的模块名写成短的别名,优雅啊
    alias:{
      bootstrap:'bootstrap/dist/css/bootstrap.css'
    },
    //主入口的字段,就是第三方模块package.json里的字段
    //先找style,找不到再找main
    // mainFields:['style','main']

    //入口文件的名字,默认index.js
    // mainFiles:[]
    
    //强制打上扩展名,查找模块,比如import './index.css',有时候不写.css后缀,webpack打包没办法找到,默认是加上.js

    extensions:['.js','.css','.json']
  },
  devServer:{
    port:8080,
    progress:true,
    contentBase:'./dist',
    compress:true,

    //有服务器,不用代理来处理,在服务器启动webpack,端口用服务器的接口

    // //devServer还提供一个before钩子函数,模拟数据请求,不需要跨域

    // before(app){
    //   app.get('/user',(req,res)=>{
    //     res.json({name:'珠峰before'});
    //   })
    // }

    // //配置代理,解决跨域模拟数据请求
    // proxy:{
    //   // '/api':'http://localhost:3000'
    //   '/api':{
    //     target:'http://localhost:3000',
    //     pathRewrite:{'/api':''}
    //   }
    // }
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
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
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
    new webpack.BannerPlugin('make 2019 by john'),
    //定义环境变量,但是这样子区分开发环境和生产环境不是太好,因为每次都需要手动改,一般配置文件名为 webpack.prod.js和webpack.dev.js,webpack.base.js这三个,分别运行,需要插件webpack-merge来分别管理
    // new webpack.DefinePlugin({
    //   DEV:JSON.stringify('production')
    // })
  ]
}