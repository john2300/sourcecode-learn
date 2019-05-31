let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
//注意这里MiniCssExtractPlugin只有一个,抽离出的css文件也只有一个
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  //优化项
  optimization:{
    minimizer:[
      //使用了这个插件,js在生产环境下,
      //压缩没有生效,需要uglifyjs-webpack-plugin配合
      new UglifyJsPlugin({
        //是否缓存
        cache:true,
        //是否并发打包,一起压缩多个
        parallel:true,
        //针对es6转es5的??具体不清楚
        sourceMap:true
      }),
      new OptimizeCss()
    ]
  },
  devServer: {
    // 开发服务器配置
    // 自定义端口号
    port: 3000,
    // 显示进度条
    progress: true,
    // 指定服务器服务路径
    contentBase: './build',
    // 开启压缩
    compress: true

  // 这个开发服务器,在运行的时候,会自动打包好文件到内存中,并且能在localhost:xxx访问到打包后文件夹
  // 但是这个文件夹里只有js文件,没有html文件,浏览器显示不出来打包后效果,需要插件 html-webpack-plugin 打包html\文件
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    // 路径是一个绝对路径
    path: path.resolve(__dirname, 'build'),
    // 针对开发打包,增加hash戳防止覆盖以前的打包文件
    filename: 'bundle.[hash:8].js'
    // filename:'bundle.js'
  },
  // 数组,存放所有的webpack插件
  plugins: [
    new HtmlWebpackPlugin({
      // 打包后的html文件以什么作为模板
      template: './src/index.html',
      // 打包后的文件名
      filename: 'index.html',
      // html压缩
      minify: {
        // 去除html标签上的双引号
        removeAttributeQuotes: true,
        // 折叠空行,变成一行
        collapseWhitespace: true
      },
      // 针对缓存,增加hash戳,例如bundle.js?b729df5d52640b4affb5
      hash: true
    }),
    //将css文件抽离出html文件,独立到一个css文件里
    new MiniCssExtractPlugin({
      filename:'main.css'
    })
  ],
  // 模块
  module: {
    rules: [
      // 引入css模块
      // 有时候一个css模块里会引入另外一个css模块
      // 需要把两个css模块变成一个模块,用css-loader处理
      // css-loader负责解析css的特殊语法,例如@import
      // style-loader:把css插入到head标签中
      // loader的用法:默认是从右向左执行,从下到上
      // loader还可以写成对象的方式
      {
        test: /\.css$/,
        use: [
          // {
          //   loader:'style-loader',
          //   options:{
          //     //有时候,需要在html文件里写css,但是引入的css模块会插入到head底部
          //     //会覆盖html文件里的css样式
          //     //将css模块插入到head标签顶部,可以解决
          //     insertAt:'top'
          //   }
          // },
          //html里的css抽离出来,同样也要把js文件引入
          //的css文件抽离出去,用MiniCssExtractPlugin
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        //处理less文件
        test: /\.less$/,
        use: [
          // {
          //   loader:'style-loader',
          //   options:{
          //     insertAt:'top'
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          //post-loader,先打上前缀,再css-loader
          'postcss-loader',
          //把less转换为css,注意先转换再css-loader
          //注意需要安装less和less-loader两个包
          'less-loader'
        ]
      }
    ]
  }
}
