import express from 'express';
import User from './../models/user';
import formidable from 'formidable';
import config from './../src/config';
import { basename } from 'path';
import { runInNewContext } from 'vm';

const router = express.Router({});

router.post('/user/api/login', (req, res, next) => {
  let user_name = req.body.user_name;
  let user_pwd = req.body.user_pwd;
  User.findOne({ 'user_name': user_name }, (err, user) => {
    if (err) {
      console.log(err);
      return next(err)
    }
    if (user !== null) {
      if (user.user_pwd === user_pwd) {
        res.json({
          status_code: 200,
          result: {
            token: user._id,
            user_name: user.user_name,
            user_pwd: user.user_pwd,
            real_name: user.real_name,
            sex: user.sex,
            phone: user.phone,
            e_mail: user.e_mail,
            join_time: user.join_time,
            c_time: user.c_time,
            l_time: user.l_time,
            intro_self: user.intro_self,
            icon_url: user.icon_url
          }
        })
      }
    }
  })
});
router.post('/user/api/edit', (req, res, next) => {
  console.log('/user/api/edit');
  const form = new formidable.IncomingForm();
  form.uploadDir = config.upload_path;
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log('req-----');
    if (err) {
      return next(err);
    }
    // 1. 处理表单字段
    const body = fields;

    body.icon_url = basename(files.icon_url.path);
    console.log(files.icon_url.path)
    // console.log(body);
    // 1.1 根据id查询数据
    User.findById(body.token, (err, user) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      user.real_name = body.real_name;
      user.sex = body.sex;
      user.phone = body.phone;
      user.e_mail = body.e_mail;
      user.join_time = user.join_time;
      user.c_time = Date.now();
      user.l_time = Date.now();
      user.intro_self = body.intro_self;
      user.icon_url = body.icon_url;

      user.save((err, result) => {
        if (err) {
          return next(err);
        }
        res.json({
          status_code: 200,
          result: {
            token: user._id,
            user_name: user.user_name,
            user_pwd: user.user_pwd,
            real_name: user.real_name,
            sex: user.sex,
            phone: user.phone,
            e_mail: user.e_mail,
            join_time: user.join_time,
            c_time: user.c_time,
            l_time: user.l_time,
            intro_self: user.intro_self,
            icon_url: user.icon_url
          }
        })
      });
    });
  });
});

router.post('/user/api/reset', (req, res, next) => {

  console.log('/user/api/reset');

  let token = req.body.token;
  let old_pwd = req.body.old_pwd;
  let new_pwd = req.body.new_pwd;
  if(!token || !old_pwd || !new_pwd){
    return next(new Error('请求参数错误'));
  }
  User.findById(token, (err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    if(user.user_pwd === old_pwd){
      user.user_pwd = new_pwd;
      user.save((err, result)=>{
        if (err) {
          return next(err);
        }
        res.json({
          status_code: 200
        });
      });
    }else{
      return next(new Error('请求参数错误'));
    }
  });
});


//urlencoded中的key-value会写入URL，form-data模式的key-value不明显写入URL，而是直接提交。

module.exports = router;