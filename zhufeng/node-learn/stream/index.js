let http = require('http')
let port = 3000
let fs = require('fs')
let url = require('url')
let path = require('path')
//mime解决返回文件类型的映射
let mime = require('mime');
http.createServer((req, res) => {
  let {pathname, query} = url.parse(req.url)
  // console.log(req);
  if(pathname=='/clock'){
    let now = (new Date()).toDateString();
    res.end(now);
    return;
  }

  //静态文件
  // fs.stat('.' + pathname, (err, stat) => {
  //     if (err) {
  //       console.log(err);
  //       res.statusCode = 404
  //       res.end(`${pathname} not found`)
  //     }else if (stat.isFile()) {
  //       res.setHeader('Content-Type',mime.getType(pathname)+';charset=uft8');
  //       fs.createReadStream('.' + pathname).pipe(res)
  //     }else if (stat.isDirectory()) {
  //       res.setHeader('Content-Type','text/html;charset=utf8');
  //       fs.createReadStream('.' + pathname + '/index.html').pipe(res)
  //     }
  // })
}).listen(port, () => {
  console.log('连接成功')
});

//没有解决的问题是,静态文件请求失败,可以用koa-static解决,把所有的静态文件放在一个目录下,暂时不懂原理