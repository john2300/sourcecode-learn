socket.io包含客户端和服务器端的nodejs,在不同浏览器和移动设备上使用的实时应用

它会自动根据浏览器从webSocket,Ajax长轮询,iframe流等等各种方式选择最佳的方式来实现网络实时应用,最低兼容ie5.5


服务器运行后会在根目录下生成socket.io的客户端js文件,客户端可以通过固定路径添加引用

客户端加载socket.io文件后会得到一个全局的对象io

connect函数可以接受一个url参数,url可以socket服务的http完整地址,也可以是相对路径,如果省略则表示默认连接当前路径创建index.html



服务器端划分命名空间

io.on('connection',socket=>{})

io.of('/news').on('connection',socket => {})


客户端连接命名空间

let socket = io('http://localhost/');

let socket = io('http://localhost/news');


房间

房间是socket.io提供的一个非常好的功能,房间相对于为指定的一些客户端提供了一个命名空间,所有在房间里的广播和通信都不会影响到房间以外的客户端

