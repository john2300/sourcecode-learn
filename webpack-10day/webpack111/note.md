配置文件名不是webpack.config.js时,自定为webpack.config.my.js,命令行输入npx webpack --conifg webpack.config.my.js

当自定义配置文件名太长时,可以在package.json里设置相应的脚本,

  "scripts": {
    "bulid":"webpack --config webpack.config.my.js"
  },


打包后需要通过localhost:xxx的方式来访问打包后的文件,而不是双击html文件,安装插件webpack-dev-server -D

运行npx webpack-dev-server,输入相应的地址,浏览器显示相应的文件目录映射,要让浏览器直接进入打包后文件夹,需要在exports里加脚本:


打包css文件,不能在html直接引入css文件,因为如果引入在html文件里,打包html的插件不会识别css文件并且正确引入css,在js里引入css,require('index.css')需要配置css模块

插件:mini-css-extract-plugin,将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap.但是独立出来的css文件没有压缩,需要插件:optimize-css-assets-webpack-plugin

插件:postcss-loader,自动加上css前缀,autoprefixer解析CSS前缀,postcss-loader需要配置文件postcss.config.js

插件:@babel/plugin-proposal-class-properties

class B{}语句打包转义后,打包文件内的_classCallCheck(instance, Constructor){}函数是可以公用的,没有被提取出来公用

function *gen(params){
  yield 1;
}
console.log(gen().next());
Uncaught ReferenceError: regeneratorRuntime is not defined
这个也没办法转换,需要插件@babel/plugin-transform-runtime,@babel/runtime安装在生产环境里,需要引入@babel/runtime不?????


//es7语法
//实例上的方法都不会去解析
'aaa'.includes('a'),用插件:@babel/polyfill,安装在生产环境中,打包出来的代码Array.prototype.includes

检验工具eslint,插件eslint eslint-loader