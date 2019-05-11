let keyIndex = 0;
let utils = require('./utils');
let allPatches;//这里就是完整的补丁包
function patch(root, patches) {
    allPatches = patches;
    walk(root);
}
function walk(node) {
  //打补丁是从下往上打的
    let currentPatches = allPatches[keyIndex++];
    (node.childNodes || []).forEach(child => walk(child));
    if (currentPatches) {
        doPatch(node, currentPatches);
    }
}
function doPatch(node, currentPatches) {
    currentPatches.forEach(patch => {
        switch (patch.type) {
          //属性改变
            case utils.ATTRS:
                for (let attr in patch.attrs) {
                    let value = patch.attrs[attr];
                    if (value) {
                        utils.setAttr(node, attr, value);
                    } else {
                        node.removeAttribute(attr);
                    }
                }
                break;
                //文本改变
            case utils.TEXT:
                //文本节点的内容改成新的就行
                node.textContent = patch.content;
                break;
                //节点更换
            case utils.REPLACE:
            //用三元判断文本节点或者子节点元素
            //innerHTML会将文本中包含的HTML代码实现效果，而createTextNode只是纯粹创造了文本节点
                let newNode = (patch.node instanceof Element) ? path.node.render() : document.createTextNode(path.node);
                node.parentNode.replaceChild(newNode, node);
                break;
                //DOM 需要清楚删除的元素，以及它的父元素,不能在不引用父元素的情况下删除子元素
            case utils.REMOVE:
                node.parentNode.removeChild(node);
                break;
        }
    });
}
module.exports = patch;