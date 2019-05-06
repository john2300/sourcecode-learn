const fs = require('fs');
const path = require('path');

module.exports = (baseDir) => async (ctx,next)=>{
  let localfilePath = path.join(baseDir,ctx.path);
  let _err = null;
  //用await等待Promise决议
  await new Promise((resolve,reject)=>{
    fs.stat(localfilePath,(err,stat)=>{
      if(err){
        //不存在跳到下一个中间件
        // console.log(err);
        _err = err;
      console.log('static err')        
      }
      //抛出resolve证明该文件存在
      resolve();
    });
  })
  if(_err){
    console.log('static next')
    return next();
  }
  //通过Accept进行判断
  let exc = ctx.path.split('.').pop() || '';
  switch(exc){
    case 'css':
      ctx.res.setHeader('Content-Type','text/css');
      break;
      case 'js':
      ctx.res.setHeader('Content-Type','application/javascript');
      break;
      case 'html':
      ctx.res.setHeader('Content-Type','text/html;charset=utf-8');
      break;
  }
  ctx.body = fs.createReadStream(localfilePath);
}