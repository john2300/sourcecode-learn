webpack打包前的html文件没有引入js文件,打包后会自动引入js文件?

有错误,无法定位到错误.需要源码映射:devtool:

production和development模式打包,每次都要打包才能看到文件,webpack-dev-server调试,不会生成实体文件,文件只存在内存中.配置watch:true