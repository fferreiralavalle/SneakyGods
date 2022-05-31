import { createAction } from "@reduxjs/toolkit";
import { addUserCardData, getUserCardsData, removeUserCardData, updateUserCardData } from "../../firestore";

export const GET_CARDS_REQUEST = "cards/GET_CARDS_REQUEST";
export const GET_CARDS_SUCCESS = "cards/GET_CARDS_SUCCESS";
export const GET_CARDS_FAILURE = "cards/GET_CARDS_FAILURE";

export const ADD_CARD_REQUEST = "cards/ADD_CARDS_REQUEST";
export const ADD_CARD_SUCCESS = "cards/ADD_CARDS_SUCCESS";
export const ADD_CARD_FAILURE = "cards/ADD_CARDS_FAILURE";

export const getCardsRequest = createAction(GET_CARDS_REQUEST);
export const getCardsSuccess = createAction(GET_CARDS_SUCCESS);
export const getCardsFailure = createAction(GET_CARDS_FAILURE);

export const addCardRequest = createAction(ADD_CARD_REQUEST);
export const addCardSuccess = createAction(ADD_CARD_SUCCESS);
export const addCardFailure = createAction(ADD_CARD_FAILURE);

export const getCards = ({ userId }) => async dispatch => {
  dispatch(getCardsRequest());

  const response = await getUserCardsData({ userId });

  if (response && !response.error) {
    const { cardList } = await response;
    dispatch(getCardsSuccess(cardList));
  } else {
    dispatch(getCardsFailure("error"));
  }
};

export const addCard = ({ userId, card }, onSucess) => async dispatch => {
  dispatch(addCardRequest());

  const response = await addUserCardData({ userId, card });

  if (response && !response.error) {
    const { card: cardResult } = response;
    if (onSucess) onSucess(cardResult);
    dispatch(addCardSuccess(cardResult));
  } else {
    dispatch(addCardFailure("error"));
  }
  if (onSucess) onSucess();
};

export const updateCard = ({ cardId, card }, onSucess) => async dispatch => {
  dispatch(addCardRequest());

  const response = await updateUserCardData({ cardId, card });

  if (response && !response.error) {
    const { card: cardResult } = response;
    dispatch(addCardSuccess(cardResult));
  } else {
    dispatch(addCardFailure("error"));
  }
  if (onSucess) onSucess();
};

export const removeCard = ({ cardId, userId }, onSucess) => async dispatch => {
  dispatch(getCardsRequest());

  const response = await removeUserCardData({ userId, cardId });

  if (response && !response.error) {
    const { cardList } = response;
    dispatch(getCardsSuccess(cardList));
  } else {
    dispatch(getCardsFailure("error"));
  }
  if (onSucess) onSucess();
};