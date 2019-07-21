import React, { Component } from 'react';
import { Link } from "react-router-dom";
import icon from './../../Common/images/default.png';


const userData = JSON.parse(sessionStorage.getItem('userData'));
const IMG_PRE = 'http://localhost:1688/uploads/';
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 令牌
      token: userData.token || '',
      // 姓名
      real_name: userData.real_name || '',
      // 用户名
      user_name: userData.user_name || '',
      // 头像
      icon_url: IMG_PRE + userData.icon_url || '',
      // 性别
      sex: userData.sex || '',
      // 手机号码
      phone: userData.phone || '',
      // 邮箱
      e_mail: userData.e_mail || '',
      // 加入日期
      join_time: userData.join_time || '',
      // 自我介绍
      intro_self: userData.intro_self || '',
    }
  }
  render() {
    const { real_name, user_name, icon_url, sex, phone, e_mail, join_time, intro_self } = this.state;
    return (
      <div className="container-fluid">
        <div className="body teacher-profile">
          <div className="settings">
            <div action="" className="form-horizontal">
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">姓名</label>
                <div className="col-md-5">
                  <input
                    name="real_name"
                    type="text"
                    className="form-control input-sm"
                    value={real_name}
                    onChange={(e) => this._onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">头像</label>
                <div className="col-md-2 preview">
                  <img src={icon_url.includes('undefined') ? icon : icon_url} />
                  <input
                    name="icon_url"
                    ref="icon_url"
                    type="file"
                    className="form-control input-sm"
                    onChange={(e) => this._onInputChange(e, 'file')}
                  />
                  <div className="cover">
                    <i className="fa fa-upload"></i>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">性别</label>
                <div className="col-md-3">
                  <label className="radio-inline">
                    <input
                      name="sex"
                      type="radio"
                      checked={sex === '男'}
                      onChange={(e) => this._onInputChange(e, '男')}
                    />
                    男
                                </label>
                  <label className="radio-inline">
                    <input
                      name="sex"
                      type="radio"
                      checked={sex === '女'}
                      onChange={(e) => this._onInputChange(e, '女')}
                    />
                    女
                                </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">用户名</label>
                <div className="col-md-5">
                  <input
                    name="user_name"
                    type="text"
                    className="form-control input-sm"
                    value={user_name}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">手机号码</label>
                <div className="col-md-5">
                  <input
                    name="phone"
                    type="text"
                    className="form-control input-sm"
                    value={phone}
                    onChange={(e) => this._onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">Email</label>
                <div className="col-md-5">
                  <input
                    name="e_mail"
                    type="text"
                    className="form-control input-sm"
                    value={e_mail}
                    onChange={(e) => this._onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">加入日期</label>
                <div className="col-md-5">
                  <input
                    name="join_time"
                    type="date"
                    className="form-control input-sm"
                    value={join_time}
                    onChange={(e) => this._onInputChange(e)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">自我介绍</label>
                <div className="col-md-5 ckeditor">
                  <textarea
                    name="intro_self"
                    rows="15"
                    className="form-control input-sm"
                    value={intro_self}
                    onChange={(e) => this._onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-8">
                  <button onClick={() => this._onSubmit()} className="btn btn-danger pull-right">保 存</button>
                  <Link to="/mine/reset" className="btn btn-link btn-success pull-right">修改密码？</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Mine;