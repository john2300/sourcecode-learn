base64图片制作icon优势:

  base64图片可以减少请求

  加快首屏数据的显示速度

  
  例如url(data:image/png;base64,{img_data})
  字符串img_data是非常长的,提前讲图片信息放到了css信息中,就减少了一次请求,但是体积更大,因为没有压缩,原图是有压缩的.并且维护不太方便.


css3制作ICON,体积比base64更小,但是也不易于维护,存在兼容性的问题.手机上不用考虑兼容性.


window.performance.timing:监控页面加载速度,这是不考虑兼容器的做法.考虑兼容要用,页面加载之前new Date().getTime(),加载完成之后再用new Date()计算时间戳,两者相减.

worker暂时没搞懂怎么用??????

Access-Control-Allow-Origin:*;

如果资源是html页面，可以设置 
<meta http-equiv="Access-Control-Allow-Origin" content="*">

移动端注意事项:

  减少或避免重绘和重排

  尽量缓存所有可以缓存的数据

  使用css3 transform代替dom操作

  不要给非static定位元素增加css3动画

  适当增加硬件加速(canvas)
