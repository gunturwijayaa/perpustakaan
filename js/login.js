//fungsi untuk menambahkan akun admin 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, set, ref, update } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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

    
  function getuserType() {
    var email = document.getElementById('email1').value;

    var userRef = database.ref('Users/' + email)
    userRef.on('value', function(snapshot){
        var data = snapshot.val()

        alert(data.email)
    })
  }
  // Mendengarkan klik pada tombol Sign In
  const buttonSignin = document.getElementById('buttonSignin');
  buttonSignin.addEventListener('click', async (e) => {
      var email = document.getElementById('email1').value;
      var password = document.getElementById('password1').value;

      if (email === '' || password === '') {
          alert('Harap isi semua kolom yang wajib diisi.');
      } else {
          try {
              // Memeriksa apakah akun dengan email yang dimasukkan sudah terdaftar di Firestore
              signInWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    //
                    const user = userCredential.user;

                    const dt = new Date();
                    update(ref(db, "Users/" + user.uid),{
                        last_login: dt,
                    })
                    if (userType)   //validate userType
                    alert("Berhasil login!");
                    //f window.location.href = "/html/form-dashboard.html";
                  })
                  .catch( (error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                  });
          } catch (error) {
              console.error('Error saat mengakses Authentication: ', error);
              alert('Gagal masuk. Harap periksa email dan password Anda.');
          }
      }
  });

  
  


