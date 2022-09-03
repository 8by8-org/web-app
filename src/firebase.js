import * as firebase from "firebase/app";
import * as authObject from "firebase/auth";
<<<<<<< HEAD
import { getFunctions } from "firebase/functions";
=======
import { getDatabase } from "firebase/database";
>>>>>>> 33f99b4a1542830a640a38b944f20da8b828d725

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "by8-318322.firebaseapp.com",
  databaseURL: "https://by8-318322-default-rtdb.firebaseio.com",
  projectId: "by8-318322",
  storageBucket: "by8-318322.appspot.com",
  messagingSenderId: "886066433112",
  appId: "1:886066433112:web:7fe497647abaa5fc4a4e2d",
});

export const auth = authObject;
export const database = getDatabase(app);
export default app;
