<button onClick={setTrue(!isTrue)}>change</button>
错误信息:Uncaught Invariant Violation: Too many re-renders. React limits the number of renders to prevent an infinite loop.

React是怎么区别多次调用的hooks的呢？

我们都知道在类组件中可以在componentDidMount和componentDidUpdate中执行副作用，那么在函数组件中useEffect的参数函数就具有类组件的这两个生命周期的用途，如果useEffec的第一个参数有返回值为函数的话，函数的返回值相当于componentWillUnmount。可以说useEffect把这三个API合成了一个。
最常见的做法就是就是在函数参数中写事件注册，在函数的返回函数中写事件销毁。


window.removeEventListener("resize", resizeHandle),移除监听函数的场景是什么