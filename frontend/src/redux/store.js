/*
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
// import { createStore, applyMiddleware} from 'redux'
// import reducers from "./reducers";
// import thunk from "redux-thunk";
//
// //暴露store
// export default createStore(reducers, applyMiddleware(thunk))
import {createStore, applyMiddleware, compose} from 'redux';
import {taskMiddleware} from 'react-palm/tasks';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

// using enhancers
const initialState = { };
const middlewares = [taskMiddleware, thunkMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  initialState,
  composeEnhancers(...enhancers)
);
