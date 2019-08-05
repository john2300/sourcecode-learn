

import express from 'express';
import User from './../models/user';
import formidable from 'formidable';
import config from './../src/config';
import { basename } from 'path';
import { runInNewContext } from 'vm';
import Student from '../models/Student';

const router = express.Router({});

router.get('/stu/api/list', (req, res, next) => {
  let {page,pageSize} = req.query;
  page = Number.parseInt(page);
  pageSize = Number.parseInt(pageSize);
  console.log('/stu/api/list');

  Student.find().skip((page-1)*pageSize).limit(pageSize).exec((err,student)=>{
      if (err) {
      return next(err);
    }
    res.json({
      status_code:200,
      result:student
    })
  })

  //   Student.find().exec((err, student) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.json({
  //     status_code: 200,
  //     result: student
  //   })
  // })
});
router.get('/stu/api/count', (req, res, next) => {
  console.log('/stu/api/count');
  Student.count({}, (err, count) => {
    if (err) {
      return next(err);
    }
    res.json({
      status_code: 200,
      result: count
    });
  });
});


module.exports = router;