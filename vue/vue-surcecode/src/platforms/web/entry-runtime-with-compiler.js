/* @flow */
//vue入口
import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

//再分析这里.8.2找vue
import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})
// 8.2首先获取到vue原型上的$mount方法,并保存起来,之前的vue在./runtime/index
const mount = Vue.prototype.$mount
//8.2然后又重新定义了这个方法,为什么要重新定义一次,因为./runtime/index里面定义的vue是给runtime里的函数复用的.
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  //8.2找./util/index的query方法,转换为dom对象
  el = el && query(el)

  /* istanbul ignore if */
  //8.2el不可以是body和documentElement,因为会把整个页面覆盖掉
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  //8.2判断有没有写render方法, 
  if (!options.render) {
    let template = options.template
    //8.2判断template是否存在
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      //8.2如果没有拿到这个元素,找getOuterHTML
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      // 8.2跟编译相关,先不管,如果template存在再编译成render函数,vue只认render函数
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  //8.2有了上面编译的render函数后,调用之前重写缓存的mount方法,又转到./runtime/index里
  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
//8.2拿到div#app这个dom
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

//导出实例
export default Vue
