const http = require('http');

const server = http.createServer((req,res)=>{

  res.end('ok');
});
server.on('close',()=>{
  console.log('关闭');
});
//触发两次request事件,一个localhost,一个favion.ico
server.on('request',()=>{
  console.log('request');
});
server.listen(3000);