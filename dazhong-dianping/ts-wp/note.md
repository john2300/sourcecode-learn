文件夹说明：

server做bff架构

web前端          

tests单测文件


















在package.json里,pretest的意思是在test之前执行

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "pretest": "echo 22"
  },



 "client:dev":"",
  "client:prod":""
并在在scripts>client下,写上sh脚本,能让package.json分离,再能够做webpack分布式集群的编译,集群是多台设备

webapck慢是因为loader,要stree



yarn add scripty


  "client:dev": "scripty",
  "client:prod": "scripty"

  这样写能定位到sh脚本

  出现一下错误:Warning: scripty - ignoring script "/home/john/Desktop/sourcecode-learn/ts-wp/scripts/client/dev.sh" because it was not executable. Run `chmod +x "/home/john/Desktop/sourcecode-learn/ts-wp/scripts/client/dev.sh" if you want scripty to run it.

  直接运行chmod +x "/home/john/Desktop/sourcecode-learn/ts-wp/scripts/client/dev.sh"即可解决,意思是给这个shell脚本开放运行权限

  可以在shell脚本里让其他服务器编译其他活,本服务器做主要的活,ssh 免密登录到另外一个服务器,让其运行上面的shell脚本,最后scp dist的文件夹里


bin>tswp文件是个本项目的小shell,暂时不懂这个有什么作用,以后怎么操作



src>web目录下介绍:
  assets静态资源
  models前端所有的store
  pages页面,组装所有的components
  components组件
  routes前端路由
  utils工具模块
  index.html
  index.tsx
以上可以做一个非常传统的spa

tsconfig.json不要在网上随便找个就帖进来


错误提示:Cannot read property 'customizeArray' of undefined,网上查询是webpack-merge报错,配置出错

快速检查dist文件夹编译出的文件是否正确,新建一个index.html,引入dist里的编译文件


vue-cli 有个很友好的提示工具：friendly-errors-webpack-plugin

插件：webpack-build-notifier，弹出窗口成功编译，意义不大



遇到问题,组件没办法显示出来,异步组件是在编译后会是一个promise,也就是说在dist文件夹里的app.js应该有个promise类型的东西,并且异步组件需要在then里执行,但是app.js里的异步组件还是同步的,并没有then.看看awsome-typescript-loader有没有解决的办法,这个比较难,换成babel-loader


本地异步请求包的插件:react-hooks-fetch,如果没有太多状态的变化可以使用这个

这个.babelrc和在webpack.config.js里配置有什么区别

出现错误,因为impSupport for the experimental syntax 'dynamicImport' isn't currently enabled 
16 | const Home = lazy(() => {
17 |   import(/*webpackChunkName:"home" */ "../components/home")
   |   ^
18 | })
原因无法动态引入,就是无法异步加载这个模块,dynamicImport这个不是包,去babel官网可以搜索到@babel/plugin-syntax-dynamic-import这个包,这个才是需要安装的包

mobx-react-lite:专门为hooks设计的状态管理库

摘抄网上的资料:

二、原理
npm 脚本的原理非常简单。每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。

这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写mocha test就可以了。


"test": "mocha test"
而不用写成下面这样。


"test": "./node_modules/.bin/mocha test"
由于 npm 脚本的唯一要求就是可以在 Shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面。

npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是0，npm 就认为这个脚本执行失败。

-----有些.bin文件夹里的命令可以直接写,而不必写路径,奇怪的是写webpack,webpack这个命令没有通过package.json里的scripts啊?
我猜是因为webpack命令是写在node全局配置里,就像npm一样




三、通配符
由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。


"lint": "jshint *.js"
"lint": "jshint **/*.js"
上面代码中，*表示任意文件名，**表示任意一层子目录。

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。


"test": "tap test/\*.js"


------要运行多个文件时可以考虑这个,注意通配符要转义




五、执行顺序
如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用&符号。


$ npm run script1.js & npm run script2.js
如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。


$ npm run script1.js && npm run script2.js
这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：script-runner、npm-run-all、redrun。

----并发操作我能想到的就是打包节省时间



六、默认值
一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。


"start": "node server.js"，
"install": "node-gyp rebuild"
上面代码中，npm run start的默认值是node server.js，前提是项目根目录下有server.js这个脚本；npm run install的默认值是node-gyp rebuild，前提是项目根目录下有binding.gyp文件。


------上面的start在react里用的不少啊





在项目中需要导入json数据作为对象使用
但是在ts中一直会报错

方式1：最开始的解决方案是在根目录建立一个typings.d.ts

// typings.d.ts
declare module "*.json" {
    const value: any;
    export default value;
}
这种方法可以使用，但是会报错

import * as root from '../mock/stocklist_1d.json'
console.log(root ) // ok
console.log(root.chartlist) //ts编译报错
方式2：改成下面的方式。但是还是不成功

stock_list_1d.d.ts文件是通过下面的连接生成的
http://www.json2ts.com/#

求老司机带路

// index.ts
import root from '../mock/stocklist_1d.json';
console.log(root);
// stock_list_1d.d.ts
export interface Stock {
    symbol: string;
}

export interface Chartlist {
    volume: number;
    avg_price: number;
    current: number;
    time: string;
}

export interface RootObject {
    stock: Stock;
    success: string;
    chartlist: Chartlist[];
}

const root: RootObject;
export default root;
// stock_list_1d.json
{
    "stock": {
        "symbol": "SH601009"
    },
    "success": "true",
    "chartlist": [
        {
            "volume": 359800,
            "avg_price": 11.87,
            "current": 11.87,
            "time": "Thu Mar 16 09:30:00 +0800 2017"
        },
        {
            "volume": 78300,
            "avg_price": 11.87,
            "current": 11.89,
            "time": "Thu Mar 16 09:31:00 +0800 2017"
        }
    ]
}


这是我在知乎问题 Typescript有什么冷门但是很好用的特性? 的回答。

Node.js 模块是允许直接导入 JSON 文件的，但是 ES Module 现在还不支持，TS 在 2.9 （18年5月17日还未发布）之前也不支持。日常中使用 JSON 最多的场景就是 配置文件了，如果要使用的话需要使用下面一些 trick 来支持。

这里有个 JSON 文件

{
  "//": "student.json",
  "name": "test",
  "age": 23
}
复制代码
如果需要导入的话，需要先定义类型。

// student.d.ts
declare module "*student.json" {
  export interface IStudent {
    name: string;
    age: number;
  }
  export const student: IStudent
}
复制代码
这里使用 *student.json 是因为导入的时候有路径符号，这里要用 * 匹配。

最后在 tsconfig.json 文件中包含这些类型定义文件。

{
  "//": "tsconfig.json",
  "include": ["src/**/*", "./myTypes/*.d.ts"],
  "exclude": ["node_modules"]
}
复制代码
现在我们就可以直接在文件中引入了，TS 会智能的提示类型。

import { log } from "console";
// 路径为 `./student.json` 
// 所以上面声明模块时用了通配符 `declare module "*student.json"`
import { student } from "./student.json";
 
log(student.age);
log(student.name);
复制代码
TypeScript 2.9 即将发布，到时候就可以直接使用 JsonModule 了。