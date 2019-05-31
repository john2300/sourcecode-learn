let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let copyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    // other: './src/other.js'
  },
  resolve: {
    modules: [path.resolve('node_modules')],
    extensions: ['.js', '.css', '.json']
  },
  devServer: {
    hot:true,//热更新
    port: 8080,
    progress: true,
    contentBase: './dist',
    compress: true,
    open: true

  },
  module: {
    // 不解析jquery模块,因为jquery没有其他的模块
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        // 排除
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            //解析es6草案的import 草案语法
            plugins:['@babel/plugin-syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // 文件变化,立马打包
  watch: true,
  // 监控的选项
  watchOptions: {
    // 每秒监控1000次
    poll: 1000,
    // 防抖,500毫秒以后输入的代码只打包一次
    aggregateTimeout: 500,
    // 忽略node_modules文件夹下的文件
    ignored: /node_modules/
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // 引用动态连接库
    // new webpack.DllReferencePlugin({
    //   // 在manifest里查找任务,没有再打包React和React-dom
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    // }),
    // 从moment模块中引入./locale,就把这个./locale忽略掉
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new cleanWebpackPlugin(),
    // new copyWebpackPlugin([
    //   {
    //     from: './doc',to: './'
    //   }
    // ]),
    new webpack.BannerPlugin('make 2019 by john'),
  // 定义环境变量,但是这样子区分开发环境和生产环境不是太好,因为每次都需要手动改,一般配置文件名为 webpack.prod.js和webpack.dev.js,webpack.base.js这三个,分别运行,需要插件webpack-merge来分别管理
  // new webpack.DefinePlugin({
  //   DEV:JSON.stringify('production')
  // })
  new webpack.NamedChunksPlugin(),//哪个模块热更新了
  new webpack.HashedModuleIdsPlugin()//热更新插件
  ]
}
