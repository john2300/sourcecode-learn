import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCourseClassificationAction } from './../../Store/actionCreators';
class CourseAddOne extends Component {
  constructor(props) {
    super(props);
    
    const addCourseData = this.props.addCourseData;
    this.state = {
      course_name: addCourseData.course_name,
      course_title: addCourseData.course_title,
      course_sub_title: addCourseData.course_sub_title,
      course_teacher: addCourseData.course_teacher,
      course_serialize_status: '非连载状态',
      main_category: addCourseData.main_category,
      sub_category: addCourseData.sub_category,
      course_intro: addCourseData.course_intro,
      course_tag: addCourseData.course_tag,
      sub_course: []
    }
  }
  // componentWillMount(){

  // }
  render() {
    const {
      course_name,
      course_title,
      course_sub_title,
      course_teacher,
      course_serialize_status,
      main_category,
      sub_category,
      course_intro,
      course_tag,
      course_page,
      // sub_course
    } = this.state;
    const { courseClassificationData } = this.props;
    // console.log(sub_course);

    // console.log(courseClassificationData)
    let sub_course = []
    if(courseClassificationData.length !== 0){
     sub_course = courseClassificationData[0].sub_course;
    }
    
    return (
      <div className="container-fluid">
        <div className="body course-add">
          <ol className="breadcrumb">
            <li><Link to='/course'>课程管理</Link></li>
            <li className="active">课程添加</li>
          </ol>
          <div className="steps">
            <ul className="forwards list-unstyled">
              <li>
                <Link to='/course/add_one' className="active">
                  <b>1</b>
                  基本信息
                      </Link>
              </li>
              <li>
                <Link to='/course/add_two'>
                  <b>2</b>
                  课程图片
                      </Link>
              </li>
              <li>
                <Link to='/course/add_three'>
                  <b>3</b>
                  课时管理
                      </Link>
              </li>
            </ul>
            <div className="content">
              <div className="title">
                <h5>课程信息</h5>
              </div>
              <div action="" className="basic form-horizontal">
                <div className="form-group">
                  <label for="" className="col-md-2 control-label">标题</label>
                  <div className="col-md-8">
                    <input type="text" name='course_title' className="form-control input-sm" value={course_title} onChange={(e) => this._dealInputValue(e, 'course_title')} />
                  </div>
                </div>
                <div className="form-group">
                  <label for="" className="col-md-2 control-label">副标题</label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={course_sub_title}
                      placeholder="填写课程的标题"
                      name='course_sub_title'
                      onChange={(e) => this._dealInputValue(e, 'course_sub_title')}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label for="" className="col-md-2 control-label">讲师</label>
                  <div className="col-md-8">
                    <select name="course_teacher"
                      className="form-control input-sm"
                      value={course_teacher}
                      onChange={(e) => this._dealInputValue(e, 'course_teacher')}
                    >
                      <option value="叶建华">叶建华</option>
                      <option value="高新强">高新强</option>
                      <option value="王顺子">王顺子</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label for="" className="col-md-2 control-label">连载状态</label>
                  <div className="col-md-8">
                    <select name="course_serialize_status"
                      className="form-control input-sm"
                      value={course_serialize_status}
                      onChange={(e) => this._dealInputValue(e, 'ccourse_serialize_status')}>
                      <option value="非连载课程">非连载课程</option>
                      <option value="更新中">更新中</option>
                      <option value="已完结">已完结</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label for="" className="col-md-2 control-label">分类</label>
                  <div className="col-md-8">
                    <select
                      name="main_category"
                      className="form-control input-sm"
                      value={main_category}
                      onChange={(e) => this._dealInputValue(e, 'main_category')}
                    >
                      {

                        courseClassificationData.map((c, index) => (
                          <option value={c.main_title} key={c._id}>{c.main_title}</option>
                        ))
                      }
                    </select>
                    <select
                      name="sub_category"
                      className="form-control input-sm"
                      value={sub_category}
                      onChange={(e) => this._dealInputValue(e, 'sub_category')}
                    >

                      {/* {
                        courseClassificationData.map((c, index) => {

                          if (c.main_title === main_category) {
                            return c.sub_course.map((cs, index) => (
                              <option value={cs.sub_title} key={index}>{cs.sub_title}</option>
                            ))
                          } else if (!main_category) {
                            return c.sub_course.map((cs, index) => {
                              if (index === 0) {
                                return (
                                  <option value={cs.sub_title} key={index}>{cs.sub_title}</option>
                                )
                              }
                            })
                          }
                        })
                      } */}
                      { 
                        
                        sub_course.map((cs,index)=>(
                          <option value={cs.sub_title} key={index}>{cs.sub_title}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label for="" className="col-md-2 control-label">课程简介</label>
                  <div className="col-md-8 ckeditor">
                    <textarea
                      name="course_intro" rows="15" className="form-control input-sm"
                      value={course_intro}
                      onChange={(e) => this._dealInputValue(e, 'course_intro')}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <label for="" className="col-md-2 control-label">标签</label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      name="course_tag"
                      className="form-control input-sm"
                      value={course_tag}
                      onChange={(e) => this._dealInputValue(e, 'course_tag')}
                    />
                    <p className="help-block">标签将有利于您的课程被学生检索到</p>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-10">
                    {/* <Link to='/course/add_two' className="btn btn-danger btn-sm pull-right">下一步</Link> */}
                    <button className="btn btn-danger btn-sm pull-right"
                      onClick={() => this._dealClick()}
                    >下一步</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  _dealInputValue(e, type) {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    // console.log(inputValue,inputName)

    if(type === 'main_category'){
      
      this.props.courseClassificationData.map((c)=>{
        console.log(c.main_title,inputValue)
        if(c.main_title === inputValue){
          console.log(c.sub_course)
          this.setState({
            sub_course:c.sub_course
          })
        }
      })
    }
    this.setState({
      [inputName]: inputValue
    })

  }
  _dealClick(){
    const {
      course_name,
      course_title,
      course_sub_title,
      course_teacher,
      course_serialize_status,
      main_category,
      sub_category,
      course_intro,
      course_tag,
      course_page
      // sub_course
    } = this.state;
    //验证是否为空
    if(course_title === '' || course_sub_title === '' || course_intro ==='' || course_tag ===''){
      alert('输入的内容不能为空');
      return
    }

    //3传值

    this.props.addCourseData.course_title = course_title;
    this.props.addCourseData.course_sub_title = course_sub_title;
    //用户没有选择的逻辑
    this.props.addCourseData.course_teacher = course_teacher === ''? '撩大':course_teacher
    this.props.addCourseData.course_serialize_status = course_serialize_status === ''?'非连载状态':course_serialize_status;
    this.props.addCourseData.main_category = main_category === ''?this.props.courseClassificationData[0].main_title:main_category;
    this.props.addCourseData.sub_category = sub_category === '' ? this.props.courseClassificationData[0].sub_course[0].sub_title:sub_category
    this.props.addCourseData.course_tag = course_tag;
    this.props.addCourseData.course_page = course_page;
    console.log(this.props.addCourseData);
    console.log(this.props.courseClassificationData[0].sub_course[0].sub_title);
    debugger;
    this.props.history.push('/course/add_two')
  }
  componentWillMount() {
    this.props.reqCourseClassificationData()
  }
  componentDidMount(){
    // this.setState({
    //     courseClassificationData:this.props.courseClassificationData,
    //     sub_course:this.props.courseClassificationData.length ===0 ? []:this.props.courseClassificationData[0].course
    // })
  }
}

const mapStateToProps = (state) => {
  return {
    courseClassificationData: state.courseClassificationData,
    addCourseData: state.addCourseData
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    reqCourseClassificationData() {
      const action = getCourseClassificationAction();
      dispatch(action);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToprops)(CourseAddOne);