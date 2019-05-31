module.exports = 'zsded';

require('@babel/polyfill');
class B{

}

function *gen(params){
  yield 1;
}
console.log(gen().next());
//es7语法
//实例上的方法都不会去解析
'aaa'.includes('a')