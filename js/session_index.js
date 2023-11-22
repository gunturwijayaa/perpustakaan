import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref as dbRef, push, onValue } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
  
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
  const db = getDatabase(app);
  

  const auth = getAuth(); 
  // Get a reference to the Firebase database
  const database = app;
  var userSnap = "";

  // Reference to the node containing the data you want to retrieve
  // const dataRef = database.ref('data/value');

  const user = auth.currentUser;
  auth.onAuthStateChanged(user => {
    if (user) {
      const uid = user.uid;

      const dataRef = dbRef(db, 'Users/' + user.uid);
      
        onValue(dataRef, (snapshot) => {
          const data = snapshot.val();
          if (data.userType = "admin") {
            window.location.href = "/html/form-dashboard.html";
            
           } else if (data.userType = "user") {
            document.getElementById('tampilkan-form').style.visibility = 'hidden'
            
           }
          // var userSnap = (data.userType);
        });
      //
      //
      
      console.log('user logged in: ' + uid);
      window.location.href = "http://127.0.0.1:5500/html/form-dashboard.html";
      //
      //
    } else {
       //alert('Berhasil logout: ');
      //
    }
  });