/**
 * 在dom diff中如何识别和处理key
 */
const REMOVE = 'REMOVE';
const INSERT = 'INSERT';
class Element {
    constructor(tagName, key, children) {
        this.tagName = tagName;
        this.key = key;
        this.children = children;
    }
    render() {
        let element = document.createElement(this.tagName);
        element.innerHTML = this.children;
        element.setAttribute('key', this.key);
        return element;
    }
}
function el(tagName, key, children) {
    return new Element(tagName, key, children);
}
let oldChildren = [
    el('li', 'A', 'A'),
    el('li', 'B', 'B'),
    el('li', 'C', 'C'),
    el('li', 'D', 'D')
]
let ul = document.createElement('ul');
oldChildren.forEach(item => ul.appendChild(item.render()));
document.body.appendChild(ul);
let newChildren = [
    el('li', 'C', 'C'),
    el('li', 'B', 'B'),
    el('li', 'D', 'D'),
    el('li', 'E', 'E'),
]
//插入或者删除的时候会引起索引的变化
let patches = diff(oldChildren, newChildren);
console.log(patches);//[{type:REMOVE,index:0},{type:INSERT,index:3,{key:'E'}}]
patch(ul, patches);
function patch(root, patches = []) {
    patches.forEach(patch => {
        let oldNode;
        switch (patch.type) {
            case INSERT:
                let newNode = patch.node.render();
                //得到此索引对应的老节点
                oldNode = root.childNodes[patch.index];
                if (oldNode) {
                    root.insertBefore(newNode, oldNode);
                } else {
                    root.appendChild(newNode);
                }
                break;
            case REMOVE:
                oldNode = root.childNodes[patch.index];
                if (oldNode)
                    root.removeChild(oldNode);
                break;
            default:
                throw new Error('没有这种补丁类型');
        }
    });
}
function diff(oldChildren, newChildren) {
    let patches = [];
    let newKeys = newChildren.map(item => item.key);
    //第一步，把老数组在新数组中没有的元素移除掉
    let oldIndex = 0;
    while (oldIndex < oldChildren.length) {
        let oldKey = oldChildren[oldIndex].key;//A
        if (!newKeys.includes(oldKey)) {
            remove(oldIndex);
            //移除一个现在不存在节点的key值
            oldChildren.splice(oldIndex, 1);
        } else {
            oldIndex++;
        }
    }


    
    //第二步处理新数组，把该插入的插进去
    oldIndex = 0;
    newIndex = 0;
    while (newIndex < newChildren.length) {
        let newKey = (newChildren[newIndex] || {}).key;
        let oldKey = (oldChildren[oldIndex] || {}).key;
        //原来的节点没有  
        if (!oldKey) {
            insert(newIndex, newKey);
            newIndex++;
        } else if (oldKey != newKey) {
          //这里是现在的节点key与以前的节点key做比较,不相同,就先插入现在的节点key,现在的节点key数组索引往前加1,以前的节点key数组索引不加1
            insert(newIndex, newKey);
            newIndex++;
        } else {
            oldIndex++;
            newIndex++;
        }
    }
    //把老数组中多余的删除掉
    //while (oldIndex++ < oldChildren.length) {
    //    remove(newIndex);
    //}

    function insert(index, key) {
        patches.push({ type: INSERT, index, node: el('li', key, key) });
    }
    //往补丁包里记录一条删除的信息,还未实现删除
    function remove(index) {
        patches.push({ type: REMOVE, index });
    }
    return patches;
}


//如果我自己来写的话,key同级比较,key是属性,先比较之前的元素,再比较有没有其他跟当前key相同的元素