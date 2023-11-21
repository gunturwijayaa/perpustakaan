//fungsi untuk menambahkan akun admin 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

import { getFirestore, collection, getDocs, query,where   } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';


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
              const anggotaQuerySnapshot = await getDocs(query(collection(db, "Akun-Anggota"), where("email", "==", email), where("password", "==", password)));
              const adminQuerySnapshot = await getDocs(query(collection(db, "Akun-Admin"), where("email", "==", email), where("password", "==", password)));
  
              if (anggotaQuerySnapshot.size > 0) {
                  // Data email dan password cocok dengan Firestore untuk Akun-Anggota
                  alert('Berhasil masuk sebagai ' + email);
  
                  // Redirect ke halaman "movie-details.html" jika data sesuai dari Akun-Anggota
                  window.location.href = 'http://127.0.0.1:5500/user/movie-details.html';
              } else if (adminQuerySnapshot.size > 0) {
                  // Data email dan password cocok dengan Firestore untuk Akun-Admin
                  alert('Berhasil masuk sebagai Admin ' + email);
  
                  // Redirect ke halaman "form-dashboard.html" jika data sesuai dari Akun-Admin
                  window.location.href = 'http://127.0.0.1:5500/html/form-dashboard.html';
              } else {
                  alert('Akun tidak ditemukan. Harap periksa email dan password Anda.');
              }
          } catch (error) {
              console.error('Error saat mengakses Firestore: ', error);
              alert('Gagal masuk. Harap periksa email dan password Anda.');
          }
      }
  });
  


