const http = require('http');

const querystring = require('querystring');

const postData = querystring.stringify({
  'msg': '你好世界'
});
let options = {
  host:'localhost',
  port:'3000',
  method:'POST',
  headers:{
    "Content-type":"application/x-www-form-urlencoded"
  }
}

let req = http.request(options,(res)=>{
  let result = []
  res.on('data',chunk=>{
    // console.log(chunk);
    result.push(chunk);
  })
  res.on('end',()=>{
    let str = Buffer.concat(result);
    console.log(str);
  })
});

req.write(postData);
req.end();