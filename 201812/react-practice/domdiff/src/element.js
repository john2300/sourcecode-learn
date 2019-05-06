class Element{
  constructor(tagName,attrs,children){
     this.tagName = tagName;
     this.attrs = attrs;
     this.children = children;
  }
  //渲染成真正的dom元素
  render(){
    let element = document.createElement(this.tagName);
    //属性很多,需要循环赋值
    for(let attr in this.attrs){
      //做兼容处理,建立另外一个文件util.js
      element.setAttribute(attr,this.attrs[atrr]);
    }
  }
}