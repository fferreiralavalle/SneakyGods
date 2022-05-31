export default (userData) => {
  return {
    id: userData.uid,
    profileUrl: userData.photoURL,
    name: userData.displayName
  }
}