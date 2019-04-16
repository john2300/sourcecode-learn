// import { eventNames } from 'cluster'

// const fs = require('fs')

// function copy(source,target,callback){
//   fs.readFile(source,(err,data)=>{
//     if(err) return callback(err)
//     fs.writeFile(target,data,callback)
//   })
// }

// copy('./test.txt','./test2.txt',function(){
//   console.log('读取写入文件成功')
// })

// // 模拟EventEmitter
// class EventEmitter {
//   constructor () {
//     this._events = {}
//   }
//   on (event, callback) {
//     if (this._events[event]) {
//       this._events[event].push(callback)
//     }else {
//       this._events[event] = [callback]
//     }
//   }
//   emit (event) {
//     this._events[event].forEach(cb => cb())
//   }
//   removeListener (event, callback) {
//     if (this._events[event]) {
//       this._events[event] = this._events[event].filter(cb => cb != callback)
//     }
//   }
//   once(event,callback){
//     // this._events[event] = this._events[event].filter(cb => cb != callback)
//     // callback()
//     let fn = ()=>{
//       callback()
//       this.removeListener(event,fn)
//     }
//     this.on(event,fn)
//     // this.on(event,callback)
//     // callback()
//     // this.removeListener(event,callback)
//   }
// }

// let e = new EventEmitter()
// let fn1 = function () {
//   console.log('on ni1')
// }
// let fn2 = function () {
//   console.log('on ni2')
// }
// // e.on('ni', fn1)
// // e.on('ni', fn2)
// // e.removeListener('ni', fn1)
// e.once('ni',fn1)
// e.emit('ni')
// e.emit('ni')

// let fs = require('fs')
// let arr = []
// let rs = fs.createReadStream('./12.js',{highWaterMark:64})
// rs.on('data',function(chunk){
//   arr.push(chunk)
//   rs.pause()
//   setTimeout(function(){
//     rs.resume()
//   },1000)
// })

// rs.on('end',function(){
//   console.log(Buffer.concat(arr).toString())
// })
// rs.on('err',function(err){
//   console.log(err)
// })

// function pipe(source,target){
//   let rs = fs.createReadStream(source,{highWaterMark:4})
//   let ws = fs.createWriteStream(target,{highWaterMark:1})

//   rs.on('data',function(chunk){
//     if(ws.write(chunk) === false){
//       rs.pause()
//     }
//   })
//   ws.on('drain',function(){
//     rs.resume()
//   })
// }
// pipe('1.txt','2.txt')

// const http = require('http')
// let port = 'http:localhost:8080'
// http.createServer((req,res)=>{
//   //req代表的是客户端,他是一个可读流
//   //res代表的是服务端,他是一个可写流

//   res.setHeader('Content-Type','text/plain;charset=utf8')
//   res.end('你好')
// }).listen(port,()=>{
//   console.log('服务器已经启动')
// })

