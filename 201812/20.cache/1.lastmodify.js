/**
 * 1. 第一次访问服务器的时候，服务器返回资源和缓存的标识，客户端则会把此资源缓存在本地的缓存数据库中。
 * 2. 第二次客户端需要此数据的时候，要取得缓存的标识，然后去问一下服务器我的资源是否是最新的。
 * 如果是最新的则直接使用缓存数据，如果不是最新的则服务器返回新的资源和缓存规则，客户端根据缓存规则缓存新的数据。
 */
let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
// http://localhost:8080/index.html
http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url, true);
    //D:\vipcode\201801\20.cache\index.html
    let filepath = path.join(__dirname, pathname);
    fs.stat(filepath, (err, stat) => {
        if (err) {
            return sendError(req, res);
        } else {
            let ifModifiedSince = req.headers['if-modified-since'];
            let LastModified = stat.ctime.toGMTString();
            if (ifModifiedSince == LastModified) {
                res.writeHead(304);
                res.end('');
            } else {
                return send(req, res, filepath, stat);
            }
        }
    });
}).listen(8080);
function sendError(req, res) {
    res.end('Not Found');
}
function send(req, res, filepath, stat) {
    res.setHeader('Content-Type', mime.getType(filepath));
    //发给客户端之后，客户端会把此时间保存起来，下次再获取此资源的时候会把这个时间再发回服务器
    res.setHeader('Last-Modified', stat.ctime.toGMTString());
    fs.createReadStream(filepath).pipe(res);
}





/**
 * Last-Modified和Last-Modified-Since分别指的是什么：

Last-Modified指的是服务器端资源的最后修改时间
Last-Modified-Since指的是已被浏览器缓存的资源的最后修改时间
而Last-Modified和Last-Modified-Since正如以下描述那样通力合作来控制缓存的：

浏览器通过GET方式向服务器第一次请求资源，则该资源会被浏览器缓存起来
同时服务器发送给浏览器的响应头Last-Modified会告知该资源的最后修改时间，浏览器也会把它缓存起来

在这之后，浏览器每一次通过GET方式向服务器请求该已被缓存的资源时
浏览器会把它对应的已被缓存起来的最后修改时间通过请求头Last-Modified-Since发送给服务器

服务器接到浏览器对该已被缓存的资源的GET方式请求后
首先是把服务器中对应实际资源的Last-Modified以及浏览器发过来的Last-Modified-Since进行对比
通俗来说就是：服务器对服务器中对应实际资源的最后修改时间与已被浏览器缓存的对应资源的最后修改时间两者进行对比

如果两者的时间是一致，则证明在服务器上的对应实际资源没有改动，与被浏览器缓存的对应资源一致
那么就返回状态码304，浏览器接收到这状态码就直接把之前缓存的内容重新拿出来显示

如果两者的时间不一致，则明在服务器上的对应实际资源发生变动，与被浏览器缓存的对应资源不一致
那么就返回状态码200，同时发送最新变动的资源以及通过响应头Last-Modified发送已变动资源的最后修改时间给浏览器
最终，浏览器就会显示更新过的资源并且将它缓存起来，覆盖以前的缓存，对应的最后更新时间的缓存也同样会被重新覆盖


 * 
 */