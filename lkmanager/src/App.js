import React, { Component } from 'react';
//React-Redux 提供<Provider/>组件，能够使你的整个app访问到Redux store中的数据
import { Provider } from 'react-redux';
import {connect} from "react-redux";
import store from './Store/';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Header from './Components/Header';
import Aside from './Components/Aside';
import routes from './Router';
import * as constants from "./Store/actionTypes";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <div className='main'>
            <Aside />
            {
              routes.map((route,index)=>{
                if(route.exact){
                  return (
                    <Route path={route.path} key={index} exact render={props=>(<route.component {...props}/>)}/>
                  );
                }else{
                  return (
                    <Route path={route.path} key={index} render={props=>(<route.component {...props}/>)}/>
                  );
                }
              })
            }
          </div>
        </Router>
      </Provider>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
      reqLocalData(){
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
//mapStateToProps获取状态,mapDispatchToProps派发行为
export default connect(mapStateToProps, mapDispatchToProps)(App);


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
