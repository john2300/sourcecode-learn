import * as React from "react";

//lazy和Suspend解决文件过大的问题,这两个基于异步的方法
const {
  lazy,
  Suspense
} = React;
import { Switch, RouteProps, Route } from "react-router-dom"

//同步组件写法
// import Home from "../components/home"
import Loading from "../components/loading"


//异步组件
const Home = lazy(() => 
  import(/*webpackChunkName:"home" */ "../components/home")
)

const Banner = lazy(() => 
  import(/* webpackChunkName:"banner"*/ "../components/banner")
);

const routes: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path:"/banner",
    exact: true,
    component: Banner
  }

]
//为什么有些=>后面是{},有些又是()
//有return就是{},没return是()
const Routes = () => (
    <Suspense fallback={<Loading />}>
    <Switch>
      {
        routes.map(r => {
          const { path, exact, component } = r;
          console.log(r);
          const LazyCom = component;
          return (
            <Route key={path+""} exact={exact} path={path} render={()=>(
              <LazyCom />
            )} />
          )
        })
      }
    </Switch>
  </Suspense>
)  


export default Routes;