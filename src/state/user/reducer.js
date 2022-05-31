import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { REQUEST_LOGIN, SET_ERROR, SET_USER, REQUEST_USER_DATA } from "./actions";

const constant = val => () => val;

const currentUser = createReducer(null, {
  [SET_USER]: (state, { payload }) => payload
});

const isLoading = createReducer(false, {
  [REQUEST_LOGIN]: constant(true),
  [REQUEST_USER_DATA]: constant(true),
  [SET_ERROR]: constant(false),
  [SET_USER]: constant(false)
});

const error = createReducer(null, {
  [SET_ERROR]: (state, { payload }) => payload
});

export default combineReducers({
  currentUser,
  error,
  isLoading
});
