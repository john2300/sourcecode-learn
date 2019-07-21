import Home from './../Pages/Home/Home';
import User from './../Pages/User/User';
import Mine from '../Pages/Course/CourseList';
import Course from '../Pages/Course/CourseList';
import Sowing from './../Pages/Sowing/Sowing';
import ErrorPage from './../Pages/ErrorPage/ErrorPage';
const routes = [
  {
    path:'/',component:Home,exact:true
  },
  {
    path:'/user',component:User,exact:true
  },
  {
    path:'/home',component:Home,exact:true
  },
  {
    path:'/course',component:Course,exact:true
  },
  {
    path:'/mine',component:Mine,exact:true
  },
  {
    path:'/sowing',component:User,exact:true
  }
]

export default routes;