import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { REQUEST_USERS, SUCCESS_USERS, FAILURE_USERS, REQUEST_USER_CARDS, SUCCESS_USER_CARDS, FAILURE_USER_CARDS } from "./actions";

const constant = val => () => val;

const users = createReducer(null, {
  [SUCCESS_USERS]: (state, { payload }) => payload
});

const isLoading = createReducer(false, {
  [REQUEST_USERS]: constant(true),
  [SUCCESS_USERS]: constant(false),
  [FAILURE_USERS]: constant(false)
});

const isLoadingCards = createReducer(false, {
  [REQUEST_USER_CARDS]: constant(true),
  [SUCCESS_USER_CARDS]: constant(false),
  [FAILURE_USER_CARDS]: constant(false)
});

const error = createReducer(null, {
  [FAILURE_USERS]: (state, { payload }) => payload
});

const userCards = createReducer(null, {
  [SUCCESS_USER_CARDS]: (state, { payload }) => payload
});

export default combineReducers({
  users,
  userCards,
  error,
  isLoading,
  isLoadingCards
});
