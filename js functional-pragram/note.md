##javascript functional programming

oop aop 函数式编程是js的三大编程思维

通过态射,一个成员可以变成另一个成员.

1.函数是第一等公民

2.只用"表达式",不用语句

3.没有副作用(不会因为变量命名冲突,因为变量都是参数)

4.不修改状态

5.引用透明(函数运行只靠参数)


lodash.js函数式编程库
函数式编程核心概念

1.纯函数(独立,没有副作用,不依赖任何状态,固定输入,固定输出,发生变形关系,可以函数传递函数,函数里面处理函数,有固定输出,把它缓存起来,第二次就不再计算了)

    不太明白,是lodash让固定输出不再缓存了,还是js引擎的原因.

2.函数的柯里化

    传递给函数一部分参数来调用它,让它返回一个函数去处理剩下的参数

    var checkage = function(age){
        return function(min){
            return age > min
        }
    }

    checkage(8)(10)

    还可以这样写

    var checkage = min => (age => age > min)
    var checkage18 = checkage(18)
    checkage18(20)

    以上不是链式调用,返回的是function,是链式调用返回的是this
    
    柯里化之后更有弹性了,扩展性更好

    事实上柯里化是一种"预加载"函数的方法,通过传递较少的参数,得到一个已经记住了这些
    参数的新函数.某种意义上讲,这是一种对参数的"缓存",是一种非常高效的编写函数的方法

3.函数组合

    纯函数以及如何把它柯里化写出来的洋葱代码h(g(f(x))),为了解析函数嵌套的问题,需要函数组合

    const compose = (f,g) => (x => f(g(x)));
    var first = arr => arr[0];
    var reverse = arr => arr.reverse();
    var last = compose(first,reverse)
    last([1,2,3,4,5])

4.point free

    把一些对象自带的方法转化成纯函数,不要命令转瞬即逝的中间变量

    这个函数,使用了str作为我们的中间变量,但这个中间变量除了让代码边长一点以外是毫无意义的
    const f = str => str.toUpperCase().split('')

    例如 var toUpperCase = word => word.toUpperCase();
        var split = x => (str => split(x))

        本来就是js支持的方法,没有必要再写一个中间变量,想要了利用上面两个函数,可以组合修改成以下:

            var f = compose(split(' '), toUpperCase);
            f("abcd efgh")


5.声明式与命令式代码
    命令式代码是,通过编写一条又一条指令去让计算机执行一些动作,这其中一般都会涉及到很多繁杂的细节.而声明式要优雅很多,通过表达式的方式来声明我们想干什么,而不是通过一步一步的指示.

    //命令式

    let CEOs = []
    for(var i = 0;i<companies.length;i++){
        CEOs.push(companies[i].CEO)
    }

    //声明式

    let CEOs = companies.map(c=>c.CEO);

    优缺点

    函数式编程优缺点

        一个明显的好处就是这种声明式的代码,对于无副作用的纯函数,我们完全可以不考虑函数内部是如何实现的,专注编写业务代码.优化代码时,暮光之需要集中在这些稳定坚固的函数内部即可.

        相反,不纯的函数式代码会产生副作用或者依赖系统环境,使用它们的时候总是要考虑这些不干净的副作用.

6.惰性求值

    在指令式语言中以下代码会按顺序执行,由于每个函数都有可能改动或者依赖于其外部的状态,因此必须顺序执行

    function somewhatLongOpention1(){somewhatLongOperation}

    例如

        function a(){
            if(true){
                console.log(123);
            }else{
                console.log(456)
            }
        }
        a();
        a();

        以上虽然是一样的,但是每一次都需要重新判断,况且如果逻辑很复杂,会有性能问题.

        改造如下:
     
            function a(){
                if(true){
                a = function(){
                    console.log(123)
                }
            }else{
                console.log(456)
            }
        }
        a();
        a();

        第一次执行if..else,注意,这里不输出,a被重写

        第二次知道了,不用再判断,输出123

    实际的应用场景:

        ajax

        代码如下:

        function ajaxFunction() {
    var xmlHttp;

    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
    catch (e) {

        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {

            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                alert("您的浏览器不支持AJAX！");
                return false;
            }
        }
    }
}


//改造如下


function ajaxFunction() {
    var xmlHttp;

    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
        //也是只要判断一次,就不需要再判断了
        ajaxFunction = function(){
            return new XMLHttpRequest()
        }
    }
    catch (e) {

        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {

            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                alert("您的浏览器不支持AJAX！");
                return false;
            }
        }
    }
}




更加专业的术语

1.高阶函数

函数当参数,把传入的函数做一个封装,然后返回这个封装函数,达到更高程度的抽象

//命令式

var add = function(a,b){
    return a+b
}

function math(func,array){
    return func(array[0],array[1]);
}

math(add,[1,2]);

//高阶使math函数有了加的能力



2.尾调用优化

指函数内部的最后一个动作是函数调用,该调用的返回值,直接返回给函数,函数调用自身,称为递归.如果调用自身,就称为尾递归.递归需要保存大量的调用记录,很容易发生栈溢出错误,如果使用尾递归优化,将递归变为循环,那么只需要保存一个调用记录,就不会发生栈溢出错误了.

//不是递归,无法优化

    function factorial(n){
        if(n===1) return 1;
        return *factorial(n-1)
    }
    function factorial(n,total){
        if(n===1) return total;
        return factorial(n-1,n*total);
    }//es6强制使用尾递归



