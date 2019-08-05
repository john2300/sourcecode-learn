//参数为url,
import axios from 'axios'
const ajax = (url = '', params = {}, type= 'GET') => {
  let promise;
  return new Promise((resolve,reject)=>{
    if (type.toUpperCase() === 'GET') {
      let paramsStr = '';
      Object.keys(params).forEach(index => {
        paramsStr += index + '=' + params[index] + '&';
      });
      if (paramsStr !== '') {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
      }
      url = url + '?' + paramsStr;
      promise = axios.get(url);
    }else if(type.toUpperCase() === 'POST'){
      promise = axios.post(url,params);
    }
    promise.then(res=>{
      resolve(res.data);
    }).catch(err=>{
      reject(err)
    })
  })
}



export default ajax;