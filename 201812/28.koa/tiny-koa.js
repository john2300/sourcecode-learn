const path = require('path');
const url = require('url');
const Stream = require('stream');
class TinyKoa{
  constructor(){
    this.middleware = [];
    this.ctx = {};
  }
  use(fn){
    this.middleware.push(fn);
  }
  compose(middleware,ctx){
    return function fnMiddleware(){
      // let i = 0;
      return dispatchWrap(0);
      function dispatchWrap(i){
        let fn = middleware[i];
        if(!fn) {return Promise.resolve()};//递归的终止条件
        return fn(ctx,function next(){//递归过程的返回
          return dispatchWrap(i+1);//调用dispatch,会间接的再去帮你调用下一个中间件,或者空的小尾巴中间件
        })
      }
    }
  }
  handleResponse(ctx){
    let {req,res,body} = ctx;
    // let body = ctx.body
    if(typeof body === 'string'){
      res.end(body);
    }else if(body instanceof Stream){
      body.pipe(res);
    }
  }
  listen(port,cb){
    let server = require('http').createServer((req,res)=>{
  
      let ctx = {};
      ctx.res = res;
      ctx.req = req;
      ctx.path = url.parse(req.url).pathname;
      // console.log('req.url:'+req.url + '; ' + 'url.parse(req.url):' + url.parse(req.url) + '; ' + 'url.parse(req.url).pathname:'+ url.parse(req.url).pathname );
      // console.log(url.parse(req.url));
      // console.log('ctx.path'+ctx.path);
      // console.log('this.ctx'+this.ctx.res);
      let fnMiddleware = this.compose(this.middleware,ctx);
      fnMiddleware().then(()=>{
        this.handleResponse(ctx);
      }).catch((e)=>{
        console.log(e);
      })
    });
    server.listen(port,cb)
  }
}

module.exports = TinyKoa;