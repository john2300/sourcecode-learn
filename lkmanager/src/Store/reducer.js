import * as constants from './actionTypes';

const defaultState = {
  homeData: {},
  sowingData: [],
  userData: {},
  studentData: [],
  courseClassificationData: [],
  addCourseData: {
    course_name: '',
    course_title: '',
    course_sub_title: '',
    course_teacher: '',
    course_serialize_status: '',
    main_category: '',
    sub_category: '',
    course_intro: '',
    course_tag: '',
    course_page: '',
    course_manager: [{
      c_title: '',
      c_video: '',
      c_intro: '',
      c_time: ''
    }]
  }
}
const reducer = (state = defaultState, action) => {
  //action.type是actionCreators来的
  let newState;
  switch (action.type) {
    case constants.INIT_HOME_DATA:
      newState = JSON.parse(JSON.stringify(state));
      newState.homeData = action.homeData;
      return newState;
    case constants.INIT_SOWING_DATA:
      newState = JSON.parse(JSON.stringify(state));
      newState.sowingData = action.sowingData;
      return newState;

    case constants.INIT_USER_DATA:
      newState = JSON.parse(JSON.stringify(state));
      // 把用户数据存入本地
      sessionStorage.setItem('userData', JSON.stringify(action.userData));
      newState.userData = action.userData;
      return newState;
    case constants.INIT_STUDENT_DATA:
      newState = JSON.parse(JSON.stringify(state));
      newState.studentData = action.studentData;
      return newState;
    case constants.INIT_COURSECLASSIFICATION_DATA:
      newState = JSON.parse(JSON.stringify(state));
      newState.courseClassificationData = action.courseClassificationData;
      return newState;
    default:
      return state;
  }
}

export default reducer;