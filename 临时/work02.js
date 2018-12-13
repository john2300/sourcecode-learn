let a='3445944905'

// String.prototype.forEach = Array.prototype.forEach
String.prototype.forEach.bind(Array.prototype.forEach)
Array.prototype.forEach.call(a,function(){
    console.log()
})

a.forEach(item=>{
    console.log(item)
})



