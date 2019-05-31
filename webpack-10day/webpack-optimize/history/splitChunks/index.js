//index.js需要引入a.js和b.js,other.js也同样需要
//如果做个缓存,就很好了

import './a';
import './b';

console.log('index.js');

import $ from 'jquery';
console.log($);

