// GET Card
export const getCard = async ({ cardId }, db) => {
  try {
    const ref = await db.collection("cards").doc(cardId);
    const data = await ref.get().then((doc) => doc.exists && doc.data());
    return { ...data, id: ref.id };
  } catch (error) {
    return {
      error: {code: 500, message: "Card not found"}
    };
  }
};

// ADD Card
export const addCard = async ({ card }, db) => {
  try {
    const result = await db.collection("cards").add(card);
    return { ...card, id: result.id };
  } catch (error) {
    return {
      error: {code: 500, message: "Card creation error"}
    };
  }
}

// Update Card
export const updateCard = async ({ card, cardId }, db) => {
  try {
    const { id: idUseless, ...cardData } = card;

    const result = await db
      .collection("cards")
      .doc(`${cardId}`)
      .update({
        ...cardData,
      });
    return result;
  } catch (error) {
    return {
      error: {code: 500, message: "Card Update error"}
    };
  }
}

// Remove Card
export const removeCard = async ({ cardId }, db) => {
  try {
    await db.collection("cards").doc(cardId).delete();
    return {};
  } catch (error) {
    return {
      error: {code: 500, message: "Card deletion error"}
    };
  }
}