Koa原理学习路径与设计哲学
 koa.js  koa2  异步  异步编程  2.3k 次阅读  ·  读完需要 33 分钟
Koa原理学习路径与设计哲学
本文基于Koa@2.5.0
Koa简介(废话篇)
Koa是基于Node.js的HTTP框架，由Express原班人马打造。是下一代的HTTP框架，更简洁，更高效。

我们来看一下下载量(2018.3.4)

Koa：471,451 downloads in the last month
Express：18,471,701 downloads in the last month
说好的Koa是下一代框架呢，为什么下载量差别有这么大呢，Express一定会说：你大爷还是你大爷！。

确实，好多知名项目还是依赖Express的，比如webpack的dev-server就是使用的Express，所以还是看场景啦，如果你喜欢DIY，喜欢绝对的控制一个框架，那么这个框架就应该什么功能都不提供，只提供一个基础的运行环境，所有的功能由开发者自己实现。

正是由于Koa的高性能和简洁，好多知名项目都在基于Koa，比如阿里的eggjs，360奇舞团的thinkjs。

所以，虽然从使用范围上来讲，Express对于Koa是你大爷还是你大爷！，但是如果Express很好，为什么还要再造一个Koa呢？接下来我们来了解下Koa到底带给我们了什么，Koa到底做了什么。

如何着手分析Koa
先来看两段demo。

下面是Node官方给的一个HTTP的示例。

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
下面是最简单的一个Koa的官方实例。

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
Koa是一个基于Node的框架，那么底层一定也是用了一些Node的API。

jQuery很好用，但是jQuery也是基于DOM，逃不过也会用element.appendChild这样的基础API。Koa也是一样，也是用一些Node的基础API，封装成了更好用的HTTP框架。

那么我们是不是应该看看Koa中http.createServer的代码在哪里，然后顺藤摸瓜，了解整个流程。

Koa核心流程分析
Koa的源码有四个文件

application.js // 核心逻辑
context.js // 上下文，每次请求都会生成一个
request.js // 对原生HTTP的req对象进行包装
response.js // 对原生HTTP的res对象进行包装
我们主要关心application.js中的内容，直接搜索http.createServer，会搜到

  listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
刚好和Koa中的这行代码app.listen(3000);关联起来了。

找到源头，现在我们就可以梳理清楚主流程，大家对着源码看我写的这个流程

fn:listen
∨
fn:callback
∨
[fn:compose] // 组合中间件 会生成后面的 fnMiddleware
∨
fn:handleRequest // (@closure in callback)
∨
[fn(req, res):createContext] // 创建上下文 就是中间件中用的ctx
∨
fn(ctx, fnMiddleware):handleRequest // (@koa instance)
∨
code:fnMiddleware(ctx).then(handleResponse).catch(onerror);
∨
fn:handleResponse
∨
fn:respond
∨
code:res.end(body);
从上面可以看到最开始是listen方法，到最后HTTP的res.end方法。

listen可以理解为初始化的方法，每一个请求到来的时候，都会经过从callback 到 respond的生命周期。

在每个请求的生命周期中，做了两件比较核心的事情：

将多个中间件组合
创建ctx对象
多个中间件组合后，会先后处理ctx对象，ctx对象中既包含的req，也包含了res，也就是每个中间件的对象都可以处理请求和响应。

这样，一次HTTP请求，接连经过各个中间件的处理，再到返回给客户端，就完成了一次完美的请求。

Koa中的ctx
app.use(async ctx => {
  ctx.body = 'Hello World';
});
上面的代码是一个最简单的中间件，每个中间件的第一个参数都是ctx，下面我们说一下这个ctx是什么。

创建ctx的代码：

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.cookies = new Cookies(req, res, {
      keys: this.keys,
      secure: request.secure
    });
    request.ip = request.ips[0] || req.socket.remoteAddress || '';
    context.accept = request.accept = accepts(req);
    context.state = {};
    return context;
  }
直接上代码，Koa每次请求都会创建这样一个ctx对象，以提供给每个中间件使用。

参数的req, res是Node原生的对象。

下面解释下这三个的含义：

context：Koa封装的带有一些和请求与相应相关的方法和属性
request：Koa封装的req对象，比如提了供原生没有的host属性。
response：Koa封装的res对象，对返回的bodyhook了getter和setter。
其中有几行一堆 xx = xx = xx，这样的代码。

