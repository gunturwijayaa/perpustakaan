//fungsi untuk menambahkan akun admin 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';

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
const db = getDatabase(app);

const buttonSignup = document.getElementById('buttonSignup');
buttonSignup.addEventListener('click', async (e) => {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (username === '' || email === '' || password === '') {
        alert('Harap isi semua kolom yang wajib diisi.');
    } else {
        // Menggunakan Firebase Realtime Database
        try {
            const userRef = push(ref(db, "Akun-Anggota"), {
                username: username,
                email: email,
                password: password,
            });

            alert('User Telah Ditambahkan dengan ID: ' + userRef.key);

            // Kosongkan nilai semua field input setelah data berhasil ditambahkan
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            document.getElementById('buttonSignup').style.display = 'block';
        } catch (error) {
            console.error('Error saat menyimpan data: ', error);
            alert('Gagal menyimpan data. Silakan coba lagi.');
        }
    }
});
