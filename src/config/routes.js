export default {
  login: "/login",
  home: "/",
  usersView: "/users",
  userView: "/users/:userId",
};

// Internal Routes
export const getRoute = (url, values) => {
  const mapValues = values && {
    ":userId": values.userId
  };
  return url.replace(/:userId/gi, matched => {
    return mapValues[matched];
  });
};
