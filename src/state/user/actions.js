import * as firebase from "firebase/app";

import {
  createAction
} from "@reduxjs/toolkit";
import {
  resetCameras
} from "../cameras/actions";
import { getUserData, updateUserData as updateUserFirestore } from "../../firestore";
import UserUtils from "../../utils/UserUtils";

export const REQUEST_LOGIN = "auth/REQUEST_LOGIN";

export const REQUEST_USER_DATA = "auth/REQUEST_USER_DATA";
export const SUCCESS_USER_DATA = "auth/SUCCESS_USER_DATA";
export const FAILURE_USER_DATA = "auth/FAILURE_USER_DATA";

export const SET_USER = "auth/SET_USER";
export const SET_ERROR = "auth/SET_ERROR";

export const requestLogin = createAction(REQUEST_LOGIN);
export const requestUserData = createAction(REQUEST_USER_DATA);
export const successUserData = createAction(SUCCESS_USER_DATA);
export const failureUserData = createAction(FAILURE_USER_DATA);
export const setUser = createAction(SET_USER);
export const setError = createAction(SET_ERROR);

const getUser = (userId) => async dispatch => {
  dispatch(requestUserData());

  const response = await getUserData({ userId });

  if (response && !response.error) {
    dispatch(successUserData(response));
  } else {
    dispatch(failureUserData("error"));
  }
}

const updateUserData = ({ user, userId }) => async () => {
  await updateUserFirestore({ user, userId });
}

export const login = user => async dispatch => {
  dispatch(setUser(user));
  dispatch(updateUserData({ user: UserUtils(user), userId: user.uid}))
  dispatch(getUser(user.uid));
  dispatch(resetCameras())
};


export const logout = () => async dispatch => {
  dispatch(requestLogin());
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(setUser(null));
    })
    .catch(error => {
      dispatch(setError(error));
    });
};