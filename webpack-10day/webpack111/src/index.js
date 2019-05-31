//webpack打包图片
//1.在js中创建图片来引入
//-----------
// let image = new Image();
//只是一个普通的字符串，打包后的没有logo.png这个文件
// image.src = './logo.png';
// document.body.appendChild(image);
//--------
//引入logo.png,返回的结果是一个新的图片地址,由于内部可能有很多变量logo,为了避免变量冲突,会被打上hash戳,但是还是无法解析'./logo.png',需要file-loader,默认会在内部生成一张图片,到打包文件夹下,并且把生成的图片名字返回回来

import './index.css';
import logo from './logo.png';
console.log(logo);
let image = new Image();
image.src = logo
document.body.appendChild(image);
//2.在css引入background('url'),相当于require('./logo.png')

//3.<img src="">,找不到这个图片,需要插件:html-withimg-loader,解析html编译图片,要配置

//有时候,html里的图片非常小,希望别发html请求,变成base64,需要url-loader,配置
// console.log('heee');

//-----------------------------
//把jquery暴露成$,并且暴露在全局上

// import $ from 'expose-loader?$!jquery';
//jquery的$会挂载到window上,但是打包后的$
//不会挂载到window上,需要把$暴露给window
//需要插件:expose-loader,暴露全局的loader,属于内联的loader

//还可以在webpack.config.js里配置
// import $ from 'jquery';
// console.log(window.$);

//写$直接输出window.$,需要在每个模块中注入 $对象
//需要插件:webpack,在webpack.config.js里配置
//由于这里每个模块被注入了$对象，这里不需要再引入jquery模块
//不过任然不能打印出window.$
//在index.html里引入<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>，可以拿到全局的$，不过这里再import $ from 'jquery'；写$直接是window上的$,这样写会直接打包，相当于多引入了一个jquery模块,打包后文件非常大，webpack.config.js配置externals，打包后显著减少，并没有真正引入jquery，便于分析语义
// import $ from 'jquery';
// console.log(window.$);

//引入第三方模块的全局变量总结
//1.expose-loader 暴露到window上
//2.providePlugin给每个人提供一个$
//3.用script标签引入，并且不能再模块引入

//--------------------
// require('./index.css');
// require('./index.less')

// require('./a.js');

// let fn = () => {
//   console.log('log');
// }

// fn();

// //es7语法
// class A{
//   a = 1;
// }