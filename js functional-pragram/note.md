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

    1.我们的容器能做的事情太少了,try/catch/throw并不是"纯"的,因为它从外部接管了我们的函数,并且这个函数出错时摒弃了它的返回值.

    2.Promise是可以调用catch来集中处理错误的

    3.事实上Either并不只是用来做错误处理的,它表示了逻辑或,范畴学里的coproduc

    Either

        函数式编程里,使用Either函子表达,Either函数内部有两个值,左值(left)和右值(right).右值是正常情况下使用的值,左值是右值不存在时使用的默认值.

        class Either extends Functor{
        constructor(left,right){
        this.left = left;
        this.right = right;
        }
        map(f){
            return this.right?
                Either.of(this.left,f(this.right)):
                Either.of(f(this.left),this.right);
        }
        }

        Either.of = function(left,right){
        return new Either(left,right)
        };

        var addOne = function(x){
        return x+1;
        };

        Either.of(5,6).map(addOne);
        //Either(5,7)

        Either.of(1,null).map(addOne);
        //Either(2,null)

        Either
        .of({address:'xxx'},currentUser.address)
        .map(updateField)

        错误处理,Either

        
        
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
    



字典

    字典以一种键值对形式存储的

    字典就像我们的电话号码簿一样,要找一个电话时,名字找到了电话号码也就找到了

    js的Object类就是以字典的形式设计的.要实现一个Dictionary类,这样会比object方便比如显示字典中的所有元素,对属性进行排序等.



散列

    散列后的数据可以快速插入取用

    在散列表上插入,删除和取用数据非常快,但是查找数据却效率底下,比如查找一组数据中的最大值和最小值

    js散列表基于数组设计,理想情况散列函数会将每一个键值对映射为唯一的数组索引,数组长度有限制,更现实的策略是将键均匀分布





二叉树

    树是一种非线性的数据结构,分层存储

    树被用来存储具有层级关系的数据,还被用来存储有序列表

    二叉树进行查找非常快,为二叉树添加或删除元素也非常快

    集合中不允许想用成员存在

    








在封装Node.js和前端通用的模块时，可以使用以下逻辑：


    if (typeof exports !== "undefined") {
    exports.** = **;
    } else {
    this.** = **;
    }


## 前言

The Module Pattern，模块模式，也译为模组模式，是一种通用的对代码进行模块化组织与定义的方式。这里所说的模块（Modules），是指实现某特定功能的一组方法和代码。许多现代语言都定义了代码的模块化组织方式，比如 Golang 和 Java，它们都使用 package 与 import 来管理与使用模块，而目前版本的 JavaScript 并未提供一种原生的、语言级别的模块化组织模式，而是将模块化的方法交由开发者来实现。因此，出现了很多种 JavaScript 模块化的实现方式，比如，CommonJS Modules、AMD 等。

以 AMD 为例，该规范使用 define 函数来定义模块。使用 AMD 规范进行模块化编程是很简单的，大致上的结构是这样的：

define(factory(){

// 模块代码

// return something;

});

目前尚在制定中的 Harmony/ECMAScript 6（也称为 ES.next），会对模块作出语言级别的定义，但距离实用尚遥不可及，这里暂时不讨论它。

作为一种模式，模块模式其实一直伴随着 JavaScript 存在，与 ES 6 无关。最近我需要重构自己的一些代码，因此我参考和总结了一些实用的模块化编程实践，以便更好的组织我的代码。需要注意的是，本文只是个人的一个总结，比较简单和片面，详尽的内容与剖析请参看文后的参考资料，它们写得很好。本文并不关心模块如何载入，只关心现今该如何组织模块化的代码。还有，不必过于纠结所谓的模式，真正重要的其实还是模块代码及思想。所谓模式，不过是我们书写代码的一些技巧和经验的总结，是一些惯用法，实践中应灵活运用。

## 模块模式

### 闭包与 IIFE (Immediately-Invoked Function Expression)

模块模式使用了 JavaScript 的一个特性，即闭包（Closures）。现今流行的一些 JS 库中经常见到以下形式的代码：

;(function(参数) {

// 模块代码

// return something;

})(参数);

上面的代码定义了一个匿名函数，并立即调用自己，这叫做自调用匿名函数（SIAF），更准确一点，称为立即调用的函数表达 (Immediately-Invoked Function Expression, IIFE–读做“iffy”)。

在闭包中，可以定义私有变量和函数，外部无法访问它们，从而做到了私有成员的隐藏和隔离。而通过返回对象或函数，或是将某对象作为参数传入，在函数体内对该对象进行操作，就可以公开我们所希望对外暴露的公开的方法与数据。

