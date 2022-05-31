import {
  combineReducers
} from "redux";
import {
  createReducer
} from "@reduxjs/toolkit";
import {
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAILURE,
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
} from "./actions";

const constant = val => () => val;

const cards = createReducer(null, {
  [GET_CARDS_SUCCESS]: (state, {
    payload
  }) => payload,
});

const isLoading = createReducer(false, {
  [GET_CARDS_REQUEST]: constant(true),
  [GET_CARDS_SUCCESS]: constant(false),
  [GET_CARDS_FAILURE]: constant(false),
});

const isUploading = createReducer(false, {
  [ADD_CARD_REQUEST]: constant(true),
  [ADD_CARD_SUCCESS]: constant(false),
  [ADD_CARD_FAILURE]: constant(false),
});

const error = createReducer(null, {
  [GET_CARDS_FAILURE]: (state, {
    payload
  }) => payload,
});

export default combineReducers({
  cards,
  error,
  isLoading,
  isUploading
});