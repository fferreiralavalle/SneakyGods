import { updateCard } from "./cards";
import { getUser, getExpansions, getCards, addCardData, removeCardData, getUsers, updateUser } from "./users";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
  apiKey: 'AIzaSyD82x-PqSZNghgk605jv7N_cFZvEgnZqUw',
  authDomain: 'card-creator-55c80.firebaseapp.com',
  projectId: 'card-creator-55c80'
});

const db = firebase.firestore();

export const getUserData = async ({ userId }) => {
  return getUser({ userId }, db);
}

export const getUsersData = async () => {
  return getUsers({}, db);
}

export const updateUserData = async ({ user, userId }) => {
  return updateUser({ user, userId }, db);
}

export const getExpansionsData = async ({ userId }) => {
  return getExpansions({ userId }, db);
}

export const getUserCardsData = async ({ userId }) => {
  return getCards({ userId }, db);
}

export const addUserCardData = async ({ userId, card }) => {
  return addCardData({ userId, card }, db);
}

export const updateUserCardData = async ({ card, cardId }) => {
  return updateCard({ card, cardId }, db);
}

export const removeUserCardData = async ({userId, cardId }) => {
  return removeCardData({ userId, cardId }, db);
}