这，其实就是模块模式的本质。

注1：上面的代码中，最后的一对括号是对匿名函数的调用，因此必不可少。而前面的一对围绕着函数表达式的一对括号并不是必需的，但它可以用来给开发人员一个指示 -- 这是一个 IIFE。也有一些开发者在函数表达式前面加上一个惊叹号（!）或分号（;)，而不是用括号包起来。比如 knockoutjs 的源码大致就是这样的：

!function(参数) {

// 代码

// return something

}(参数);

还有些人喜欢用括号将整个 IIFE 围起来，这样就变成了以下的形式：

(function(参数) {

// 代码

// return something

}(参数));

注2：在有些人的代码中，将 undefined 作为上面代码中的一个参数，他们那样做是因为 undefined 并不是 JavaScript 的保留字，用户也可以定义它，这样，当判断某个值是否是 undefined 的时候，判断可能会是错误的。将 undefined 作为一个参数传入，是希望代码能按预期那样运行。不过我认为，一般情况下那样做并没太大意义。

### 参数输入

JavaScript 有一个特性叫做隐式全局变量（implied globals），当使用一个变量名时，JavaScript 解释器将反向遍历作用域链来查找变量的声明，如果没有找到，就假定该变量是全局变量。这种特性使得我们可以在闭包里随处引用全局变量，比如 jQuery 或 window。然而，这是一种不好的方式。

考虑模块的独立性和封装，对其它对象的引用应该通过参数来引入。如果模块内需要使用其它全局对象，应该将这些对象作为参数来显式引用它们，而非在模块内直接引用这些对象的名字。以 jQuery 为例，若在参数中没有输入 jQuery 对象就在模块内直接引用 $ 这个对象，是有出错的可能的。正确的方式大致应该是这样的：

;(function(q, w) {

// q is jQuery

// w is window

// 局部变量及代码

// 返回

})(jQuery, window);

相比隐式全局变量，将引用的对象作为参数，使它们得以和函数内的其它局部变量区分开来。这样做还有个好处，我们可以给那些全局对象起一个别名，比如上例中的 "q"。现在看看你的代码，是否没有经过对 jQuery 的引用就到处都是"$"？

### 模块输出（Module Export）

有时我们不只是要使用全局变量，我们也要声明和输出模块中的对象，这可以通过匿名函数的 return 语句来达成，而这也构成了一个完整的模块模式。来看一个完整的例子：

varMODULE = (function() {

varmy = {},

privateVariable = 1;

functionprivateMethod() {

// ...

}

my.moduleProperty = 1;

my.moduleMethod =function() {

// ...

};

returnmy;

}());

这段代码声明了一个变量 MODULE，它带有两个可访问的属性：moduleProperty 和 moduleMethod，其它的代码都封装在闭包中保持着私有状态。参考以前提过的参数输入，我们还可以通过参数引用其它全局变量。

#### 输出简单对象

很多时候我们 return 一个对象作为模块的输出，比如上例就是。

另外，使用对象直接量（Object Literal Notation）来表达 JavaScript 对象是很常见的。比如：var x = { p1: 1, p2: "2", f: function(){ /*... */ } }

很多时候我们都能见到这样的模块化代码：

varModule1 = (function() {

varprivate_variable = 1;

functionprivate_method() {/*...*/}

varmy = {

property1: 1,

property2: private_variable,

method1: private_method,

method2:function() {

// ...

}

};

returnmy;

}());

另外，对于简单的模块化代码，若不涉及私有成员等，其实也可以直接使用对象直接量来表达一个模块：

varWidget1 = {

name:"who am i?",

settings: {

x: 0,

y: 0

},

call_me:function() {

// ...

}

};

有一篇文章讲解了这种形式：How Do You Structure JavaScript? The Module Pattern Edition

不过这只是一种简单的形式，你可以将它看作是模块模式的一种基础的简单表达形式，而把闭包形式看作是对它的一个封装。

#### 输出函数

有时候我们希望返回的并不是一个对象，而是一个函数。有两种需求要求我们返回一个函数，一种情况是我们需要它是一个函数，比如 jQuery，它是一个函数而不是一个简单对象；另一种情况是我们需要的是一个“类”而不是一个直接量，之后我们可以用 "new" 来实例它。目前版本的 JavaScript 并没有专门的“类”定义，但它却可以通过 function 来表达。

varCat = (function() {

// 私有成员及代码 ...

returnfunction(name) {

this.name = name;

this.bark =function() {/*...*/}

};

}());

vartomcat =newCat("Tom");

tomcat.bark();

