import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
  import { getDatabase, set, ref, update } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyCvrU2mXPzdc_MvmffICTcFKGTSsCuv11I",
    authDomain: "authfirebase-552c7.firebaseapp.com",
    databaseURL: "https://authfirebase-552c7-default-rtdb.firebaseio.com",
    projectId: "authfirebase-552c7",
    storageBucket: "authfirebase-552c7.appspot.com",
    messagingSenderId: "339816014771",
    appId: "1:339816014771:web:aa0e406a41c651018d21c6"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const buttonLogout = document.getElementById('logout-link');
  buttonLogout.addEventListener('click' , ()=>{

    signOut(auth).then(() => {
      //
      alert('Berhasil Log Out');
      window.location.href = '/user/index.html'
    }).catch((error) => {
      //
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage, errorCode);
    });

  });
  // logout feature