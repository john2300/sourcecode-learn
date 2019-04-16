 let a = xxx;变量不会挂载到global上,因为在每个node模块里,写的代码都会隐藏式包裹在js闭包中.

 通过设置process.env.NODE_ENV=xxxx,设置开发或者生产环境,注意是在命令行中

 setTimeout((..args)=>{
   //用剩余运算符(在形参中),把参数存在args里
   //另外,用箭头函数的原因是this
  console.log(args.length)
 },100,'吃蛋','吃饭')


 每个模块里

 (function()){
   module.exports = exports = this = {};

  //代码
  exports = fn;//这是不行的,因为exports和module.exports虽然是指向同一个引用,改变引用里的内容两者会同时改变,但是不能改引用本身

  一般导出用
  module.exports = fn;(导入该模块,引用fn时不用.符号)
  或者
  exports.xxx = fn;(导入该模块时,引用fn用.)符号

   return module.exports;
 }()


 把一个函数promise化:let read = util.promisify(fs.readFile);




 function copy(source,target,callback){
  fs.readFile(source,(err,data)=>{
    if(err) return callback(err);
    //fs.writeFile如果有错误会自动执行callback,不需要单独调用
    fs.writeFile(target,data,callback);
  });
}

copy('./test.txt','./test.txt',function(){
  console.log('读取写入文件成功');
});



// 模拟EventEmitter
class EventEmitter {
  constructor () {
    this._events = {}
  }
  on (event, callback) {
    if (this._events[event]) {
      this._events[event].push(callback)
    }else {
      this._events[event] = [callback]
    }
  }
  emit (event) {
    this._events[event].forEach(cb => cb())
  }
  removeListener (event, callback) {
    if (this._events[event]) {
      this._events[event] = this._events[event].filter(cb => cb != callback);
    }
  }
  once(event,callback){
    // this._events[event] = this._events[event].filter(cb => cb != callback);
    // callback();
    let fn = ()=>{
      callback();
      this.removeListener(event,fn);
    };
    this.on(event,fn);
    // this.on(event,callback);
    // callback();
    // this.removeListener(event,callback);
  }
}

let e = new EventEmitter()
let fn1 = function () {
  console.log('on ni1')
}
let fn2 = function () {
  console.log('on ni2')
}
// e.on('ni', fn1);
// e.on('ni', fn2);
// e.removeListener('ni', fn1);
e.once('ni',fn1);
e.emit('ni');
e.emit('ni');

let fs = require('fs');
let arr = [];
let rs = fs.createReadStream('./12.js',{highWaterMark:64});
rs.on('data',function(chunk){
  arr.push(chunk);
  rs.pause();
  setTimeout(function(){
    rs.resume();
  },1000)
});

rs.on('end',function(){
  console.log(Buffer.concat(arr).toString())
});
rs.on('err',function(err){
  console.log(err);
})


//模拟pipe
function pipe(source,target){
  let rs = fs.createReadStream(source,{highWaterMark:4});
  let ws = fs.createWriteStream(target,{highWaterMark:1});

  rs.on('data',function(chunk){
    if(ws.write(chunk) === false){
      rs.pause();
    }
  });
  ws.on('drain',function(){
    rs.resume();
  })
}
pipe('1.txt','2.txt');


const http = require('http');
let port = 'http:localhost:8080';
http.createServer((req,res)=>{
  //req代表的是客户端,他是一个可读流
  //res代表的是服务端,他是一个可写流

  res.setHeader('Content-Type','text/plain;charset=utf8');
  res.end('你好');
}).listen(port,()=>{
  console.log('服务器已经启动');
});