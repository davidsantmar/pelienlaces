import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAHiDPaJTBx9CuQQOhywAjoPp_e-1-wsvU",
  authDomain: "peliadvisor.firebaseapp.com",
  projectId: "peliadvisor",
  storageBucket: "peliadvisor.appspot.com",
  messagingSenderId: "1094827298955",
  appId: "1:1094827298955:web:84ff1660af58e96186048e",
  measurementId: "G-SZBP9XV5BY"
};

firebase.initializeApp(firebaseConfig);
export const authentication = firebase;
export const db = firebase.firestore();