import express from 'express';
// import Category from './../models/Category';
import formidable from 'formidable';
import config from '../src/config';
import { basename } from 'path';
import Classification from '../models/Classification';

const router = express.Router({});

// router.post('/john/api/add', (req, res, next) => {
  
// })

router.get('/classification/api/list', (req, res, next) => {

  Classification.find().exec((err, classification) => {
    console.log('john');
    if (err) {
      return next(err);
    }
    res.json({
      status_code: 200,
      result: classification
    })
  });
})

module.exports = router;