为什么不直接定义一个 function 而要把它放在闭包里呢？简单点的情况，确实不需要使用 IIFE 这种形式，但复杂点的情况，在构造我们所需要的函数或是“类”时，若需要定义一些私有的函数，就有必要使用 IIFE 这种形式了。

另外，在 ECMAScript 第五版中，提出了 Object.create() 方法。这时可以将一个对象视作“类”，并使用 Object.create() 进行实例化，不需使用 "new"。

### Revealing Module Pattern

前面已经提到一种形式是输出对象直接量（Object Literal Notation），而 Revealing Module Pattern 其实就是这种形式，只是做了一些限定。这种模式要求在私有范围内中定义变量和函数，然后返回一个匿名对象，在该对象中指定要公开的成员。参见下面的代码：

varMODULE = (function() {

// 私有变量及函数

varx = 1;

functionf1() {}

functionf2() {}

return{

public_method1: f1,

public_method2: f2

};

}());

## 模块模式的变化

### 扩展

上面的举例都是在一个地方定义模块，如果我们需要在数个文件中分别编写一个模块的不同部分该怎么办呢？或者说，如果我们需要对已有的模块作出扩展该怎么办呢？其实也很简单，将模块对象作为参数输入，扩展后再返回自己就可以了。比如：

varMODULE = (function(my) {

my.anotherMethod =function() {

// added method...

};

returnmy;

}(MODULE));

上面的代码为对象 MODULE 增加了一个 "anotherMethod" 方法。

### 松耦合扩展（Loose Augmentation）

上面的代码要求 MODULE 对象是已经定义过的。如果这个模块的各个组成部分并没有加载顺序要求的话，其实可以允许输入的参数为空对象，那么我们将上例中的参数由 MODULE 改为 MODULE || {} 就可以了：

varMODULE = (function(my) {

// add capabilities...

returnmy;

}(MODULE || {}));

### 紧耦合扩展（Tight Augmentation）

与上例不同，有时我们要求在扩展时调用以前已被定义的方法，这也有可能被用于覆盖已有的方法。这时，对模块的定义顺序是有要求的。

varMODULE = (function(my) {

varold_moduleMethod = my.moduleMethod;

my.moduleMethod =function() {

// 方法重载

// 可通过 old_moduleMethod 调用以前的方法...

};

returnmy;

}(MODULE));

### 克隆与继承（Cloning and Inheritance）

varMODULE_TWO = (function(old) {

varmy = {},

key;

for(keyinold) {

if(old.hasOwnProperty(key)) {

my[key] = old[key];

}

}

varsuper_moduleMethod = old.moduleMethod;

my.moduleMethod =function() {

// override method on the clone, access to super through super_moduleMethod

};

returnmy;

}(MODULE));

有时我们需要复制和继承原对象，上面的代码演示了这种操作，但未必完美。如果你可以使用 Object.create() 的话，请使用 Object.create() 来改写上面的代码：

varMODULE_TWO = (function(old) {

varmy = Object.create(old);

varsuper_moduleMethod = old.moduleMethod;

my.moduleMethod =function() {

// override method ...

};

returnmy;

}(MODULE));

### 子模块（Sub-modules）

模块对象当然可以再包含子模块，形如 MODULE.Sub=(function(){}()) 之类，这里不再展开叙述了。

### 各种形式的混合

以上介绍了常见的几种模块化形式，实际应用中有可能是这些形式的混合体。比如：

varUTIL = (function(parent, $) {

varmy = parent.ajax = parent.ajax || {};

my.get =function(url, params, callback) {

// ok, so I'm cheating a bit :)

return$.getJSON(url, params, callback);

};

// etc...

returnparent;

}(UTIL || {}, jQuery));

## 与其它模块规范或 JS 库的适配

### 模块环境探测

现今，CommonJS Modules 与 AMD 有着广泛的应用，如果确定 AMD 的 define 是可用的，我们当然可以使用 define 来编写模块化的代码。然而，我们不能假定我们的代码必然运行于 AMD 环境下。有没有办法可以让我们的代码既兼容于 CommonJS Modules 或 AMD 规范，又能在一般环境下运行呢？

其实我们只需要在某个地方加上对 CommonJS Modules 与 AMD 的探测并根据探测结果来“注册”自己就可以了，以上那些模块模式仍然有用。

AMD 定义了 define 函数，我们可以使用 typeof 探测该函数是否已定义。若要更严格一点，可以继续判断 define.amd 是否有定义。另外，SeaJS 也使用了 define 函数，但和 AMD 的 define 又不太一样。

对于 CommonJS，可以检查 exports 或是 module.exports 是否有定义。

现在，我写一个比较直白的例子来展示这个过程：

