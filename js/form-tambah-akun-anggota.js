import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref as dbRef,get,set } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";


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

const btn_save2 = document.getElementById('btn_save2');
btn_save2.addEventListener('click', async (e) => {
    var currentTimeMillis = new Date().getTime();
    const nim = document.getElementById('nim').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;    


    if (nim === '' || name === '' || email === '' || password === '') {
        alert('Harap isi semua kolom yang wajib diisi.');
    } else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            const dataRef = dbRef(db, "Users/" + user.uid);
            const data = {
                nim: nim,
                name: name,
                email: email,
                profileImage: "",
                timestamp: currentTimeMillis,
                uid: user.uid,
                userType: "user"
            };

            set(dataRef, data)
            .then(() => {
                alert('User Telah Ditambahkan dengan ID: ' + user.uid);
            }) 
            .catch((error) => {
                showMessage("Terjadi kesalahan saat menambahkan akun: " + error.message);
            });

            document.getElementById('nim').value = '';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
           
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Error: " + errorMessage);
        });
    }
});

//error Error: Cannot set properties of null (setting 'value')