是为了让ctx、request、response，能够互相引用。

举个例子，在中间件里会有这样的等式

ctx.request.ctx === ctx
ctx.response.ctx === ctx

ctx.request.app === ctx.app
ctx.response.app === ctx.app

ctx.req === ctx.response.req
// ...
为什么会有这么奇怪的写法？其实只是为了互相调用方便而已，其实最常用的就是ctx。

打开context.js，会发现里面写了一堆的delegate：

/**
 * Response delegation.
 */

delegate(proto, 'response')
  .method('attachment')
  .method('redirect')
  .method('remove')
  .method('vary')
  .method('set')
  .method('append')
  .method('flushHeaders')
  .access('status')
  .access('message')
  .access('body')
  .access('length')
  .access('type')
  .access('lastModified')
  .access('etag')
  .getter('headerSent')
  .getter('writable');

/**
 * Request delegation.
 */

delegate(proto, 'request')
  .method('acceptsLanguages')
  .method('acceptsEncodings')
  .method('acceptsCharsets')
  .method('accepts')
  .method('get')
  .method('is')
  .access('querystring')
  .access('idempotent')
  .access('socket')
  .access('search')
  .access('method')
  .access('query')
  .access('path')
  .access('url')
  .getter('origin')
  .getter('href')
  .getter('subdomains')
  .getter('protocol')
  .getter('host')
  .getter('hostname')
  .getter('URL')
  .getter('header')
  .getter('headers')
  .getter('secure')
  .getter('stale')
  .getter('fresh')
  .getter('ips')
  .getter('ip');
是为了把大多数的request、response中的属性也挂在ctx下，我们为了拿到请求的路径需要ctx.request.path，但是由于代理过path这个属性，ctx.path也是可以的，即ctx.path === ctx.request.path。

ctx模块大概就是这样，没有讲的特别细，这块是重点不是难点，大家有兴趣自己看看源码很方便。

一个小tip: 有时候我也会把context.js中最下面的那些delegate当成文档使用，会比直接看文档快一点。
Koa中间件机制
中间件函数的参数解释
ctx：上面讲过的在请求进来的时候会创建一个给中间件处理请求和响应的对象，比如读取请求头和设置响应头。
next：暂时可以理解为是下一个中间件，实际上是被包装过的下一个中间件。
一个小栗子
我们来看这样的代码：

// 第一个中间件
app.use(async(ctx, next) => {
  console.log('m1.1', ctx.path);
  ctx.body = 'Koa m1';
  ctx.set('m1', 'm1');
  next();
  console.log('m1.2', ctx.path);
});

// 第二个中间件
app.use(async(ctx, next) => {
  console.log('m2.1', ctx.path);
  ctx.body = 'Koa m2';
  ctx.set('m2', 'm2');
  next();
  debugger
  console.log('m2.2', ctx.path);
});

// 第三个中间件
app.use(async(ctx, next) => {
  console.log('m3.1', ctx.path);
  ctx.body = 'Koa m3';
  ctx.set('m3', 'm3');
  next();
  console.log('m3.2', ctx.path);
});
会输出什么呢？来看下面的输出：

m1.1 /
m2.1 /
m3.1 /
m3.2 /
m2.2 /
m1.2 /
来解释一下上面输出的现象，由于将next理解为是下一个中间件，在第一个中间件执行next的时候，第一个中间件就将执行权限给了第二个中间件，所以m1.1后输出的是m2.1，在之后是m3.1。

那么为什么m3.1后面输出的是m3.2呢？第三个中间件之后已经没有中间件了，那么第三个中间件里的next又是什么？

我先偷偷告诉你，最后一个中间件的next是一个立刻resolve的Promise，即return Promise.resolve()，一会再告诉你这是为什么。

所以第三个中间件(即最后一个中间件)可以理解成是这样子的：

app.use(async (ctx, next) => {
    console.log('m3.1', ctx.path);
    ctx.body = 'Koa m3';
    ctx.set('m3', 'm3');
    new Promise.resolve(); // 原来是next
    console.log('m3.2', ctx.path);
});
从代码上看，m3.1后面就会输出m3.2。

那为什么m3.2之后又会输出m2.2呢？，我们看下面的代码。

let f1 = () => {
  console.log(1.1);
  f2();
  console.log(1.2);
}

