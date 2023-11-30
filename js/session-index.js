import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref as dbRef, push, onValue } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
  
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
          if (data.userType == 'admin') {
            alert("Berhasil login! sebagai " + data.userType);
              window.location.href = "/html/form-dashboard.html";        
            
           } else if (data.userType == "user") {
            alert("Berhasil login! sebagai " + data.userType);
            document.getElementById('tampilkan-form').style.visibility = 'hidden'
           }
          // var userSnap = (data.userType);
        });
      //
      //
      
      console.log('user logged in: ' + uid);
      // window.location.href = "http://127.0.0.1:5500/html/form-dashboard.html";
      //
      //
    } else {
       //alert('Berhasil logout: ');
      //
    }
  });