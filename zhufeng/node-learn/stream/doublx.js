const {Duplex} = require('stream')
let index=3;
const myDuplex =  Duplex({
  read(size) {
    if(index-->0){
    this.push('a');
    }else{
      this.push(null);
    }
  },
  write(chunk,encoding,callback){
    console.log(chunk.toString().toUpcase());
    callback();
  }
})
process.stdin.pipe(myDuplex).pipe(process.stdout);
