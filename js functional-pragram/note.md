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

5.错误处理,Einer,AP

6.IO

7.Monad

