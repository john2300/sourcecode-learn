const path = require('path');
const TinyKoa = require('./tiny-koa');
const Router = require('./tiny-koa-router');

// const TinyKoa = require('koa');
const TinyKoaStatic = require('./tiny-koa-static');
const app = new TinyKoa();
const port = 8080;
const router = new Router();
app.use(TinyKoaStatic(path.join(__dirname,'static')));
router.all('/api/post',async(ctx,next)=>{
  ctx.body = 'post';
  return next();
});
app.use(router.routes());

app.use(async(ctx,next)=>{
  ctx.body = 'Hello TinyKoa';
  next();
});

app.use(async(ctx,next)=>{
  ctx.body = 'Hello TinyKoa-2';
  next();
});

app.listen(port,()=>{ 
  console.log(`${port} listen`);
});