//fungsi untuk menambahkan akun admin 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";

import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';


// Your web app's Firebase configuration
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
    const db = getFirestore(app);

    btn_save.addEventListener('click', async (e) => {
      var username = document.getElementById('username').value;
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
  
      if (username === '' || email === '' || password === '' ) {
          alert('Harap isi semua kolom yang wajib diisi.');
      } else {
          // Menggunakan Firebase Firestore
          try {
              const docRef = await addDoc(collection(db, "Akun-Admin"), {
                  username: username,
                  email: email,
                  password: password,
              });
  
              alert('User Telah Ditambahkan dengan ID: ' + docRef.id);
  
              // Kosongkan nilai semua field input setelah data berhasil ditambahkan
              document.getElementById('username').value = '';
              document.getElementById('email').value = '';
              document.getElementById('password').value = '';
  
              document.getElementById('btn_save').style.display = 'block';
          } catch (error) {
              console.error('Error saat menyimpan data: ', error);
              alert('Gagal menyimpan data. Silakan coba lagi.');
          }
      }
  });