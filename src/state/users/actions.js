import {
  createAction
} from "@reduxjs/toolkit";
import { getUserCardsData, getUsersData } from "../../firestore";

export const REQUEST_USERS = "users/REQUEST_USERS";
export const SUCCESS_USERS = "users/SUCCESS_USERS";
export const FAILURE_USERS = "users/FAILURE_USERS";

export const REQUEST_USER_CARDS = "users/REQUEST_USER_CARDS";
export const SUCCESS_USER_CARDS = "users/SUCCESS_USER_CARDS";
export const FAILURE_USER_CARDS = "users/FAILURE_USER_CARDS";

export const requestUsers= createAction(REQUEST_USERS);
export const successUsers = createAction(SUCCESS_USERS);
export const failureUsers = createAction(FAILURE_USERS);

export const requestUserCards = createAction(REQUEST_USER_CARDS);
export const successUserCards = createAction(SUCCESS_USER_CARDS);
export const failureUserCards = createAction(FAILURE_USER_CARDS);

const getUsers = () => async dispatch => {
  dispatch(requestUsers());

  const response = await getUsersData();

  if (response && !response.error) {
    dispatch(successUsers(response));
  } else {
    dispatch(failureUsers(response.error.message));
  }
}

export const getUserCards = ({ userId }) => async dispatch => {
  dispatch(requestUserCards());

  const response = await getUserCardsData({ userId });

  if (response && !response.error) {
    const { cardList } = response;
    dispatch(successUserCards(cardList));
  } else {
    dispatch(failureUserCards(response.error.message));
  }
}

export default getUsers;