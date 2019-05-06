const Koa = require('koa');
const path = require('path');
// 可以把一个generator中间件转成一个koa2的中间件
const convert = require('koa-convert');
//const bodyParser = require('koa-bodyparser');
const bodyParser = require('koa-better-body');
const app = new Koa();
//上传文件，指定上传的目录 
app.use(convert(bodyParser({
    uploadDir: path.join(__dirname, 'uploads')
})));
app.listen(3000);
// GET /user 返回一个空白 表单
// POST /user 表示提交 用户注册数据
//如果要上传文件的话，express要用multer中间件 koa里面要用koa-better-body
//如果说要在表单里上传文件的话，就需要给表单增加一个enctype="multipart/form-data"
app.use(async function (ctx, next) {
    if (ctx.url == '/user' && ctx.method == 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8');
        ctx.body = (
            `
             <form method="POST" enctype="multipart/form-data">
               <input type="text" name="username">
               <input type="file" name="avatar">
               <input type="submit">
             </form>
            `
        );
    } else {
        await next();
    }
});
app.use(async function (ctx, next) {
    if (ctx.url == '/user' && ctx.method == 'POST') {
        //当使用了bodyparser中间件之后，当请求到来的时候，会解析请求体赋给ctx.request.body
        //fileds 是字段的意思
        ctx.body = ctx.request.fields;
    } else {
        await next();
    }
});



/**
 * 对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
 * 
 * koa-session：让无状态的http拥有状态，基于cookie实现的后台保存信息的session
koa-mysql:封装了需要用到的SQL语句
koa-mysql-session：当不想让session存储到内存，而想让session存储到mysql数据库中时使用
koa-router：后台会接受到各种请求的url，路由会根据不同的url来使用不同的处理逻辑。
koa-view：请求html页面时，后台会用模板引擎渲染数据到模板上，然后返回给后台
koa-static：请求img、js、css等文件时，不需要其他逻辑，只需要读取文件
koa-better-body：post上传文件时，解析请求体
 */