import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import avatar from './../../Common/uploads/avatar.png';
import { connect } from 'react-redux';
const IMG_PRE = 'http://localhost:1688/uploads/';
class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_flag: 'one',
      // user_name:props.userData.user_name?
      // icon_url:props.userData.icon_url
    }
  }
  render() {
    let user_name = '', icon_url = '';
    if (this.props.userData) {
      user_name = this.props.userData.user_name;
      icon_url = this.props.userData.icon_url
    }
    // const { user_name = '', icon_url = '' } = this.props.userData;
    const { selected_flag } = this.state

    return (
      <div className="aside">
        <div className="profile">
          <div className="avatar img-circle">
            <img src={icon_url ? (IMG_PRE + icon_url) : avatar} />
          </div>
          <h4>{user_name}</h4>
        </div>
        <div className="navs">
          <ul className="list-unstyled">
            <li>
              <Link to="/" className={selected_flag === 'one' ? 'active' : ''} onClick={() => this._dealWithClick('one')}>
                <i className="fa fa-area-chart"></i>
                数据分析
                            </Link>
            </li>
            <li>
              <Link to="/user" className={selected_flag === 'two' ? 'active' : ''} onClick={() => this._dealWithClick('two')}>
                <i className="fa fa-users"></i>
                用户中心
                            </Link>
            </li>
            <li>
              <Link to='/course' className={selected_flag === 'three' ? 'active' : ''} onClick={() => this._dealWithClick('three')}>
                <i className="fa fa-object-group"></i>
                课程管理
                                <i className="arrow fa fa-angle-right"></i>
              </Link>
              <ul className="list-unstyled" >
                <li>
                  <Link to="/course/add" className={selected_flag === 'three-one' ? 'active' : ''} onClick={() => this._dealWithClick('three-one')}>
                    课程添加
                                    </Link>
                </li>
                <li>
                  <Link to="/course/list" className={selected_flag === 'three-two' ? 'active' : ''} onClick={() => this._dealWithClick('three-two')}>
                    课程列表
                                    </Link>
                </li>
                <li>
                  <Link to="/course/classification" className={selected_flag === 'three-three' ? 'active' : ''} onClick={() => this._dealWithClick('three-three')}>
                    课程分类
                                    </Link>
                </li>
                <li>
                  <Link to="/course/topic" className={selected_flag === 'three-four' ? 'active' : ''} onClick={() => this._dealWithClick('three-four')}>
                    课程专题
                                    </Link>
                </li>
              </ul>
            </li>
            <li>
              <a href="docent_list.html" className={selected_flag === 'four' ? 'active' : ''} onClick={() => this._dealWithClick('four')}>
                <i className="fa fa-bars"></i>
                运营中心
                            </a>
            </li>
            <li>
              <Link to="/sowing/list" className={selected_flag === 'five' ? 'active' : ''} onClick={() => this._dealWithClick('five')}>
                <i className="fa fa-calculator"></i>
                轮播图中心
                            </Link>
            </li>
            <li>
              <a href="javascript:;" className={selected_flag === 'six' ? 'active' : ''} onClick={() => this._dealWithClick('six')}>
                <i className="fa fa-cog"></i>
                设置中心
                                <i className="arrow fa fa-angle-right"></i>
              </a>
              <ul className="list-unstyled">
                <li><a href="javascript:;">站点设置</a></li>
                <li><a href="javascript:;">用户设置</a></li>
                <li><a href="javascript:;">角色管理</a></li>
                <li><a href="javascript:;">课程设置</a></li>
                <li><a href="javascript:;">运营设置</a></li>
                <li><a href="javascript:;">财务设置</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );

  }
  _dealWithClick(selected_flag) {
    this.setState({
      selected_flag
    })
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData
  }
}
// const mapDispatchToprops = (dis)

export default connect(mapStateToProps, null)(Aside);

//第一次进入,根本就进不去,会显示user_那么错误,注释掉,重来又可以的s