// import jquery from 'jquery';
 
// //webpack会先找到入口,有引入模块jquery,再加载jquery模块,分析有没有其他的依赖,拿到这些依赖再去打包,jquery是没有其他的依赖的,可以配置noParse进行优化


// import moment from 'moment';
// // moment.locale('zh-cn');
// //这里打包出来非常大有1.2M,只想引入其中的中文包,但是却把所有的依赖都打包进来,需要用到webpack的内置插件webpack.IgnorePlugin,但是这里设置为忽略所有的locale,需要手动引入locale中文包
// //手动引入中文包
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
// let r = moment().endOf('day').fromNow();
// console.log(r);

//-------------------------------
//

import React from 'react';
import {render} from 'react-dom';

render(
  <h1>jsx</h1>,window.root
)

//打包出来文件特别大
//解决思路是先把react和react-dom抽离出去,打包的时候就不打包这两个文件
//办法先独立对react和react-dom进行打包,建立新的配置文件webpack.config.react.js,在开发的时候再打包其他的