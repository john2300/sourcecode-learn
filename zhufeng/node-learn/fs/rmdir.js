// promise+递归版
let fs = require('fs')
let path = require('path')
// function rmdir (dir) {
//   return new Promise((resolve, reject) => {
//     fs.stat(dir, (err, stat) => {
//       // console.log(dir)
//       if(err) return reject(err)
//       if (stat.isDirectory()) {
//         fs.readdir(dir, (err, file) => {
//           if (err) return reject(err)
//           Promise.all(file.map(item => {
//             rmdir(path.join(dir,item))
//           }))
//             .then(() => {
//               fs.rmdir(dir, resolve)
//             })
//         })
//       }else{
//         fs.unlink(dir,resolve)
//       }
//     })
//   })
// }

// rmdir('a')

// 纯递归版,深度优先遍历

// function preorder(dir,callback){
//     fs.readdir(dir,function(err,files){
//         // 读取到文件
//         function next(index){
//           console.log('index:'+index +';' +'length:'+files.length+';' + 'dir:'+dir)
//             if(index===files.length) return fs.rmdir(dir,callback)
//             let newPath = path.join(dir,files[index])
//             fs.stat(newPath,function(err,stat){
//                 if(stat.isDirectory()){ // 如果是文件夹
//                     // 要读的是b里的第一个 而不是去读c
//                     // 如果b里的内容没有了 应该去遍历c
//                     rmdir(newPath,()=>next(index+1))
//                 }else{
//                     // 删除文件后继续遍历即可
//                     fs.unlink(newPath,()=>next(index+1))
//                 }
//             })
//         }
//         next(0)
//     })
// }

// preorder('a', function () {
//   console.log('文件遍历成功')
// })

// 广度优先遍历
function wide (dir) {
  
  let arr = [dir];
  while(arr.length > 0){
    let current = arr.shift();
    console.log('current:'+current);
    let stat = fs.statSync(current);
    if (stat.isDirectory()) {
      let files = fs.readdirSync(current);
      files.forEach(file => {
        arr.push(path.join(current, file));
      })
      // console.log('arr:'+arr);
    }
  }
}
wide('a');