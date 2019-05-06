function Zhufeng(options = {}){
  this.$options = options;
  let data = this._data = this.$options.data;
  observe(data);
  //this代理了this._data,可以让实例zhufeng.xx
  for(let key in data){
    Object.defineProperty(this,key,{
      enumerable:true,
      get(){
        return this._data[key];
      },
      set(newVal){
        this._data[key] = newVal;
      }
    });
  }

}

function Observe(data){
  for(let key in data){
    let val = data[key];
    //递归,遍历对象的嵌套
    observe(val);
    //把data属性通过object.DefineProperty的方式,定义属性
    Object.defineProperty(data,key,{
      enumerable:true,
      get(){
        return val;
      },
      set(newVal){
        if(newVal === val){
          //设置的值是和以前一样的东西
          return;
        }
        val = newVal;//如果以后在获取值的时候讲刚才设置的值再丢回去
        observe(newVal);
      }
    })
  }
}
//观察对象,给对象增加ObjectDefineProperty
function observe(data){
  return new Observe(data)
}