1.vue入口:src/platforms/web/entrt-runtime-with-compiler.js

2.//再分析这里
import Vue from './runtime/index'

3.//再分析core/index

//4.找./instance/index

5.//终于找到了vue定义,是一个function

6.除了可以在vue原型上挂载方法以外,还可以在vue上挂载静态属性,在src/core/global-api下有很多,例如

    Object.defineProperty(Vue,'config',configDef)

看vue官网,有哪些config

7.找ASSET_TYPES,在share/constants\




##第二章

8.new Vue发生了什么,在src/core/instance/index.js

源码调试小技巧:



8.1

    import Vue from 'vue'
    

    var app = new Vue({
    el:'#app',
    mounted(){
        console.log(this.message)
    }
    data:{
    message:'hello vue'
    }
    })

8.1为什么可以通过this.message访问到message,因为在instance/init.js中有一个initState
    
8.2实例挂载的实现,从entry-runtime-with-complier开始


