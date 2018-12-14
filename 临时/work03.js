let arr1=[1,2,3,788,324,323,0230202,404434,21,0404,23,79,60,34,97,006,3748,93939,1,8,928,0302,2002,111,1828,324,18839,100202,030,234,999,233,202,1883,237,2033,12,45,23,2304,2]
// let arr2 = [3,1,2,788,324,323,230202,45]
 arr2=arr1.sort((value1,value2)=>{
    if (value1 < value2) {
        return -1;
    }
    else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
 })
// console.log(arr2);

function search(item,arr){
    let low = 0,
        high = arr.length-1,
        mid,element;
    while(low<=high){
        // console.log(11111111111111111)
        mid =Math.floor((low+high)/2);
        // console.log(mid)
        // if(arrmid] instanceof Array){
        //     arr]
        // }
        element = arr[mid];
        if(element<item){
            low = mid + 1;
        }else if(element>item){
            high = mid-1;
        }else{
            return mid;
        }
    }
    return -1;
}

console.time('timer1')
arr2.some((r,index)=>{
    if(r==324){
        console.log(index)
        return true
    }
})
console.timeEnd('timer1')
console.log('-------------')

console.time('timer')
console.log(search(324,arr2));
console.timeEnd('timer')
console.log('-------------')

