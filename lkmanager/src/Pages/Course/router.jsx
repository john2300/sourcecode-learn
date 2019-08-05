import React,{ Component } from "react";
import { Switch,Route, Redirect,Router} from "react-router-dom";
import CourseAdd from "./CourseAdd";
import CourseClassification from "./CourseClassification";
import CourseList from "./CourseList";
import CourseTopic from "./CourseTopic";
import CourseAddOne from './CourseAddOne';
import CourseAddTwo from './CourseAddTwo';
import CourseThree from './CourseThree';
import CourseClassificationAdd from './CourseClassificationAdd'
class CourseRouter extends Component{
  
  render(){
    // console.log('router')
    return (
      <Switch>
        撒大声地所多撒多撒
        <Route path='/course/list' component={CourseList}></Route>
        <Route path='/course/classification' component={CourseClassification}></Route>
        <Route path='/course/classification_add' component={CourseClassificationAdd}></Route>
        <Route path='/course/topic' component={CourseTopic}></Route>
        <Route path='/course/add' component={CourseAdd}></Route>
        <Route path='/course/add_one' component={CourseAddOne}></Route>
        <Route path='/course/add_two' component={CourseAddTwo}></Route>
        <Route path='/course/add_three' component={CourseThree}></Route>
        <Redirect exact form="/course" to="/course/list"/>
      </Switch>
    );
  }
}
export default CourseRouter;