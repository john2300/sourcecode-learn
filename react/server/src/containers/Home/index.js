// import React from 'react';
//因为要在node的环境下运行react的代码,所以模块引入机制改成require
const React = require('react');

const Home = () => {
  return <div>home</div>
  //以上代码在node中也不能运行,在react客户端渲染时
  //需要经过webpack打包转译才能运行
}

// export default Home;
//同样的是node环境,不用export default
module.exports = {
  default:Home
}