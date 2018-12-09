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


var Container = function(x){
    this.__value =x
}

//函数式编程一般约定,函子有一个of方法

Container.of = x => new Container(x);
//Container.of('abcd');
//一般约定,函子的标志就是容器具有map方法.该方法将容器里面的每一个值,映射到另一个容器

Container.prototype.map = function(f){
    return Container.of(f(this.__value))
}

Container.of(3)
    .map(x=>x+1)  //=>Container(4)
    .map(x=>'Result is'+x)  //=>Container('Result is 4')





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


// 错误处理,Either
var Left = function(x){
    this.__value = x;
}
var Right = function(x){
    this.__value = x;
}


Left.of = function(x){
    return new Left(x);
}
Right.of = function(x){
    return new Right(x);
}

//这里不同!!!

Left.prototype.map = function(f){
    return this;
}
Right.prototype.map = function(f){
    return Right.of(this.__value);
}

//Left和Right唯一的区别就在于map方法的实现,Rigth.map的行为和我们之前提到的Map函数一样,但是Left.map就很不同了:它不会对容器做任何事情,只是很简单地把这个容器拿进来又扔出去.这个特性意味着,Left可以用来传递一个错误消息.

// 以上使用实例

var getAge = user => user.age?Right.of(user.age):Left.of("ERROR")

getAge({name:'stark',age:'21'}).map(age=>'Age is' + age);
//=>Right('Age is 21')

getAge({name:'stark'}).map(age=>'Age is'+age);
//=>Left("ERROR")

//Left可以让调用链中任意一环的错误立刻返回到调用链的尾部,这给我们错误处理带来了很大的方便,再也不用一层又一层的try/catch