// class AsycParallerHook{
//   constructor(args){
//     this.tasks = [];
//   }
//   callAync(...args){
//     let finalCallback = args.pop();//拿出最终的函数
//     let index = 0;
//     let done = () =>{
//         index++;
//       if(index == this.tasks.length){
//         finalCallback()
//       }
//     }
//     this.tasks.forEach(task=>{
//       task(...args,done);
//     })
//   }
  
//   tapAync(name,task){
//     this.tasks.push(task);
//   }
// }



// class AsycParallerHook{
//   constructor(){
//     this.tasks = [];
//   }
//   tapAync(name,task){
//     this.tasks.push(task);
//   }
//   callAync(...args){
//     let index = 0;
//     let finalCallback = args.pop();
//     let done = () => {
//       index++;
//       if(index === this.tasks.length){
//         finalCallback();
//       }
//     }
//     this.tasks.forEach(task=>{
//       task(...args,done);
//     })
//   }
// }
class AsycParallerHook{
  constructor(){
    this.tasks = [];
  }
  tapAync(name,task){
    this.tasks.push(task);
  }
  callAync(...args){
    let finalCallback = args.pop();
    let index = 0;
    let done = () => {
      index++;
      if(index === this.tasks.length){
        finalCallback();
      }
    }
    this.tasks.forEach(task=>{
      task(...args,done);
    })
  }
}

let hook = new AsycParallerHook(['name']);
hook.tapAync('react',function(name,cb){
  console.log('react',name);
  cb();
});
hook.tapAync('node',function(name,cb){
  console.log('node',name);
  cb();
});
hook.callAync('jw',function(){
  console.log('end');
});

