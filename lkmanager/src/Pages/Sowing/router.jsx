import SowingAdd from './SowingAdd';
import SowingList from './SowingList';
import SowingEdit from './SowingEdit';
import { BrowserRouter as Router, Route, Link,Redirect } from 'react-router-dom';
import React, { Component } from 'react';

class SowingRouter extends Component {
  render() {
    return (
      <Router>
        <Route path="/sowing/list" component={SowingList}/>
        <Route path="/sowing/add" component={SowingAdd}/>
        <Route path="/sowing/edit" component={SowingEdit}/>
        <Redirect exact form="/sowing" to="/sowing/list"/>
      </Router>
    );
  }
}

export default SowingRouter;