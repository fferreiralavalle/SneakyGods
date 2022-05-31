import { getCard } from "../cards";

// GET Card List
export const getCardList = async ({ cardListId }, db) => {
  try {
    const ref = await db.collection("cardLists").doc(cardListId);
    const data = await ref.get().then((doc) => doc.exists && doc.data());
    return { ...data, id: ref.id };
  } catch (error) {
    return {
      error: {code: 500, message: "Card not found"}
    };
  }
};

// Get Cards from List
export const getCardsFromList = async ({ listId }, db) => {
  try {
    const ref = await db.collection("cardLists").doc(listId);
    const data = await ref.get().then((doc) => doc.exists && doc.data());
    const cardsList = data.cardList ? data.cardList : [];
    const cards = await Promise.all(
      cardsList.map(async (cardRef) => getCard({ id: cardRef.id, db }))
    );
    return { cards, id: ref.id };
  } catch (error) {
    return {
      error: {code: 500, message: "Card not found"}
    };
  }
};

// ADD Card List
export const addCardList = async ({ cardList }, db) => {
  try {
    const result = await db.collection("cardLists").add(cardList);
    return result;
  } catch (error) {
    return {
      error: {code: 500, message: "Card List creation error"}
    };
  }
}

// Update Card List
export const updateCardList = async ({ cardList, listId }, db) => {
  try {
    const { id: idUseless, ...cardListData } = cardList;
    const result = await db
      .collection("cards")
      .doc(`${listId}`)
      .update({
        ...cardListData,
      });
    return result;
  } catch (error) {
    return {
      error: {code: 500, message: "Card Update error"}
    };
  }
}

// Remove Card from List
export const removeCardFromList = async ({ cardId, cardListId }, db) => {
  try {
    const result = await getCardList({cardListId}, db);
    if (!result.error){
      const newCardList =
        result.cardList &&
        result.cardList.filter(
          (cardIdList) => cardIdList!==cardId
        )
      const updateResult = await updateCardList({...result, cardList: newCardList}, db)
      return updateResult;
    }
    return result;
  } catch (error) {
    return {
      error: {code: 500, message: "Card List creation error"}
    };
  }
}