// let button = document.createElement('button'); 
// button.innerHTML = 'hello'; 
// button.addEventListener('click', function() {
// // console.log('click');

// //es6草案语法

// import('./source').then((data) =>  {//jsonp 实现动态加载,打包失败,提示add @babel/plugin-syntax-dynamic-import
// console.log(data.default); 
// })
// }); 



// document.body.appendChild(button); 



import str from './source.js';
console.log(str);

if(module.hot){
  //如果不写下面这个,当source.js里的代码更新时,会把页面整个刷新一次
  //写下面这个意义在于,监听source.js文件,当需要热更新时,只刷新source.js文件
  module.hot.accept('./source',()=>{
    let str = require('./source');
    console.log(str)
  })
}