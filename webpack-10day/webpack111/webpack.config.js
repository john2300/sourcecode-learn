let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
// 注意这里MiniCssExtractPlugin只有一个,抽离出的css文件也只有一个
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let webpack = require('webpack');
module.exports = {
  // 优化项,生产模式
  // optimization:{
  //   minimizer:[
  //     //使用了这个插件,js在生产环境下,
  //     //压缩没有生效,需要uglifyjs-webpack-plugin配合
  //     new UglifyJsPlugin({
  //       //是否缓存
  //       cache:true,
  //       //是否并发打包,一起压缩多个
  //       parallel:true,
  //       //针对es6转es5的??具体不清楚
  //       sourceMap:true
  //     }),
  //     new OptimizeCss()
  //   ]
  // },
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
  mode: 'development',
  entry: './src/index.js',
  output: {
    // 路径是一个绝对路径
    path: path.resolve(__dirname, 'build'),
    // 针对开发打包,增加hash戳防止覆盖以前的打包文件
    filename: 'bundle.[hash:8].js',
  // filename:'bundle.js'

    //在输出的文件名上统一加上路径,比如打包好后,统一加好服务器的路径,是所有的文件引入都加上,但是实际中可能只有图片需要加上,其他不需要在cdn上,在图片输出的地方,单独加上一个publicPath
    // publicPath:'http://www.baidu.com'
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
    // 将css文件抽离出html文件,独立到一个css文件里
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    //既然注入了，也就可以不引入jquery模块，不管是script标签引入，还是模块引入
    // new webpack.ProvidePlugin({
    //   //在每个模块中都注入$
    //   $:'jquery'
    // })

  ],
  //如果我们想引用一个库，但是又不想让webpack打包
  externals:{
    jquery:'$'
  },
  // 模块
  module: {
    rules: [
      //针对html中的img标签
      {
        test:/\.html$/,
        use:'html-withimg-loader'
      },

      {
        test:/\.(png|jpg|gif)/,
        //做一个限制,当图片小于多少k时,用base64转化url-loader产出,大于时用file-loader产出 
        use:{
          loader:'url-loader',
          options:{
            limit:1,
            //输出的图片放到一个路径下
            outputPath:'/img/',
            //实际中可能只有图片需要加上,其他不需要在cdn上,在图片输出的地方,单独加上一个publicPath
            publicPath:'http://www.baidu.com'
          }
        }
        //处理css中的图片资源时，我们常用的两种loader是file-loader或者url-loader，两者的主要差异在于。url-loader可以设置图片大小限制，当图片超过限制时，其表现行为等同于file-loader，而当图片不超过限制时，则会将图片以base64的形式打包进css文件，以减少请求次数。
        // use:'file-loader'
      },
      // 检验
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       // 强制在前面执行,无视loader默认的从下网上
      //       // test:/\.js$/相同在前面执行
      //       // post 在后执行
      //       enforce: 'pre'
      //     }
      //   }
      // },
      //------------
      // {
      //   //针对内联loader,在webpack.config.js里配置
      //
      //   test:require.resolve('jquery'),
      //   //把jquery暴露成$,并且暴露在全局上
      //   use:'expose-loader?$'
      // },
      //---------------
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 预设,会调用@babel/preset-env模块
            // 处理es6文件
            presets: [
              '@babel/preset-env'
            ],
            // es7以后
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        // 排除掉node_modules下的js文件
        exclude: /node_modules/
      },
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
          // html里的css抽离出来,同样也要把js文件引入
          // 的css文件抽离出去,用MiniCssExtractPlugin
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        // 处理less文件
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
          // post-loader,先打上前缀,再css-loader
          'postcss-loader',
          // 把less转换为css,注意先转换再css-loader
          // 注意需要安装less和less-loader两个包
          'less-loader'
        ]
      }
    ]
  }
}
