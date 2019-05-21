1.redux-saga

在reducers中的所有操作都是同步的并且是纯粹的,即reducer都是纯函数,纯函数是指一个函数的返回结果只依赖它的参数,并且在执行过程中不会对外部产生副作用,即给它传什么就吐出什么.

但是在实际开发应用中,我们希望做一些异步的(ajax请求)且不纯粹的操作(如改变外部的状态),这些函数式编程范式中被称为'副作用'

redux-saga 就是用来处理上述副作用(异步任务)的一个中间件,它是一个接收事件,并可能触发新事件的过程管理者,为你的应用管理复杂的流程

2.redux-saga工作原理

sagas采用Generator函数来yield Effects(包含指令的文本对象)

Generator函数的作用是可以暂时执行,再次执行的时候从上次暂停的地方继续执行

Effect是一个简单的对象,该对象包含了一些给middleware解释执行的信息.

你可以通过effects API如fork,call,take,put,cancel等来创建Effect,redux-saga



redux-saga分类

worker saga做左右的工作,如调用API,进行异步请求,获取异步封装结果

watcher saga监听被dispatch的actions当接受到action或者知道其被触发时,调用worker执行任务

root saga立即启动saga的唯一入口
