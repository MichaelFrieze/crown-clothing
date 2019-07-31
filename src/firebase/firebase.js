import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRKg6ggw8q6y4gL1OglxTVdP0OtWWjegk",
  authDomain: "crwn-db-a5823.firebaseapp.com",
  databaseURL: "https://crwn-db-a5823.firebaseio.com",
  projectId: "crwn-db-a5823",
  storageBucket: "",
  messagingSenderId: "512634594476",
  appId: "1:512634594476:web:e4dbea3c62cf7463"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
