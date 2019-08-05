import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link,Switch,Redirect } from 'react-router-dom'
import * as constants from "./Store/actionTypes";


// import Aside from './Components/Aside/Aside';
// import routes from './Router';
// import * as constants from "./Store/actionTypes";
import Home from './Pages/Home/Home'
import SowingRouter from './Pages/Sowing/router'
import CourseRouter from './Pages/Course/router'
import LayOut from './Components/LayOut'
import Login from './Pages/Mine/Login'
import ErrorPage from './Pages/ErrorPage'
import User from './Pages/User/User'
import MineRouter from './Pages/Mine/router'






class App extends Component {
  componentWillMount() {
      this.props.reqLocalData();
  }

  render() {
      // 主面板
      let LayOutRouter = (
          <LayOut>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/user" component={User}/>
                  <Route path="/mine" component={MineRouter}/>
                  <Route path="/sowing" component={SowingRouter}/>
                  <Route path="/course" component={CourseRouter}/>
                  {/* 路径没有匹配到的时候显示 */}
                  <Route component={ErrorPage}/>
              </Switch>
          </LayOut>
      );
      return (
          <Router>
              <Switch>
                  <Route
                      exact
                      path="/"
                      render={
                          this.props.userData ?
                              (props)=> LayOutRouter :
                              ()=> <Redirect to="/login"  push/>
                      }
                      //加上push参数会调用history.pushState， <Redirect push to={{...} /> 此时浏览器将url加入到浏览历史中，浏览器后退键有效
                      //刚开始进来/先匹配到,判断去/login页面,没问题
                      //判断有则渲染
                  />
                  <Route path="/login" component={Login}/>
                      {/* 这里是不是匹配了两次了? */}
                  <Route path="/" render={props => LayOutRouter}/>
              </Switch>
          </Router>
      );
  }
}

const mapDispatchToProps = (dispatch)=>{
return {
    reqLocalData(){
      //sessionStorage是全局的
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        dispatch({
            type: constants.INIT_USER_DATA,
            userData
        });
    }
}
};

const mapStateToProps = (state)=>{
  return {
      userData: state.userData
  }
};

//mapStateToProps获取状态,
export default connect(mapStateToProps, mapDispatchToProps)(App);


// class App extends Component {
//   // componentWillMount() {
//   //   this.props.reqLocalData();
//   // }
//   render() {
//     return (
//       // <div>
//       <Router>
//         <Header />
//         <div className='main'>
//           <Aside />
//           {/* {
//             routes.map((route, index) => {
//               if (route.exact) {
//                 return (
//                   <Route path={route.path} key={index} exact render={props => (<route.component {...props} />)} />
//                 );
//               } else {
//                 return (
//                   <Route path={route.path} key={index} render={props => (<route.component {...props} />)} />
//                 );
//               }
//             })
//           } */}

//           <Route exact path="/" component={Home} />
//           {/* <Route path="/user" component={User} /> */}
//           {/* <Route path="/mine" component={MineRouter} /> */}
//           <Route path="/sowing" component={SowingRouter} />
//           <Route path="/course" component={CourseRouter} />
//         </div>
//       </Router>
//       // </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     reqLocalData() {
//       const userData = JSON.parse(sessionStorage.getItem('userData'));
//       dispatch({
//         type: constants.INIT_USER_DATA,
//         userData
//       });
//     }
//   }
// };

// const mapStateToProps = (state) => {
//   return {
//     userData: state.userData
//   }
// };
// //mapStateToProps获取状态,mapDispatchToProps派发行为
// // export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;



























/**
 *
 * React-Redux提供一个connect方法使你可以从Redux store中读取数据（以及当store更新后，重新读取数据）

connect方法接收两个参数，都是可选参数：

mapStateToProps：每当store state发生变化时，就被调用。接收整个store state，并且返回一个该组件所需要的数据对象
mapDispatchToProps：这个参数可以是一个函数或对象

如果是一个函数，一旦该组件被创建，就会被调用。接收dispatch作为一个参数，并且返回一个能够使用dispatch来分发actions的若干函数组成的对象
如果是一个action creators构成的对象，每一个action creator将会转化为一个prop function并会在调用时自动分发actions。注意： 我们建议使用这种形式。



React-Redux 提供<Provider/>组件，能够使你的整个app访问到Redux store中的数据



每个页面都引入了actionCreators.js,这个文件都会去加载API,请求相应的数据,每个页面都是单独请求一次,这个store={store},拿到的是全局的数据,那么有点搞不懂了,这个全局不是所有页面的所有,而是加载页面的所有.React-Redux 提供<Provider/>组件，能够使你的整个app访问到Redux store中的数据.这句话说的能访问到所有react store中的数据.整个过程还是没弄懂,还是那里,每个页面都有请求,又在请求数据,又在接受store={store}传递过来的值

突然明白了,是先进入页面,store={store}确实生效了,但是这个时候没有值,要先请求数据,拿到数据后,store里面的
 */