系数尾递归

    function sum(n){
        if(n===1) return 1;
        return n + sum(n-1)
    }

以上大致过程是

    sum(5)
    (5+sum(4))
    (5+(4+sum(3))
    ....
    15
    
普通递归时.内存需要记录调用的栈堆所出的深度和位置信息.在最底层计算返回值,再根据记录的信息,调回上一层计算,然后再调回更高一层,依次运行,直到最外层的调用函数.在cpu计算和内存会消耗很多,而且当深度过大时,会出现栈堆溢出.

    function sum(x,total){
        if(x===1){
            return x + total
        }
        return sum(x-1,x+total)
    }

大致过程是

    sum(5,0)
    sum(4,5)
    sum(3,9)
    sum(2,12)
    sum(1,14)
    15

整个计算过程是线性的,调用一次sum(x,total)后,会进入下一个栈,相关的数据信息和跟随进入,不再放在堆栈上保存.当计算完最后的值之后,直接返回到最上层的sum(5,0).这能有效的防止堆栈溢出.

在ECMAscript6,通过尾递归优化,js代码在解释成机器码的时候,将会while看起,也就是说,同时拥有数学表达能力和while的效能.

3.闭包

4.容器,Function


    函数不仅可以用于同一个范畴之中值的转换,还可以用于将换一个范畴转成另一个范畴.这就涉及到了函子.

    函子是函数式变成里面最重要的数据类型,也是基本的运算单位和功能单位.它首先是一种范畴,也就是说,是一个容器,包含了值和变形关系,比较特殊的是,它的变形关系可依次作用于每一个值,将当前容器变成另一个容器.


容器,Functor(函子)

    $()返回的对象并不是一个原生的DOM对象,而是对于原生对象的一种封装,这在某种意义上就是一个"容器"(当它并不是函数式)

    Functor(函子)遵守一些特定规则的容器类型

    Functor是一个对于函数调用的抽象,我们赋予容器自己去调用函数的能力.把东西装进一个容器,只留出一个接口map给容器外的函数,map一个函数时,我们让容器自己来运行这个函数,这样容器可以自由地选择何时何地地如何操作这个函数,以致于拥有惰性求值,错误处理,异步调用等等的特性

    题外知识点

        能用forEach()做到的，map()同样可以。反过来也是如此。
        map()会分配内存空间存储新数组并返回，forEach()不会返回数据。
        forEach()允许callback更改原始数组的元素。map()返回新的数组。

        forEach适合于你并不打算改变数据的时候，而只是想用数据做一些事情 – 比如存入数据库或则打印出来。

        let arr = ['a', 'b', 'c', 'd'];
        arr.forEach((letter) => {
        console.log(letter);
            });
        // a
        // b
        // c
        // d

        map()适用于你要改变数据值的时候。不仅仅在于它更快，而且返回一个新的数组。这样的优点在于你可以使用复合(composition)(map(), filter(), reduce()等组合使用)来玩出更多的花样。

        let arr = [1, 2, 3, 4, 5];
        let arr2 = arr.map(num => num * 2).filter(num => num > 5);
        // arr2 = [6, 8, 10]
---------------------------------------

        var Container = function(x){
            this.__value =x
        }
        Container.prototype.map = function(f){
            return Container.of(f(this.__value))
        }

        首先容器要有一个属性值,通过map自己的属性给外部函数,让其操作自己的属性值,并且返回一个新的容器

        以上说白了就是下面的效果

        var b = new con('a')

5.错误处理,Einer,AP

6.IO

7.Monad




流行的几大函数式编程库

    RxJS

       function Reactive Programming FRP,函数响应式编程 

       所有的外部输入(用户输入,网络请求等等)都被视作一种事件流:

        用户点击了按钮-->网络请求成功-->用户键盘输入-->某个定时事件发生-->这种事件流特别适合处理游戏,上上下下,例如,下面这段代码监听点击事件,每两次点击事件产生一次事件响应:

            var clicks = Rx.Observable
                .fromEvent(document,'click')
                .bufferCount(2)
                .subscribe(x=>console.log(x));//打印出前两次点击事件
        
        Angular在用这个技术

    cycleJs

        是一个基于rxjs的框架,它是一个彻底的FRP理念的框架,和react一样支持virtual DOM,JSX语法,但现在似乎还没有看到大型的应用经验

        本质上讲,它就是在Rx.js的基础上加入了对virtual DOM,容器和组件的支持

    lodash.js

        是一个具有一致接口,模块化.高性能等特性的js工具库,是underscore.js的fork,其最初目标也是"一致的跨浏览器行为,,,并改善性能"

        lodash采用延迟计算,意味着我们链式方法在显式或者隐式的value()调用之前是不会执行的,因此lodash可以进行shortcut(捷径)fusion(融合)这样的优化,通过合并链式大大降低迭代的次数,从而大大提升其执行性能


    underscoerjs

        是一个js工具库.它提供了一整套函数式编程的实用功能,但是没有扩展任何js内置对象.解决了这个问题:如果我面对一个空白的HTML,并希望立即开始工作,我需要什么?弥补了jquery没有实现的功能,同时又是Backbone必不可少的部分

        函数式编程最佳入门库


    ramdajs



函数式编程实际应用场景

    易调试,热部署,并发

    单元测试

    总结与补充
    


