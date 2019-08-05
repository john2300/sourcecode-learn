import React, { Component } from 'react';
import { editSowingData } from './../../Api/index'
import { Link } from 'react-router-dom';

const IMG_PRE = 'http://localhost:1688/uploads/';
class SowingEdit extends Component {
  constructor(props) {
    super(props)
    const sowing = this.props.location.state.sowing;
    this.state = {
      id: sowing._id,
      image_title: sowing.image_title,
      image_url: IMG_PRE + sowing.image_url,
      image_small_url: IMG_PRE + sowing.image_small_url,
      image_link: sowing.image_link,
      s_time: sowing.s_time,
      e_time: sowing.e_time,
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="body teacher-profile">
          <ol className="breadcrumb">
            <li><Link to="/sowing/list">轮播图管理</Link></li>
            <li className="active">编辑轮播图</li>
          </ol>
          <div className="settings">
            <div className="form-horizontal">
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">图片名称</label>
                <div className="col-md-5">
                  <input
                    ref="image_title"
                    type="text"
                    className="form-control input-sm"
                    placeholder="填写图片名称"
                    value={this.state.image_title}
                    onChange={(e) => this._dealInputValue(e, 'image_title')}
                  />
                </div>
              </div>
              {/*大图*/}
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">大图</label>
                <div className="col-md-2 preview">
                  <img src={this.state.image_url} style={{ border: 1 }} />
                  <input
                    ref="image_url"
                    type="file"
                    className="form-control input-sm"
                    placeholder="选择小图片"
                    onChange={() => this._previewImg('image_url')}
                  />
                  <div className="cover">
                    <i className="fa fa-upload"></i>
                  </div>
                </div>
              </div>
              {/*小图*/}
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">小图</label>
                <div className="col-md-2 preview">
                  <img src={this.state.image_small_url} style={{ border: 1 }} />
                  <input
                    ref="image_small_url"
                    type="file"
                    className="form-control input-sm"
                    placeholder="选择大图片"
                    onChange={() => this._previewImg('image_small_url')}
                  />
                  <div className="cover">
                    <i className="fa fa-upload"></i>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">跳转页面链接</label>
                <div className="col-md-5">
                  <input
                    ref="image_link"
                    type="text"
                    className="form-control input-sm"
                    placeholder="填写跳转链接"
                    value={this.state.image_link}
                    onChange={(e) => this._dealInputValue(e, 'image_link')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">计划上架时间</label>
                <div className="col-md-5">
                  <input
                    ref="s_time"
                    type="text"
                    className="form-control input-sm"
                    placeholder="请填写上架的链接"
                    value={this.state.s_time.substr(0, 10)}
                    onChange={(e) => this._dealInputValue(e, 's_time')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="" className="col-md-3 control-label">计划下架时间</label>
                <div className="col-md-5">
                  <input
                    ref="e_time"
                    type="text"
                    className="form-control input-sm"
                    placeholder="请填写下架的链接"
                    value={this.state.e_time.substr(0, 10)}
                    onChange={(e) => this._dealInputValue(e, 'e_time')}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-md-8">
                  <button onClick={() => this._dealWithClick()} className="btn btn-danger btn-sm pull-right">确认修改</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  _dealInputValue(e,type){
    //在页面上的数据是通过数据直接赋值过去的,在框里直接写数据,会触发事件,事件触发页面重新渲染,render()是在所有宏任务执行之后的,页面上的数据又被重新赋值上,在事件触发的时候,获取到这些数据,推到渲染之前
    const val = e.target.value;
        if(type === 'image_title'){
            this.setState({
                image_title: val
            })
        }else if(type === 'image_link'){
            this.setState({
                image_link: val
            })
        }else if(type === 's_time'){
            this.setState({
                s_time: val
            })
        }else if(type === 'e_time'){
            this.setState({
                e_time: val
            })
        }
  }
  _previewImg(imgRef){
    //imgRef是ref值,不是图片地址
    let file = this.refs[imgRef].files[0];

    //在页面上去替换图片,图片是定死的
    //有几个问题需要解决
    //上传这张图片需要预览的,文件通过input标签上传,img标签显示图片来预览
    //需要从file里提取到src
    let src = '';
    const reader = new FileReader();

    // readAsDataURL:将文件读取为DataURL
    if(file){
      reader.readAsDataURL(file);
    }else{
      src=''
    }
    reader.onloadend = () => {
      src = reader.result;
      if(imgRef ==='image_url'){
        this.setState({
          image_url:src
        })
      }else{
        this.setState({
          image_small_url:src
        })
      }
    }
  }
  _dealWithClick(){
     // 1. 处理请求的数据
     const {id, image_title, image_link, s_time, e_time} = this.state;
     //  2. 取出图片的原始名称
     const {image_url, image_small_url} = this.props.location.state.sowing;
     // 3. 创建formData
     let formData = new FormData();
     formData.append('id', id);
     formData.append('image_title', image_title);
     formData.append('image_link', image_link);
     formData.append('s_time', s_time);
     formData.append('e_time', e_time);
     formData.append('image_url', this.refs.image_url.files[0] || image_url);
     formData.append('image_small_url', this.refs.image_small_url.files[0] || image_small_url);
     // 4. 发送请求
    editSowingData(formData).then((res)=>{
        console.log(res);
        if(res.status_code === 200){
            this.props.history.push('/sowing/list');
        }
    }).catch((error)=>{
        console.log(error);
        alert('修改数据失败！');
    });
  }
}

export default SowingEdit;