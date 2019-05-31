//SyncHook为同步钩子
// let {SyncHook} = require('tapable')

// class Lesson {
//   constructor(){
//     this.hooks = {
//       arch:new SyncHook(['name']),//实例的钩子方法
//     }
//   }
//   tap(){//注册监听函数,钩子函数启动时,依次执行this的上的钩子方法
//     this.hooks.arch.tap('node',function(name){
//       console.log('node',name);
//     });
//     this.hooks.arch.tap('react',function(name){
//       console.log('react',name);
//     });
//   }
//   start(){//启动钩子的方法
//     this.hooks.arch.call('jw');
//   }
// }

// let l = new Lesson();
// l.tap();//注册这些事件
// l.start();//启动钩子

//-----------------------
//SyncBallHook同步加一个保险,术语叫熔断,决定是否向下执行
let {SyncBailHook} = require('tapable')

class Lesson {
  constructor(){
    this.hooks = {
      arch:new SyncBailHook(['name']),
    }
  }
  tap(){//注册监听函数,钩子函数启动时,依次执行this的上的钩子方法
    this.hooks.arch.tap('node',function(name){
      console.log('node',name);
      // return undefined;
      return '想停止学习';//遇到返回的值是非undefined时,返回结束向下执行
    });
    this.hooks.arch.tap('react',function(name){
      console.log('react',name);
    });
  }
  start(){//启动钩子的方法
    this.hooks.arch.call('jw');
  }
}

let l = new Lesson();
l.tap();//注册这些事件
l.start();//启动钩子