varMODULE = (function() {

varmy = {};

// 代码 ...

if(typeofdefine =='function') {

define(function(){returnmy; } );

}elseif(typeofmodule !='undefined'&& module.exports) {

module.exports = my;

}

returnmy;

}());

上面的代码在返回 my 对象之前，先检测自己是否是运行在 AMD 环境之中（检测 define 函数是否有定义），如果是，就使用 define 来定义模块，否则，继续检测是否运行于 CommonJS 中，比如 NodeJS，如果是，则将 my 赋值给 module.exports。因此，这段代码应该可以同时运行于 AMD、CommonJS 以及一般的环境之中。另外，我们的这种写法应该也可在 SeaJS 中正确执行。

### 其它一些 JS 库的做法

现在许多 JS 库都加入了对 AMD 或 CommonJS Modules 的适应，比如 jQuery, Mustache, doT, Juicer 等。

jQuery 的写法可参考 exports.js:

if(typeofmodule ==="object"&& module &&typeofmodule.exports ==="object") {

module.exports = jQuery;

}else{

if(typeofdefine ==="function"&& define.amd ) {

define("jquery", [],function() {returnjQuery; } );

}

}

if(typeofwindow ==="object"&&typeofwindow.document ==="object") {

window.jQuery = window.$ = jQuery;

}

与前面我写的那段代码有些不同，在对 AMD 和 CommonJS 探测之后，它将 jQuery 注册成了 window 对象的成员。

然而，jQuery 是一个浏览器端的 JS 库，它那样写当然没问题。但如果我们所写的是一个通用的库，就不应使用 window 对象了，而应该使用全局对象，而这一般可以使用 this 来得到。

我们看看 Mustache 是怎么做的：

