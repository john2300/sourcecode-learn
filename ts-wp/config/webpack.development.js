console.log("开发坏境");
const { join } = require("path");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports={
  devServer:{
    //前端假路由运行的必须一步,变成真路由
    historyApiFallback:true,
    contentBase:join(__dirname,"../dist"),
    hot:true
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
}