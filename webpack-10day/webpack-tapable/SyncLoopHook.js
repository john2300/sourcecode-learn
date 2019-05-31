class SyncLoopHook{
  constructor(args){
    this.tasks = [];
  }

  //思路
  //
  call(...args){
    let ret;
    this.tasks.forEach(task=>{
      do{
        ret = task(...args);
      }while(ret!=undefined)
    })
  }
  
  tap(name,task){
    this.tasks.push(task);
  }
}

let hook = new SyncLoopHook(['name']);
let total = 0;
hook.tap('react',function(name){
  console.log('react',name);
  return ++total == 3 ? undefined : '继续学';
});
hook.tap('node',function(name){
  console.log('node',name);
});
hook.call('jw');