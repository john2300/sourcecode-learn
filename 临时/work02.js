
// String.prototype.forEach = function(cb){
//     for(let i=0;i<this.length;i++){
//         cb&&cb(this[i])
//     }
// }
// String.prototype.map = Array.prototype.map
// String.prototype.map = function(cb){
//     let arr=[]
//     for(let i=0;i<this.length;i++){
//         let r = cb&&cb(this[i])
//         arr.push(r||this[i])
//     }
//     return arr
// }

// let str = '1233444'.map(r=>{
//     if(r==2){
//         return '*'
//     }
// })

// console.log(str)
// function formate(a){
//      Array.prototype.forEach.call(a,function(item,index){
//         console.log(item)
//     })
// }

// formate('1233334')

// function formate(a){
//     let arr=[]
//     for(let i of a){
//         arr.push(i)
//     }
//     arr.forEach(r=>{
//         console.log(r)
//     })
// }
// formate('203034045i')

// function formate(a){
//     a.split('').forEach(r=>{
//         console.log(r)
//     })
// }
// formate('1343543254')

let str = "fdskldksdmfWUWWUWUP()S]]][[NMXsdmfl     dsfmlkdskl"
let obj = {}
for(let i of str){
    let code = i.charCodeAt()
    if(code>64&&code<123){
        if(obj[code]){
            obj[code] +=1
        }else{
            obj[code] = 1
        }
    }
}

for(let k in obj){
    let b = String.fromCharCode(k)
    console.log(b+':'+obj[k])
}