import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import course from './../../Common/images/course.jpg'
class CourseTwo extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="body course-add">
            <ol className="breadcrumb">
              <li><Link to='/course'>课程管理</Link></li>
              <li className="active">课程添加</li>
            </ol>
            <div className="steps">
            <ul className="forwards list-unstyled">
              <li>
                <Link to='/course/add_one' >
                  <b>1</b>
                  基本信息
                      </Link>
              </li>
              <li>
                <Link to='/course/add_two' className="active">
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
                  <h5>课程封面</h5>
                </div>
                <div className="picture col-md-offset-2">
                  <div className="preview">
                    <img src={course} alt="" />
                  </div>
                  <p className="tips">
                    可上传jpg, gif, png格式文件, 图片建议尺寸大于400x225，文件大小不能超过2M。
                            </p>
                  <div className="col-md-2">
                    <Link to='/course/add_three' className="btn btn-danger btn-sm">下一步</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseTwo;

