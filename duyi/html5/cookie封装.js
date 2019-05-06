CookieUtil = {
  addCookie: function (key, value, options) {
    var str = key + '=' + escape(value)
    if (options.expires) {
      var curr = new Date(); // options.expires的单位是小时
      curr.setTime(curr.getTime() + options.expires * 3600 * 1000)
      options.expires = curr.toGMTString()
    }
    for (var k in options) { // 有可能指定了cookie的path，cookie的domain
      str += ';' + k + '=' + options[k]
    }
    document.cookie = str
  },
  queryCookie: function (key) {
    var cookies = document.cookie
    // 获得浏览器端存储的cookie,格式是key=value;key=value;key=value
    cookies += ';'
    var start = cookies.indexOf(key)
    if (start <= -1) { return null; } // 说明不存在该cookie
    var end = cookies.indexOf(';', start)
    var value = cookies.slice(start + key.length + 1, end)
    return unescape(value)
  },
  deleteCookie: function (key) {
    var value = CookieUtil.queryCookie(key)
    if (value === null) {return false;}
    CookieUtil.addCookie(key, value, {expires: 0}); // 把过期时间设置为0，浏览器会马上自动帮我们删除cookie
  }
}
