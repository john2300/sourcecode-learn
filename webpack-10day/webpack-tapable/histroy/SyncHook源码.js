class SyncHook{
  constructor(args){
    this.tasks = [];
  }
  call(...args){
    this.tasks.forEach(task=>task(...args));
  }
  tap(name,task){
    this.tasks.push(task);
  }
}

let hook = new SyncHook(['name']);
hook.tap('react',function(name){
  console.log('react',name);
});
hook.tap('node',function(name){
  console.log('node',name);
});
hook.call('jw');