let f2 = () => {
  console.log(2.1);
  f3();
  console.log(2.2);
}

let f3 = () => {
  console.log(3.1);
  Promise.resolve();
  console.log(3.2);
}

f1();

/*
  outpout
  1.1
  2.1
  3.1
  3.2
  2.2
  1.2
*/
这段代码就是纯函数调用而已，从这段代码是不是发现，和上面一毛一样，对一毛一样，如果将next理解成是下一个中间件的意思，就是这样。

中间件组合的过程分析
用户使用中间件就是用app.use这个API，我们看看做了什么：

  // 精简后去掉非核心逻辑的代码
  use(fn) {
    this.middleware.push(fn);
    return this;
  }
可以看到，当我们应用中间件的时候，只是把中间件放到一个数组中，然后返回this，返回this是为了能够实现链式调用。

那么Koa对这个数组做了什么呢？看一下核心代码

const fn = compose(this.middleware); // @callback line1
// fn 即 fnMiddleware 
return fnMiddleware(ctx).then(handleResponse).catch(onerror); // @handleRequest line_last
可以看到用compose处理了middleware数组，得到函数fnMiddleware，然后在handleRequest返回的时候运行fnMiddleware，可以看到fnMiddleware是一个Promise，resolve的时候就会处理完请求，能猜到compose将多个中间件组合成了一个返回Promise的函数，这就是奇妙之处，接下来我们看看吧。

精简后的compose源码

// 精简后去掉非核心逻辑的代码
00    function compose (middleware) {
01      return function (context, next) { // fnMiddleware
02        return dispatch(0)
03        function dispatch (i) {
04          let fn = middleware[i] // app.use的middleware
05          if (!fn) return Promise.resolve()
06          return fn(context, function next () {
07            return dispatch(i + 1)
08          })
09        }
10      }
11    }
精简后代码只有十几行，但是我认为这是Koa最难理解、最核心、最优雅、最奇妙的地方。

看着各种function，各种return有点晕是吧，不慌，不慌啊，一行一行来。

compose返回了一个匿名函数，这个匿名函数就是fnMiddleware。

刚才我们是有三个中间件，你们准备好啦，请求已经过来啦！

当请求过来的时候，fnMiddleware就运行了，即运行了componse返回的匿名函数，同时就会运行返回的dispatch(0)，那我们看看dispatch(0)做了什么，仔细一看其实就是

// dispatch(0)的时候，fn即middleware[0]
return middleware[0](context, function next (){
  return dispatch(1);
})

// 上面的context和next即中间件的两个参数
// 第一个中间件
app.use(async(ctx, next) => {
  console.log('m1.1', ctx.path);
  ctx.body = 'Koa m1';
  ctx.set('m1', 'm1');
  next(); // 这个next就是dispatch(1)
  console.log('m1.2', ctx.path);
});
同理，在第二个中间件里面的next，就是dispatch(2)，也就是用上面的方法被包裹一层的第三个中间件。

现在来看第三个中间件里面的next是什么？
可以看到精简过的compose中05行有个判断，如果fn不存在，会返回Promise.resolve()，第三个中间件的next是dispatch(3)，而一共就有三个中间件，所以middleware[3]是undefined，触发了分支判断条件，就返回了Promise.resolve()。

再来复盘一下：

请求到来的事情，运行fnMiddleware()，即会运行dispatch(0)调起第一个中间件。
第一个中间件的next是dispatch(1)，运行next的时候就调起第二个中间件。
第二个中间件的next是dispatch(2)，运行next的时候就调起第三个中间件。
第三个中间件的next是dispatch(3)，运行next的时候就调起Promise.resolve()。可以把Promise.resolve()理解成一个空的什么都没有干的中间件。
到此，大概知道了多个中间件是如何被compose成一个大中间件的了吧。

中间件的类型
在koa2中，支持三种类型的中间件：

common function：普通的函数，需要返回一个promise。
generator function：需要被co包裹一下，就会返回一个promise。
async function：直接使用，会直接返回promise。
可以看到，无论哪种类型的中间件，只要返回一个promise就好了，因为这行关键代码return fnMiddleware(ctx).then(handleResponse).catch(onerror);，可以看到Koa将fnMiddleware的返回值认为是promise。如果传入的中间件运行后没有返回promise，那么会导致报错。

