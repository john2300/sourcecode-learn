import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUserDataAction } from '../../Store/actionCreators'
import md5 from 'md5'

const S_KEY = 'WaYjH1314.ItLikE.CoM';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user_name: '',
			user_pwd: ''
		}
	}

	render() {
		return (
			<div className="login">
				<div className="login-wrap">
					<div className="avatar">
						<img src="./uploads/logo.jpg" className="img-circle" alt="" />
					</div>
					<div className="col-md-offset-1 col-md-10">
						<div className="input-group input-group-lg">
							<span className="input-group-addon">
								<i className="fa fa-id-card-o"></i>
							</span>
							<input
								name="user_name"
								type="text"
								className="form-control"
								placeholder="撩课口令"
								onChange={e => this._onInputChange1(e)}
								// onKeyUp={e => this._onInputKeyUp(e)}
							/>
						</div>
						<div className="input-group input-group-lg">
							<span className="input-group-addon">
								<i className="fa fa-key"></i>
							</span>
							<input
								name="user_pwd"
								type="password"
								className="form-control"
								placeholder="密码"
								onChange={e => this._onInputChange2(e)}
								// onKeyUp={e => this._onInputKeyUp(e)}
							/>
						</div>
						<button
							type="submit"
							className="btn btn-lg btn-danger btn-block"
							onClick={e => this._onSubmit(e)}
						>
							登 录
                        </button>
					</div>
				</div>
			</div>
		);
	}
	_onInputChange1(e){
		console.log(e.target.value);
		this.setState({
			user_name:e.target.value
		})
	}
	_onInputChange2(e){
		console.log(e.target.value);
		this.setState({
			user_pwd:e.target.value
		})
	}
	_onSubmit(e){
		// 3.1 获取数据
    const { user_name, user_pwd } = this.state;
    // 3.2 验证数据
    if (!user_name) {
      alert("输入的口令不能为空！");
      return;
    }
    if (!user_pwd) {
      alert("输入的密码不能为空！");
      return;
		}
		const md5_user_pwd = md5(user_pwd + S_KEY);
		// ed3b787040a9d654ed4c372147ef5204
    console.log(md5_user_pwd);
		let params = new URLSearchParams();
    params.append('user_name', user_name);
    params.append('user_pwd', md5_user_pwd);
		this.props.reqLogin(params,(userData) => {
      if (userData.token !== '') {
        this.props.history.push('/');
      }
    });
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		reqLogin(data, callback) {
			const action = getUserDataAction(data, callback);
			dispatch(action)
		}
	}
};
//不要mapStateToProps的原因是,不需要再更新页面的东西
export default connect(null, mapDispatchToProps)(Login);


/**
 * 
 * 思路
 * 
 * 先初始化两个变量
 * 
 * 用onChange监听输入变化,并且在onKeyup事件会在键盘按键被松开时发生监听点击登录之前输入好的数据
 * 其实可以只用onChange监听,每次都变化就行了
 * 
 *点击登录,请求数据,登录失败提示登录失败,可能要清空所有的数据,登录成功跳转到/页面
 */