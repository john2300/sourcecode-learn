import * as constants from './actionTypes';
const defaultState = {

};
export default (state = defaultState, action)=>{
  if(action.type === constants.INIT_HOME_DATA){
    //这种方法不是太好,因为改变整个数据的引用地址,会造成整个页面的数据都更新
      const newState = JSON.parse(JSON.stringify(state));
      newState.homeData = action.homeData;
      return newState;
  }else if(action.type === constants.INIT_SOWING_DATA){
      const newState = JSON.parse(JSON.stringify(state));
      newState.sowingData = action.sowingData;
      return newState;
  }else if(action.type === constants.INIT_USER_DATA){
      const newState = JSON.parse(JSON.stringify(state));
      // 把用户数据存入本地
      sessionStorage.setItem('userData', JSON.stringify(action.userData));
      newState.userData = action.userData;
      return newState;
  }else if(action.type === constants.INIT_STUDENT_DATA){
      const newState = JSON.parse(JSON.stringify(state));
      newState.studentData = action.studentData;
      return newState;
  }
  return state;
}