(function(root, factory) {

if(typeofexports ==="object"&& exports) {

factory(exports);// CommonJS

}else{

varmustache = {};

factory(mustache);

if(typeofdefine ==="function"&& define.amd) {

define(mustache);// AMD

}else{

root.Mustache = mustache;//

}

}

}(this,function(mustache) {

// 模块主要的代码放在这儿

});

这段代码与前面介绍的方式不太一样，它使用了两个匿名函数。后面那个函数可以看作是模块代码的工厂函数，它是模块的主体部分。前面那个函数对运行环境进行检测，根据检测的结果对模块的工厂函数进行调用。另外，作为一个通用库，它并没使用 window 对象，而是使用了 this，因为在简单的函数调用中，this 其实就是全局对象。

再看看 doT 的做法。doT 的做法与 Mustache 不同，而是更接近于我在前面介绍 AMD 环境探测的那段代码：

(function() {

"use strict";

vardoT = {

version:'1.0.0',

templateSettings: {/*...*/},

template: undefined,//fn, compile template

compile:  undefined//fn, for express

};

if(typeofmodule !=='undefined'&& module.exports) {

module.exports = doT;

}elseif(typeofdefine ==='function'&& define.amd) {

define(function(){returndoT;});

}else{

(function(){returnthis|| (0,eval)('this'); }()).doT = doT;

}

// ...

}());

这段代码里的 (0, eval)('this') 是一个小技巧，这个表达式用来得到 Global 对象，'this' 其实是传递给 eval 的参数，但由于 eval 是经由 (0, eval) 这个表达式间接得到的，因此 eval 将会在全局对象作用域中查找 this，结果得到的是全局对象。若是代码运行于浏览器中，那么得到的其实是 window 对象。这里有一个针对它的讨论：http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023

其实也有其它办法来获取全局对象的，比如，使用函数的 call 或 apply，但不给参数，或是传入 null：

varglobal_object = (function(){returnthis; }).call();

你可以参考这篇文章：Javascript的this用法

Juicer 则没有检测 AMD，它使用了如下的语句来检测 CommonJS Modules：

typeof(module) !=='undefined'&& module.exports ? module.exports = juicer :this.juicer = juicer;

另外，你还可以参考一下这个：https://gist.github.com/kitcambridge/1251221

(function(root, Library) {

// The square bracket notation is used to avoid property munging by the Closure Compiler.

if(typeofdefine =="function"&&typeofdefine["amd"] =="object"&& define["amd"]) {

// Export for asynchronous module loaders (e.g., RequireJS, `curl.js`).

define(["exports"], Library);

}else{

// Export for CommonJS environments, web browsers, and JavaScript engines.

Library = Library(typeofexports =="object"&& exports || (root["Library"] = {

"noConflict": (function(original) {

functionnoConflict() {

root["Library"] = original;

// `noConflict` can't be invoked more than once.

deleteLibrary.noConflict;

returnLibrary;

}

returnnoConflict;

})(root["Library"])

}));

}

})(this,function(exports) {

// ...

returnexports;

});

我觉得这个写得有些复杂了，我也未必需要我的库带有 noConflict 方法。不过，它也可以是个不错的参考。

## JavaScript 模块化的未来

未来的模块化方案会是什么样的？我不知道，但不管将来如何演化，作为一种模式，模块模式是不会过时和消失的。

如前所述，尚在制定中的 ES 6 会对模块作出语言级别的定义。我们来看一个实例，以下的代码段摘自“ES6:JavaScript中将会有的几个新东西”：

module Car {

// 内部变量

varlicensePlateNo ='556-343';

// 暴露到外部的变量和函数

exportfunctiondrive(speed, direction) {

console.log('details:', speed, direction);

}

exportmodule engine{

exportfunctioncheck() { }

}

exportvarmiles = 5000;

exportvarcolor ='silver';

};

我不知道 ES 6 将来会否对此作出改变，对上面的这种代码形式，不同的人会有不同的看法。就我个人而言，我十分不喜欢这种形式！

确实，我们可能需要有一种统一的模块化定义方式。发明 AMD 和 RequireJS 的人也说过 AMD 和 RequireJS 应该被淘汰了，运行环境应该提供模块的原生支持。然而，ES 6 中的模块定义是否是正确的？它是否是一个好的解决方案呢？我不知道，但我个人真的很不喜欢那种方式。很多人十分喜欢把其它语言的一些东西生搬硬套到 JavaScript 中，或是孜孜不倦地要把 JavaScript 变成另外一种语言，我相当讨厌这种行为。我并非一个保守的人，我乐意接受新概念、新语法，只要它是好的。但是，ES 6 草案中的模块规范是我不喜欢的，起码，我认为它脱离了现实，否定了开源社区的实践和经验，是一种意淫出来的东西，这使得它在目前不能解决任何实际问题，反而是来添乱的。

按目前的 ES6 草案所给出的模块化规范，它并没有采用既有的 CommonJS Modules 和 AMD 规范，而是定义了一种新的规范，而且这种规范修改了 JavaScript 既有的语法形式，使得它没有办法像 ES5 中的 Object.create、Array.forEach 那样可以利用现有版本的 JavaScript 编写一些代码来实现它。这也使得 ES 6 的模块化语法将在一段时期内处于不可用的状态。

引入新的语法也不算是问题，然而，为了模块而大费周折引出那么多新的语法和定义，真的是一种好的选择么？话说，它解决了什么实质性的问题而非如此不可？现今流行的 AMD 其实简单到只定义了一个 "define" 函数，它有什么重大问题？就算那些专家因种种原因或目的而无法接受 AMD 或其它开源社区的方案，稍作出一些修改和中和总是可以的吧，非要把 JavaScript 改头换面不可么？确实有人写了一些观点来解释为何不用 AMD，然而，那些解释和观点其实大都站不住脚。比如说，其中一个解释是 AMD 规范不兼容于 ES 6！可笑不可笑？ES 6 尚未正式推出，完全实现了 ES 6 的 JavaScript 运行时也没几个，而 AMD 在开源社区中早已十分流行，这个时候说 AMD 不兼容 ES 6，我不知道这是什么意思。

就我看来，现今各种形形色色的所谓标准化工作组，很多时候像是高高在上的神仙，他们拉不下脸全身心地参与到开源社区之中，他们就是要作出与开源社区不同的规范，以此来彰显他们的工作、专业与权威。而且，很多时候他们过于官僚，又或者夹杂在各大商业集团之间举棋不定。我不否认他们工作的重要性，然而，以专家自居而脱离或否定开源社区的实践，以及商业与政治的利益均衡等，使得他们的工作与开源社区相比，在技术的推动与发展上成效不足甚至添乱。

回到 ES 6 中的模块，想想看，我需要修改我的代码，在其中加上诸如 module, export, import 之类的新的语法，修改之后的代码却没办法在现今版本的 JavaScript 中运行，而且，与现今流行的模块化方案相比，这些工作也没什么实质性的帮助，想想这些，我只感觉像是吃了一个苍蝇。

ES 6 的发展当然不会因为我的吐嘈而有任何变化，我也不愿再展开讨论。未来的模块化方案具体是什么样的无法知晓，但起码我可以得到以下的结论：

模块模式不会过时

ES 6 不会接纳 AMD 等现有方案，但不管如何，JavaScript 将会有语言级别的模块定义

ES 6 中的模块在一段时期内是不可用的

即使 ES 6 已达到实用阶段，现今的模块化方案仍会存在和发展
