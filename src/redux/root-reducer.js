/* 
This is the actual code that combines all of our state together 
*/

import { combineReducers } from "redux";

import userReducer from "./user/reducer.js";

export default combineReducers({
  user: userReducer,
});
