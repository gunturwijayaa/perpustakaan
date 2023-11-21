//fungsi untuk menambahkan akun admin 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";

import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';


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