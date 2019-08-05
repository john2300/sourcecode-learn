import express from 'express';
const router = express.Router({});


router.get('/', (req, res, next)=>{
    //这个路径不对啊,index.html在views下
    res.render('index.html');
});

module.exports = router;