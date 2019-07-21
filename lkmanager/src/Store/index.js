import { createStore,applyMiddleware,compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
//chrome扩展程序里搜索Redux DevTools进行安装
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(reducer, enhancer);
export default store;
