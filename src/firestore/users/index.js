import { getUserCardsData } from "..";
import { getCard, addCard, removeCard } from "../cards";
import { addExpansion as addExpansionBase, getExpansion } from "../expansions";
import userInitialData from "./initialData"
// Set User User
export const setUser = async ({ user, userId }, db) => {
  try {
    const { id: idUseless, ...userData } = user;
    const result = await db
      .collection("users")
      .doc(`${userId}`)
      .set({
        ...userInitialData,
        ...userData,
      });
    return result;
  } catch (error) {
    return {
      error: {code: 500, message: "User Update error"}
    };
  }
}

// Update User
export const updateUser = async ({ user, userId }, db) => {
  try {
    const { id: idUseless, ...userData } = user;
    const result = await db
      .collection("users")
      .doc(`${userId}`)
      .update({
        ...userData,
      });
    return result || {};
  } catch (error) {
    return {
      error: {code: 500, message: error}
    };
  }
}

export const addExpansion = async ({ userId, expansionId }, db) => {
  try {
    const ref = await db.collection("users").doc(userId);
    const data = await ref.get().then((doc) => doc.exists && doc.data());
    const expansionList = data.expansionList ? data.expansionList : [];
    if(!expansionList.includes(expansionId))
      expansionList.push(expansionId)
    const updatedUser = await updateUser({
      expansionList,
      db,
    });
    if (!updatedUser.error)
      return updatedUser;
    throw new Error()
  } catch (error) {
    return {code: 500, message: "Expansion creation error"}
  }
}

export const removeExpansion = async ({userId, expansionId }, db) => {
  try {
    const ref = await db.collection("users").doc(userId);
    const data = await ref.get().then((doc) => doc.exists && doc.data());
    const expansionList =
      (data.expansionList || []).filter((expId)=>expId!==expansionId);
    const updatedUser = await updateUser({
      expansionList,
      db,
    });
    return updatedUser;
  } catch (error) {
    return {code: 500, message: "Expansion deletion error"}
  }
}

// GET User
export const getUser = async ({ userId }, db) => {
  try {
    const ref = await db.collection("users").doc(userId);
    const data = await ref.get().then((doc) => doc.exists && doc.data());
    if (!data){
      await setUser({user: userInitialData, userId}, db)
    }
    // Checks for default expansion
    if (!data.expansionList || !data.expansionList.length===0){
      let result = await addExpansionBase(
        { title: "Base Set", cardLists : [] })
      if (!result.error){
        result = await addExpansion({ userId, expansionId: result.id })
        if (!result.error)
          return { ...result, id: ref.id };;
      }
    }
    return { ...data, id: ref.id };
  } catch (error) {
    return {
      error: {code: 500, message: "User not found"}
    };
  }
};

// GET Users
export const getUsers = async (props, db) => {
  try {
    const snapshot = await db.collection('users').get();
    const userList = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    return userList;
  } catch (error) {
    return {
      error: {code: 500, message: "Error getting the users"}
    };
  }
}

// GET User Expansions
export const getExpansions = async ({ userId }, db) => {
  try {
    const ref = await db.collection("users").doc(userId);
    const data = await ref.get().then((doc) => doc.exists && doc.data());
    const expansionsList = data.expansionList ? data.expansionList : [];
    const expansions = await Promise.all(
      expansionsList.map(async (expRefs) => getExpansion({ id: expRefs.id, db }))
    );
    return { expansionList: expansions };
  } catch (error) {
    return {
      error: {code: 500, message: "User not found"}
    };
  }
};

// Gets User Cards
export const getCards = async ({ userId }, db ) => {
  try {
    const ref = await db.collection("users").doc(userId);
    const data = await ref.get().then((doc) => doc.exists ? doc.data() : {});
    const cardList = data.cardList ? data.cardList : [];
    const cards = await Promise.all(
      cardList.map(async (cardRef) => getCard({ cardId: cardRef }, db))
    );
    return { cardList: cards };
  } catch (error) {
    return {
      error: {code: 500, message: "User not found"}
    };
  }
}

// Add User Card
export const addCardData = async ({ userId, card }, db) => {
  try {
    const ref = await db.collection("users").doc(userId);
    const data = await ref.get().then((doc) => doc.exists ? doc.data() : {});
    const cardData = await addCard({ card }, db);
    if (!cardData.error){
      const cardList = data.cardList ? data.cardList : [];
      if(!cardList.includes(cardData.id))
        cardList.push(cardData.id)
      const updatedUser = await updateUser({
          user: { cardList },
          userId
        }, db);
      if (!updatedUser.error)
        return cardData;
      throw new Error()
    }
    throw new Error()
  } catch (error) {
    return {code: 500, message: "Card creation error"}
  }
}

export const removeCardData = async ({ userId, cardId }, db) => {
  try {
    const userData = await getUser({ userId }, db);
    let result = await removeCard({ cardId }, db);
    if (!result.error && !userData.error){
      const newCardList = userData.cardList.filter((id) => cardId!==id)
      result = await updateUser({ user: { cardList: newCardList}, userId }, db)
      if (result.error){
        throw new Error()
      }
      const newCardListData = await getUserCardsData({ userId })
      return newCardListData
    }
    throw new Error()
  } catch (error) {
    return { code: 500, message: "Card deletion error" }
  }
}