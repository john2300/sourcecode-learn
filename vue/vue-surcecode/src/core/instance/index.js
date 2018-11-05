//终于找到了vue定义,是一个function
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

//为什么不用es6的class,而用es5的function去构造呢?
//8.一new VUe就实现这个Vue函数,并且传入option
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
  //判断是不是vue的实例
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  //8._init是原型上的方法,是在initMixin里定义的
  this._init(options)
}
//因为可以往vue原型上挂载很多方法并且可以拆分到很多文件下,es6的class很麻烦
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
