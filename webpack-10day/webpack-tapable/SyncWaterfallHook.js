class SyncWaterfallHook{
  constructor(args){
    this.tasks = [];
  }

  //思路
  //
  call(...args){
    let [first,...others] = this.tasks;
    let ret = first(...args);
    others.reduce((a,b)=>{
      return b(a);
    },ret);
  }
  
  tap(name,task){
    this.tasks.push(task);
  }
}

let hook = new SyncWaterfallHook(['name']);
hook.tap('react',function(name){
  console.log('react',name);
  return '传递到下一个注册事件';
});
hook.tap('node',function(data){
  console.log('node',data);
});
hook.call('jw');