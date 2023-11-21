//fungsi untuk menambahkan akun admin 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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

const buttonSignup = document.getElementById('buttonSignup');
buttonSignup.addEventListener('click', async (e) => {
    var currentTimeMillis = new Date().getTime();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    // var profileimage = document.getElementById('profileimage').value;
    // var timestamp = document.getElementById("timestamp").value;
    // var uid = document.getElementById('uid').value;
    // var userType = document.getElementById('userType').value;
    // Get the current time in milliseconds using JavaScript
    
    if (name === '' || email === '' || password === '') {
        alert('Harap isi semua kolom yang wajib diisi.');
    } else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //
            const user = userCredential.user;

            const userRef = push(ref(db, "Users/" + user.uid), {
                name: name,
                email: email,
                profileImage: "",
                timestamp: currentTimeMillis,
                uid: user.uid,
                userType: "user"
            })
                alert('User Telah Ditambahkan dengan ID: ' + userRef.key);

            // Kosongkan nilai semua field input setelah data berhasil ditambahkan
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';

            document.getElementById('buttonSignup').style.display = 'block';
            // ...
        
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
        // Menggunakan Firebase Realtime Database
    }
});