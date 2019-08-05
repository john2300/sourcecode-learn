img标签引入图片路径,../../采用这种方式无法加载,因为webpack打包的时候,用的打包的路径,不会提前分析,应该设置为一个对象,保存在这个对象里,引入这个对象


react 引入jquery的问题,这里采用的全局index.html里直接引入<script src="jquery.js"></script>,没有像模块那样引入.


<a>标签中href="javascript:;"表示什么意思？执行一段空白的javascript语句，返回空或者false值，从而防止链接跳转。跟当前a标签无关，这段代码始终都会执行。








大问题:在index.html里引入jquery,在index.js里引入boostrap,如果在地址栏直接二级路由页面,样式会失效,提示没有jquery




FormData使用方法详解
96  张培跃  22d8d123 271c 4d80 9c59 6990844a9e37 
 1.6 2018.07.16 21:22 字数 250 阅读 61621评论 7喜欢 33
FormData的主要用途有两个：
1、将form表单元素的name与value进行组合，实现表单数据的序列化，从而减少表单元素的拼接，提高工作效率。
2、异步上传文件
一、创建formData对象
1、创建一个空对象：
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//可以通过append()方法来追加数据
formdata.append("name","laotie");
//通过get方法对值进行读取
console.log(formdata.get("name"));//laotie
//通过set方法对值进行设置
formdata.set("name","laoliu");
console.log(formdata.get("name"));//laoliu
2、通过表单对formData进行初始化
创建表单：

<form id="advForm">
    <p>广告名称：<input type="text" name="advName"  value="xixi"></p>
    <p>广告类别：<select name="advType">
        <option value="1">轮播图</option>
        <option value="2">轮播图底部广告</option>
        <option value="3">热门回收广告</option>
        <option value="4">优品精选广告</option>
    </select></p>
    <p><input type="button" id="btn" value="添加"></p>
</form>
通过表单元素作为参数，实现对formData的初始化：

//获得表单按钮元素
var btn=document.querySelector("#btn");
//为按钮添加点击事件
btn.onclick=function(){
    //根据ID获得页面当中的form表单元素
    var form=document.querySelector("#advForm");
    //将获得的表单元素作为参数，对formData进行初始化
    var formdata=new FormData(form);
    //通过get方法获得name为advName元素的value值
    console.log(formdata.get("advName"));//xixi
    //通过get方法获得name为advType元素的value值
    console.log(formdata.get("advType"));//1 
}
二、操作方法
1、通过get(key)与getAll(key)来获取相对应的值
// 获取key为age的第一个值
formdata.get("age"); 
 // 获取key为age的所有值，返回值为数组类型
formdata.getAll("age");
2、通过append(key,value)在数据末尾追加数据
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//通过append()方法在末尾追加key为name值为laoli的数据
formdata.append("name","laoli");
//通过append()方法在末尾追加key为name值为laotie的数据
formdata.append("name","laotie");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoliu
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoliu", "laoli", "laotie"]
3、通过set(key, value)来设置修改数据
key的值不存在，会添加一条数据

//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//如果key的值不存在会为数据添加一个key为name值为laoliu的数据
formdata.set("name","laoli");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoli
key的值存在，会修改对应的value值

//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//通过append()方法在末尾追加key为name值为laoliu2的数据
formdata.append("name","laoliu2");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoliu
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoliu", "laoliu2"]

//将存在的key为name的值修改为laoli
formdata.set("name","laoli");
//通过get方法读取key为name的第一个值
console.log(formdata.get("name"));//laoli
//通过getAll方法读取key为name的所有值
console.log(formdata.getAll("name"));//["laoli"]
4、通过has(key)来判断是否存在对应的key值
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
//判断是否包含key为name的数据
console.log(formdata.has("name"));//true
//判断是否包含key为age的数据
console.log(formdata.has("age"));//false
5、通过delete(key)可以删除数据
//通过FormData构造函数创建一个空对象
var formdata=new FormData();
//通过append()方法在末尾追加key为name值为laoliu的数据
formdata.append("name","laoliu");
console.log(formdata.get("name"));//laoliu
//删除key为name的值
formdata.delete("name");
console.log(formdata.get("name"));//null
三、通过XMLHttpRequest发送数据
创建表单：

<form id="advForm">
    <p>广告名称：<input type="text" name="advName" value="xixi"></p>
    <p>广告类别：<select name="advType">
        <option value="1">轮播图</option>
        <option value="2">轮播图底部广告</option>
        <option value="3">热门回收广告</option>
        <option value="4">优品精选广告</option>
    </select></p>
    <p>广告图片：<input type="file" name="advPic"></p>
    <p>广告地址：<input type="text" name="advUrl"></p>
    <p>广告排序：<input type="text" name="orderBy"></p>
    <p><input type="button" id="btn" value="添加"></p>
</form>
发送数据：

var btn=document.querySelector("#btn");
btn.onclick=function(){
    var formdata=new FormData(document.getElementById("advForm"));
    var xhr=new XMLHttpRequest();
    xhr.open("post","http://127.0.0.1/adv");
    xhr.send(formdata);
    xhr.onload=function(){
        if(xhr.status==200){
            //...
        }
    }
}




Duplicate declaration "constants",错误为重复声明



2019.7.27
进入根页面的时候,有些时候刷新会报错,报错来自于数据请求失败,来自actionCreators.js的homeData数据请求
没网了,解决

7.31
express的错误处理以及URLSearchParams对象

对于表单数据FormData类型,前端可以用URLSearchParams对象处理,后端可以用
formidable对象


缺少验证文件,输入框的

用for循环插入,只查了50条



从后端拿到的xx数组,数组里面有非常多的对象,xx[0]不显示错误,xx[0].yy显示错误,卧槽