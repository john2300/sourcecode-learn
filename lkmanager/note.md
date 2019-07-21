img标签引入图片路径,../../采用这种方式无法加载,因为webpack打包的时候,用的打包的路径,不会提前分析,应该设置为一个对象,保存在这个对象里,引入这个对象


react 引入jquery的问题,这里采用的全局index.html里直接引入<script src="jquery.js"></script>,没有像模块那样引入.


<a>标签中href="javascript:;"表示什么意思？执行一段空白的javascript语句，返回空或者false值，从而防止链接跳转。跟当前a标签无关，这段代码始终都会执行。