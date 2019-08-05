import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCourseClassificationAction } from './../../Store/actionCreators';
class CourseAdd extends Component {
  constructor(props){
    super(props);
    const addCourseData = this.props.addCourseData;
    this.state = {
      course_name:addCourseData.course_name
    }
  }
  componentDidMount(){
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="body course-add">
          <ol className="breadcrumb">
            <li><Link to='/course'>课程管理</Link></li>
            <li className="active">课程添加</li>
          </ol>
          <div className="steps create">
            <div className="title">
              <h5>创建课程 <small>CREATE A COURSE</small></h5>
            </div>
            <div action="" className="form-horizontal  col-md-offset-3 col-md-6">
              <div className="form-group">
                <label htmlFor="" className="col-md-2 control-label">课程名称</label>
                <div className="col-md-9">
                  <input type="text"
                   className="form-control input-sm"
                    placeholder="请填写课程名称"
                    value={this.state.course_name}
                    onChange={(e)=>this._dealInputValue(e)}
                    />
                  <small className="text-danger">注意: 课程名称即对外展示的信息</small>
                </div>
              </div>
              <div className="col-md-11">
                {/* <a href="course_add_one.html" className="btn btn-danger btn-sm pull-right">创建课程</a> */}
                {/* <Link to='/course/add_one' className="btn btn-danger btn-sm pull-right">创建课程</Link> */}
                <button  className="btn btn-danger btn-sm pull-right"
                  onClick={()=>this._dealClick()}
                >创建课程</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  _dealInputValue(e){
    this.setState({
      course_name:e.target.value
    })
  }
  _dealClick(){
    //判断输入是否为空
    const {course_name} = this.state;
    if(course_name === '' || course_name === undefined){
      alert('课程名称不能为空!');
      return;
    }
    //跳转到下一级页面
    this.props.addCourseData.course_name = course_name;
    this.props.history.push('/course/add_one');
  }
}
  
const mapStateToProps = (state) => {
	return {
		addCourseData: state.addCourseData
	}
}

// const mapDispatchToprops = (dispatch) => {
// 	return {
// 		reqAddCourseData() {
// 			// const action = getAddCourseDataAction();
// 			// dispatch(action);
// 		}
// 	}
// }
export default connect(mapStateToProps, null)(CourseAdd);