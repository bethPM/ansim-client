import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import isOpen from "./isOpen/isOpenSlice";
import geo from "./geo/geoSlice";
import ansim from "./ansim/ansimReducer";

const rootReducer = combineReducers({
  isOpen,
  geo,
  ansim,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootReducerType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
