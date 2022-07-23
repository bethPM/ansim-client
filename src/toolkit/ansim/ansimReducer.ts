import { combineReducers } from "@reduxjs/toolkit";
import ansimList from "./ansimListSlice";
import ansimInfo from "./ansimInfoSlice";

const ansimReducer = combineReducers({
  ansimList,
  ansimInfo,
});

export default ansimReducer;
