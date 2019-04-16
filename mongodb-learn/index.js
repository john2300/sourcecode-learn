const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    render = require('koa-art-template'),
    Router = require('koa-router'),
    path = require('path'),
    session = require('koa-session'),
    Bodyperser = require('koa-bodyparser'),
    views = require('koa-views'),
    DB = require('./module/db.js');
let router = new Router()
let app = new Koa();

//配置post提交数据的中间件
app.use(Bodyperser());
//配置koa-art-template模板引擎
render(app, {
    //视图位置
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 10000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

router.get('/', async (ctx) => {
    var result = await DB.find('order',{});
   
    await ctx.render('index',{
        list:result
    })
});

app.use(session(CONFIG, app));

router.get('/name', async (ctx) => {
    let userinfo = ctx.cookies.get('userinfo');
    console.log(userinfo);
})

router.get('/login', async (ctx) => {
    ctx.session.userinfo = '张三';
    ctx.body = "登录成功";
})

router.get('/add', async (ctx) => {
    await ctx.render('add');
});

router.get('/edit', async (ctx) => {
    let id = ctx.query.id;

    let data = await DB.find('order',{"_id":DB.getObjectID(id)})
    
    await ctx.render('edit',{
        list:data[0]
    });
});

// router.get('/delete', async (ctx) => {
//     var data = await DB.remove('order',{"username":"李四"});

   
//     ctx.body = "删除一条数据";
// });

router.post('/doAdd', async (ctx) => {
    let data = await DB.insert('order',ctx.request.body);
    // console.log(data);
    try{
        if(data.result.ok){
            ctx.redirect('/');
        }
    }catch(err){
        console.log(err);
        return;
        ctx.redirect('/add');
    }
})

router.post('/doEdit',async(ctx)=>{
    //通过get传递的id获取用户
   

    var id = ctx.request.body.id;
    var username = ctx.request.body.username;
    var age = ctx.request.body.age;
    var sex = ctx.request.body.sex;
    
    let data = await DB.update('order',{"_id":DB.getObjectID(id)},{username,age,sex});
    // console.log(data);
    try{
        if(data.result.ok){
            ctx.redirect('/');
        }
    }catch(err){
        console.log(err);
        return;
        ctx.redirect('/add');
    }
})
router.get('/delete',async (ctx)=>{
    // console.log(ctx.query.id);

    var id = ctx.query.id;
    var data = await DB.remove('order',{"_id":DB.getObjectID(id)});
    try{
        if(data.result.ok){
            ctx.redirect('/');
        }
    }catch(err){
        console.log(err);
        return;
        ctx.redirect('/add');
    }
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);