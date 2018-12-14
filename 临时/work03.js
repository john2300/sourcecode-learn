let arr1=[1,2,3,788,324,323,[0230202,404434,21,0404,[[23,79,60,34,97,006,3748,[93939,1,8,928,0302,2002,111,[1828,[18839],[100202,030,[234,999,[233]],202,1883,]]],237],2033,12,45,23],2304],2]

function search(item,arr){
    let low = 0
        high = arr.length-1,
        mid=0,element=0;
    while(low<=high){
        // console.log(11111111111111111)
        mid =Math.floor((low+high)/2);
        // console.log(mid)
        if(arr[mid] instanceof Array){
            arr[]
        }
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
console.log(arr1 instanceof Array);
console.log(search(0230202,arr1));

// arr1.forEach(r=>{
//     console.log(r);
// })