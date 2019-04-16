
let fs = require('fs');
let ws = fs.createWriteStream('1.txt',{
  highWaterMark:3
});
let n = 9;
function write(){
  let flag = true;
  while(flag&&n>0){
    flag = ws.write(n+'');
    n--;
    console.log('flag');
  }
  
  
}
ws.on('drain',function(){
  console.log('drain');
  write();
});
write();