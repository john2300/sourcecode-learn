const fs = require('fs');
const path = require('path');




function preorder(dir,callback){
    fs.readdir(dir,function(err,files){
        // 读取到文件
        function next(index){
          console.log('index:'+index +';' +'length:'+files.length+';' + 'dir:'+dir)
            if(index===files.length) return fs.rmdir(dir,callback)
            let newPath = path.join(dir,files[index])
            fs.stat(newPath,function(err,stat){
                if(stat.isDirectory()){ // 如果是文件夹
                    // 要读的是b里的第一个 而不是去读c
                    // 如果b里的内容没有了 应该去遍历c
                    rmdir(newPath,()=>next(index+1))
                }else{
                    // 删除文件后继续遍历即可
                    fs.unlink(newPath,()=>next(index+1))
                    fs.createReadStream(newPath).pipe()
                }
            })
        }
        next(0)
    })
}

preorder('jihetest', function () {
  console.log('文件遍历成功')
})