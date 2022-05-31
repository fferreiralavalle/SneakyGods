import * as firebase from "firebase";

export default {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // Other config options...
}

export const initConfig = {
  apiKey: "AIzaSyD82x-PqSZNghgk605jv7N_cFZvEgnZqUw",
  authDomain: "card-creator-55c80.firebaseapp.com",
  databaseURL: "https://card-creator-55c80.firebaseio.com",
  projectId: "card-creator-55c80",
  storageBucket: "card-creator-55c80.appspot.com",
  messagingSenderId: "38411754378",
  appId: "1:38411754378:web:cd343e8de4e799a7f58673"
};


export const baseServerUrl = "http://localhost:5001/seguridad-plus-plus/us-central1/app/api/"

export const pyhtonServer = "http://0.0.0.0:6969/";