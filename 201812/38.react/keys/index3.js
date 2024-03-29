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
        console.log('render');
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
    //0 E
    el('li', 'A', 'A'),
    el('li', 'B', 'B'),
    el('li', 'C', 'C'),
    el('li', 'D', 'D')
]
let ul = document.createElement('ul');
oldChildren.forEach(item => ul.appendChild(item.render()));
document.body.appendChild(ul);
let newChildren = [
    el('li', 'D', 'D'),
    el('li', 'C', 'C'),
    el('li', 'B', 'B'),
    el('li', 'A', 'A'),
]
let patches = diff(oldChildren, newChildren);
console.log(patches);//[{type:REMOVE,index:0},{type:INSERT,index:3,{key:'E'}}]
patch(ul, patches);
function patch(root, patches = []) {
    let nodeMap = {};
    //得到一个key和这个key对应的DOM之间的映射
    (Array.from(root.childNodes)).forEach(node => {
        nodeMap[node.getAttribute('key')] = node
    });
    patches.forEach(patch => {
        let oldNode;
        switch (patch.type) {
            case INSERT:
                //判断一下将要插入的key对应的老节点有没有，如果说有的话，取出来，如果没有的话创建一个新
                let newNode = nodeMap[patch.node.key] || patch.node.render();
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
            oldChildren.splice(oldIndex, 1);
        } else {
            oldIndex++;
        }
    }
    //Max(M,N) M*N
    //第二步处理新数组，把该插入的插进去
    oldIndex = 0;
    newIndex = 0;
    while (newIndex < newChildren.length) {
        let newKey = (newChildren[newIndex] || {}).key;
        let oldKey = (oldChildren[oldIndex] || {}).key;
        if (!oldKey) {
            insert(newIndex, newKey);
            newIndex++;
        } else if (oldKey != newKey) {
            let nextOldKey = (oldChildren[oldIndex + 1] || {}).key;
            //让现在的节点与原来节点的下一个节点比较,解决节点数量不变,但是顺序变化的带来的性能问题 
            if (nextOldKey == newKey) {
                remove(newIndex);
                oldChildren.splice(oldIndex, 1);
            } else {
                insert(newIndex, newKey);
                newIndex++;
            }
        } else {
            oldIndex++;
            newIndex++;
        }
    }
    //把老数组中多余的删除掉
    while (oldIndex++ < oldChildren.length) {
        remove(newIndex);
    }

    function insert(index, key) {
        patches.push({ type: INSERT, index, node: el('li', key, key) });
    }
    function remove(index) {
        patches.push({ type: REMOVE, index });
    }
    return patches;
}