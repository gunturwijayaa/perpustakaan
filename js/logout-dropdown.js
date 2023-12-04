import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  
  
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
  const auth = getAuth();
  const buttonLogout = document.getElementById('logout-link2');
  buttonLogout.addEventListener('click' , ()=>{

    signOut(auth).then(() => {
      //
      alert('Berhasil Log Out');
      localStorage.removeItem('isLoggedIn');
      window.location.href = 'login.html';
    }).catch((error) => {
      //
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage, errorCode);
    });

  });
  // logout feature