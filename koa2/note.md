Koa的设计理念 
Koa 是一个轻量级的、极富表现力的 http 框架。
一个web request会通过 Koa 的中间件栈,来动态完成 response 的处理。
Koa2 采用了 async 和 await 的语法来增强中间件的表现力。
Koa 不在内核方法中绑定任何中间件,它仅仅提供了一个轻量优雅的函数库。

Koa基本组成 
Koa源码非常精简,只有四个文件:

application.js:框架入口;负责管理中间件,以及处理请求


context.js:context对象的原型,代理request与response对象上的方法和属性


request.js:request对象的原型,提供请求相关的方法和属性


response.js:response对象的原型,提供响应相关的方法和属性

application.js 是 koa 的入口主要文件,暴露应用的 class, 这个 class 继承自 EventEmitter ,这里可以看出跟 koa1.x 的不同,koa1.x 是用的是构造函数的方式,koa2 大量使用 es6 的语法。调用的时候就跟 koa1.x 有区别

application.js除了上面的的构造函数外,还暴露了一些公用的api,比如两个常见的,一个是listen,一个是use。



1.1 lib/application.js是入口文件

