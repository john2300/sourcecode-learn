//单例模式

class SingleObject {
  login() {
    console.log('login...')
  }
}

SingleObject.getInstance = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new SingleObject()
    }
    return instance
  }
})()

let obj1 = SingleObject.getInstance()

let obj2 = SingleObject.getInstance()

console.log(obj1 === obj2);//true

let obj3 = new SingleObject();

console.log(obj1 === obj3);//false


/**
 * 场景:
 * 
 * jquery只有一个$
 * 
 *例如:

    if(window.jQuery!=null){
        return window.jQuery
    }else{
        //初始化
    }
 * 
 * 模拟登录框
 * 
 * 
 */


//登录框

class LoginForm {
  constructor() {
    this.state = 'hide'
  }
  show(){
    if(this.state === 'show'){
      alert('已经显示')
      return
    }
    this.state = 'show'
    console.log('登录框已显示')
  }
  hide(){
    if(this.state === 'hide'){
      alert('已经隐藏')
      return
    }
    this.state = 'hide'
    console.log('登录框已隐藏')
  }
}

LoginForm.getInstance = (function(){
  let instance
  return function(){
    if(!instance){
      instance = new LoginForm()
    }
    return instance
  }
})()