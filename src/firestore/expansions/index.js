
// GET Expansions
export const getExpansion = async ({ expansionId }, db) => {
  try {
    const ref = await db.collection("expansions").doc(expansionId);
    const data = await ref.get().then((doc) => doc.exists && doc.data());
    return { ...data, id: ref.id };
  } catch (error) {
    return {
      error: {code: 500, message: "Expansions not found"}
    };
  }
};

export const addExpansion = async ({ expansion }, db) => {
  try {
    const result = await db.collection("expansion").add(expansion);
    return result;
  } catch (error) {
    return {code: 500, message: "Expansion creation error"}
  }
}