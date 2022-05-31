import config from "../config/firebase";
const firebase = require('firebase');
const firebaseui = require('firebaseui');

const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', config);
  
export const logout = firebase.auth().signOut().catch(error => {
  // TODO: Dispatch Error Action
  console.log({ error });
});