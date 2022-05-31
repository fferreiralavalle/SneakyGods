import {
  combineReducers
} from "redux";
import {
  createReducer
} from "@reduxjs/toolkit";
import {
  ADD_CAMERA_REQUEST,
  ADD_CAMERA_SUCCESS,
  ADD_CAMERA_FAILURE,
  GET_CAMERAS_REQUEST,
  GET_CAMERAS_SUCCESS,
  GET_CAMERAS_FAILURE,
  DEL_CAMERAS_REQUEST,
  DEL_CAMERAS_FAILURE,
  DEL_CAMERAS_SUCCESS,
  RESET_CAMERAS,
} from "./actions";

const constant = val => () => val;

const cameras = createReducer(null, {
  [ADD_CAMERA_SUCCESS]: (state, {
    payload
  }) => payload.cameraList,
  [GET_CAMERAS_SUCCESS]: (state, {
    payload
  }) => payload.cameraList,
  [RESET_CAMERAS]: constant(null)
});

const isLoading = createReducer(false, {
  [GET_CAMERAS_REQUEST]: constant(true),
  [GET_CAMERAS_SUCCESS]: constant(false),
  [GET_CAMERAS_FAILURE]: constant(false),
  [ADD_CAMERA_REQUEST]: constant(true),
  [ADD_CAMERA_SUCCESS]: constant(false),
  [ADD_CAMERA_FAILURE]: constant(false),
  [DEL_CAMERAS_REQUEST]: constant(true),
  [DEL_CAMERAS_SUCCESS]: constant(false),
  [DEL_CAMERAS_FAILURE]: constant(false),
});

const error = createReducer(null, {
  [ADD_CAMERA_FAILURE]: (state, {
    payload
  }) => payload,
  [GET_CAMERAS_FAILURE]: (state, {
    payload
  }) => payload
});

export default combineReducers({
  cameras,
  error,
  isLoading,
});