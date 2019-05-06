// module.exports = class TinyKoaRouter{
//   constructor(){
//     // this.routesArr = [];
//     // this.path = path;
//     // this.method = method;
//     // this.route = route;
//     this.routesArr = [];
//   }
//   all(fn){
//     this.routesArr.push(fn);
//   }
//   routes(){
//     let aaaa = async function()
//     return 
//   }
// }


// /** 
//  * 
//  * 实例化new,不需要参数
//  * all(path,async),需要改写成app.use(async),每all一次存到数组里
//  * app.use(router.routes())再最后被调用,
// */


//layer是图层的意思
let Layer = class{
  constructor(path,method,route){
    this.path = path;
    this.method = method;
    this.route = route;
  }
  match(curPath){
    let flag = false;
    if(curPath === this.path){
      flag = true;
    }
    return flag;
  }
  
}

module.exports = class TinyKoaRouter{
  constructor(){
    this.routeStack = [];
  }
  all(path,route){
    let layer = new Layer(path,'all',route);
    this.routeStack.push(layer);
  }
  getMatchRoutes(curPath){
    return this.routeStack.filter((item)=>{
      return item.match(curPath);
    }).map(_ => _.route);
  }
  compose(routes,ctx){
    return dispatch(0);
    //包裹你想要的路由或者一个空路由
    function dispatch(i){
      let route = routes[i];
      //退出递归条件的判断
      if(!route){return Promise.resolve()}
      return route(ctx,function next(){
        return dispatch(i+1);
      });
    }
  }
  routes (){
    return async(ctx,next)=>{
      let routes = this.getMatchRoutes(ctx.path);
      //当路径没有的时候,传递到下一个中间件
      if(!routes){
        return next();
      }
      let fnRouters = this.compose(routes,ctx);
      console.log(fnRouters);
      return fnRouters().then(()=>{
        console.log('resolve');
        return next();
      }).catch((err)=>{
        console.log(err);
      })
    
    }
  }
}