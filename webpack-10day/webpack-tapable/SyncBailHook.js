class SyncBailHook{
  constructor(args){
    this.tasks = [];
  }
  call(...args){
    // this.tasks.forEach(task=>task(...args));
    let ret , index = 0;
    do{
      ret = this.tasks[index++](...args);
    }while(ret===undefined && index < this.tasks.length)
  }
  tap(name,task){
    this.tasks.push(task);
  }
}

let hook = new SyncBailHook(['name']);
hook.tap('react',function(name){
  console.log('react',name);
  return '停一停';
});
hook.tap('node',function(name){
  console.log('node',name);
});
hook.call('jw');