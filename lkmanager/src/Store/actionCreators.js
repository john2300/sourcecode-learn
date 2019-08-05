import {getHomeData,getSowingData,getUserData,getStudentData,getCourseClassificationData} from './../Api';
import * as constants from './actionTypes'

export const getHomeDataAction = () => {
  
  return (dispatch)=>{
    getHomeData().then(res=>{
      if(res.status_code === 200){
        let homeData = res.result[0];
        dispatch({
          type:constants.INIT_HOME_DATA,
          homeData
        })
      }else{
        alert('首页数据请求失败！');
      }
    }).catch(e=>{
      console.log(e);
    })
  }
}

export const getSowingDataAction = () => {
  return (dispatch)=>{
    getSowingData().then(res=>{
      if(res.status_code === 200){
        let sowingData = res.result;
        dispatch({
          type:constants.INIT_SOWING_DATA,
          sowingData
        })
      }else{
        alert('首页数据请求失败！');
      }
    }).catch(e=>{
      console.log(e);
    })
  }
}

// 2. 用户登录
export const getUserDataAction = (data, callback)=>{
  return (dispatch)=>{
    
     // 2.1 发起网络请求
     getUserData(data).then((res)=>{
         if(res.status_code === 200){
             const userData = res.result;
             dispatch({
                 type: constants.INIT_USER_DATA,
                 userData
             });
             // 成功的回调
             callback && callback(userData);
         }else {
            console.log('res',res);
             alert(res.result);
         }
     }).catch((error)=>{
           alert(error);
     })
  }
};

export const getStudentDataAction = (parmas)=>{
  return (dispatch)=>{
     // 2.1 发起网络请求
     getStudentData(parmas).then((res)=>{
         if(res.status_code === 200){
             const studentData = res.result;
             dispatch({
                 type: constants.INIT_STUDENT_DATA,
                 studentData
             });
             // 成功的回调
            //  callback && callback(studentData);
         }else {
             alert(res.result);
         }
     }).catch((error)=>{
           alert(error);
     })
  }
};

export const getCourseClassificationAction = ()=>{
  return (dispatch)=>{
     // 2.1 发起网络请求
     getCourseClassificationData().then((res)=>{
         if(res.status_code === 200){
             const courseClassificationData = res.result;
             dispatch({
                 type: constants.INIT_COURSECLASSIFICATION_DATA,
                 courseClassificationData
             });
             // 成功的回调
            //  callback && callback(studentData);
         }else {
             alert(res.result);
         }
     }).catch((error)=>{
           alert(error);
     })
  }
};