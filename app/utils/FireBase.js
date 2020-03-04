import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAbHceNWCul53P-2bLAkeue2FkrvPlDzQk",
  authDomain: "tenedores-f99bd.firebaseapp.com",
  databaseURL: "https://tenedores-f99bd.firebaseio.com",
  projectId: "tenedores-f99bd",
  storageBucket: "tenedores-f99bd.appspot.com",
  messagingSenderId: "543257889952",
  appId: "1:543257889952:web:4ec8fbf65f0a0611198dc5"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
