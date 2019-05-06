const fs = require('fs')
const path = require('path')
const url = require('url')
const mime = require('mime')
const http = require('http')
const util = require('util')
const stat = util.promisify(fs.stat)
const zlib = require('zlib')
// 缓存未设置过期时间

let server = http.createServer((req, res) => {
  let {pathname} = url.parse(req.url);
  let filePath = path.join(__dirname, pathname)
  console.log(filePath);
  fs.stat(filePath, (err, stat) => {
    if (err) {
      console.log(err)
      return sendErr(req, res)
    }else {
      let ifModifiedSince = req.headers['if-modified-since']
      let lastModified = stat.ctime.toDateString()
      if (ifModifiedSince == lastModified) {
        res.writeHead(304)
        res.end('')
      }else {
        return send(req, res, filePath, lastModified)
      }
    }
  })
})

function sendErr (req, res) {
  res.end('Not found')
}
function send (req, res, filePath, lastModified) {
  res.setHeader('Content-Type', mime.getType(filePath))
  res.setHeader('Last-Modified', lastModified)
  // 为了兼容不同的浏览器，node把所有的请求头全转成了小写
  let acceptEncoding = req.headers['accept-encoding']
  if (acceptEncoding) {
    if (acceptEncoding.match(/\bgzip\b/)) {
      res.setHeader('Content-Encoding', 'gzip')
      fs.createReadStream(filePath)
        .pipe(zlib.createGzip())
        .pipe(res);
    }else if (acceptEncoding.match(/\breflate\b/)) {
      res.setHeader('Content-Encoding', 'reflate')
      fs.createReadStream(filePath)
        .pipe(zlib.createDeflate())
        .pipe(res);
    }else {
      fs.createReadStream(filePath)
        .pipe(res);
    }
  }
}

server.listen(3000);
