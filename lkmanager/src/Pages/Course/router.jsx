import React,{ Component } from "react";
import { Switch,Route } from "react-router-dom";
import CourseAdd from "./CourseAdd";
import CourseCategory from "./CourseCategory";
import CourseList from "./CourseList";
import CourseTopic from "./CourseTopic";

class CourseRouter extends Component{
  render(){
    return (
      <Switch>
        <Route path='/course/list' Component={CourseList}></Route>
        <Route path='/course/category' Component={CourseList}></Route>
        <Route path='/course/topic' Component={CourseList}></Route>
        <Route path='/course/add' Component={CourseList}></Route>
      </Switch>
    );
  }
}
export default CourseRouter;