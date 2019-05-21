class HelloPlugin {
  //options接收到webpack.config.js插件实例化的参数
    constructor(options){
        console.log(options);
        this.options = options;
    }
    //每个插件都需要提供 一个apply方法,方法名字是定死的,compiler为编译对象
    apply1(compiler){
        //compiler要启动一次新的编译
        //compiler.plugin在下一个版本会被废弃
        compiler.plugin('compilation',function(compilation){
            compilation.plugin('optimize-chunk-modules',function(){
                console.log('optimize-chunk-modules');
            });
        })
    }
    apply(compiler){
        //compiler要启动一次新的编译
        compiler.hooks.compilation.tap('compilation',function(compilation,params){
            compilation.hooks.optimizeChunkModules.tap('optimizeChunkModules',function(chunks, modules){
                    //console.log(chunks);
                    //console.log(modules);
            });
        });
    }
}
module.exports = HelloPlugin;



this.compiler = compiler;

this.resolver = compiler.resolvers;//模块解析器

this.mainTemplate = new mainTemplate(this.outputOptions);//生成主模块js

this.chunkTemplate = new chunkTemplate(this.outputOptions,this.mainTemplate);//异步加载的模块js

