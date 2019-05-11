//需要babel编译一下
let utils = require('./utils');
/**
 * 1.标签类型 h1 div
 * 2.属性 className id 
 * 3.子元素 可能是一个数组
 */
class Element {
    //标签名 属性对象 子元素数组
    constructor(tagName, attrs, children) {
        this.tagName = tagName;
        this.attrs = attrs;
        //children也可能没有,|| []做兼容处理,避免遍历children报错
        this.children = children || [];
    }
    //把一个虚拟的DOM节点渲染成一个真实的DOM节点
    render() {
        //创建一个真实的DOM节点
        let element = document.createElement(this.tagName);
        //给此真实的DOM元素节点增加属性
        for (let attr in this.attrs) {
          //属性不同,赋值方式不同,要做兼容处理,代码较多,单独出来
            utils.setAttr(element, attr, this.attrs[attr]);
        }
        //本元素的属性值设置好了,开始设置子元素的
        //先序深度遍历
        this.children.forEach(child => {
            //如果子节点是一个元素的话，就调用它的render方法创建子节点的真实DOM，如果是一个字符串的话，创建一个文件节点就可以了
            //深度遍历是每次都遍历到底部的.child.render()就是深度遍历的回调函数
            let childElement = (child instanceof Element) ? child.render() : document.createTextNode(child);
            element.appendChild(childElement);
        });
        //返回一个真实的DOM 
        return element;
    }
}
function createElement(tagName, attrs, children) {
    return new Element(tagName, attrs, children);
}
module.exports = { createElement };

/**
 * 虚拟DOM,用js对象结构表示DOM树的结构,然后用这个树构建一个真正的DOM树,插到文档中
 * 
 * DOM DIFF,比较两棵DOM树的差异是Virtual DOM算法最核心的部分,ReadDiff算法有三个优化策略
 * 
 * 
 * 最理性的比较方法，怎样确定节点有没有发生变化：比较该节点，比较该节点的父节点，比较该节点的子节点三种方式，都一样了，该节点才没有变化，有多少个节点就比较ｎ的３次方的次．但是这样太浪费性能了．
 * 
 * 
 * ｒｅａｃｔ采用的比较方法如下：
 * 
 * ＤＯＭ节点的跨层级移动操作特别少，忽略不计，只做同级比较，如果有跨层级移动，不会在更新的时候把相应的节点移动到相应更新的位置，而是先删除再创建
 * 
 * 
 * 拥有相同类的两个组件会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构．大白话就是，一旦同级比较遇到不同的，直接销毁，不再复用.除开有相同key的情况
 * 
 * 
 * 对于同一层级的一组节点，它们可以通过唯一的key进行区分开发,区分人员可以使用一个key指示在不同的渲染中那些元素可以保持稳定.
 */