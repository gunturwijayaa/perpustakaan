import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref as dbRef,get,set } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDxhrpBg9U-EynKM1vidldk9cxsqyG_QhU",
    authDomain: "dummy-kotlin-libe.firebaseapp.com",
    databaseURL: "https://dummy-kotlin-libe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dummy-kotlin-libe",
    storageBucket: "dummy-kotlin-libe.appspot.com",
    messagingSenderId: "259175914565",
    appId: "1:259175914565:web:2362640b70e84040c2d72c"
  };


  
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

