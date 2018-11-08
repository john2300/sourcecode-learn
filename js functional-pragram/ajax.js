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