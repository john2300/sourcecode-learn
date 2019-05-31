// console.log('home1111www12222');

// class Log{
//   constructor(){
//     console.lo('出错了')
//   }
// }

// let log = new Log();
//引用bootstrap会报错,这里只需要引入样式,boostrap有很多依赖,但是写这么长一串不太优雅,可以在resolve里配置一下

import 'bootstrap'

//配置代理解决跨域
let xhr = new XMLHttpRequest();

xhr.open('GET','/user',true);

xhr.onload = function(){
  console.log(xhr.response);
}
xhr.send();