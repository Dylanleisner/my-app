import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCid_egrKNhLGDwYdcRcuBZMUpxI1Heh8c",
    authDomain: "prueba-b13d8.firebaseapp.com",
    projectId: "prueba-b13d8",
    storageBucket: "prueba-b13d8.appspot.com",
    messagingSenderId: "282651888974",
    appId: "1:282651888974:web:972837e558c0563db7221f"
  };

app. initializeApp(firebaseConfig) ;

export const auth = firebase.auth(); //mail contrase;a
export const storage = app.storage(); //foto
export const db = app.firestore(); //documentos