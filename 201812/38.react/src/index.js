let { createElement } = require('./element');
let diff = require('./diff');
let patch = require('./patch');
//参数为标签,class属性,子元素标签或者子元素文本
let ul1 = createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, ['1']),
    createElement('li', { class: 'item' }, ['2']),
    createElement('li', { class: 'item' }, ['3'])
]);
//得到一个真实的DOM
let root = ul1.render();
//放到body下面
document.body.appendChild(root);
let ul2 = createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, ['1']),
    createElement('li', { class: 'item' }, ['2']),
    createElement('li', { class: 'item' }, ['3']),
    createElement('li', { class: 'item' }, ['4'])
]);
let patches = diff(ul1, ul2);
console.log(patches);
//{2:[{type:'TEXT',content:3},4:[{type:'TEXT',content:2},6:[{type:'TEXT',content:1}]
patch(root, patches);

