//fungsi untuk menambahkan akun admin 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, set, ref, get, update } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

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
            // Memeriksa apakah akun dengan email yang dimasukkan sudah terdaftar di Realtime Database
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    
                    // Mendapatkan data user dari Realtime Database
                    const userRef = ref(db, "Users/" + user.uid);
                    const userSnapshot = await get(userRef);
                    const userData = userSnapshot.val();

                    // Menggunakan informasi userType dari Realtime Database
                    const userType = userData ? userData.userType : null;

                    // Memperbarui waktu login terakhir
                    const dt = new Date();
                    update(ref(db, "Users/" + user.uid), {
                        last_login: dt.toISOString(),
                    });

                    if (userType === "admin") {
                        alert("Berhasil login!");
                        localStorage.setItem('isLoggedIn', 'true');
                        window.location.href = 'form-dashboard.html';

                    } else {
                        alert("Tipe pengguna tidak valid.");
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                
                    // Menampilkan pesan kesalahan yang lebih rinci di konsol
                    console.error('Error saat masuk:', errorCode, errorMessage);
                
                    // Menampilkan pesan kesalahan kepada pengguna
                    if (errorCode === 'auth/user-not-found') {
                        alert('Akun tidak ditemukan. Silakan periksa kembali email Anda.');
                    } else if (errorCode === 'auth/wrong-password') {
                        alert('Password salah. Silakan periksa kembali password Anda.');
                    } else {
                        alert('Gagal masuk. Silakan cek konsol untuk detail.'+errorMessage+error);
                    }
                });                                  
        } catch (error) {
            console.error('Error saat mengakses Authentication:', error);
            alert('Gagal masuk. Harap periksa email dan password Anda.');
        }
    }
});

