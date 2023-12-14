
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCksyv0dv1YeQNEXMVU0IlQP24YpVeSeD8",
  authDomain: "cuentasjuanymily.firebaseapp.com",
  projectId: "cuentasjuanymily",
  storageBucket: "cuentasjuanymily.appspot.com",
  messagingSenderId: "536017518952",
  appId: "1:536017518952:web:688e56d3a5cbea594b16dd"
};


const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
export const storage = fb.storage();