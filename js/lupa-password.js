import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
        import { getDatabase, ref as dbRef, get, set } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
        import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDxhrpBg9U-EynKM1vidldk9cxsqyG_QhU",
            authDomain: "dummy-kotlin-libe.firebaseapp.com",
            databaseURL: "https://dummy-kotlin-libe-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "dummy-kotlin-libe",
            storageBucket: "dummy-kotlin-libe.appspot.com",
            messagingSenderId: "259175914565",
            appId: "1:259175914565:web:2362640b70e84040c2d72c"
        };

        const mailField = document.getElementById('mail');
        const labels = document.getElementsByTagName('label');
        const resetPasswordButton = document.getElementById('resetPassword');
        
        const firebaseApp = initializeApp(firebaseConfig);
        const auth = getAuth(firebaseApp);
        
        // Aktifkan reset password melalui email
        auth.useDeviceLanguage();
        auth.settings.appVerificationDisabledForTesting = true;
        
        // Fungsi untuk menampilkan pesan sukses
        function tampilkanPesanSukses(pesan) {
            const elemenPesanSukses = document.getElementById('pesanSukses');
            if (elemenPesanSukses) {
                elemenPesanSukses.textContent = pesan;
            }
        }
        
        // Fungsi untuk menampilkan pesan kesalahan
        function tampilkanPesanKesalahan(pesan) {
            const elemenPesanKesalahan = document.getElementById('pesanKesalahan');
            if (elemenPesanKesalahan) {
                elemenPesanKesalahan.textContent = pesan;
            }
        }
        
        // Fungsi resetPasswordFunction didefinisikan sebelum event listener
        const resetPasswordFunction = () => {
            const email = mailField.value;
        
            // Kirim email reset password
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    console.log('Email Reset Password Telah Dikirim dengan Sukses!');
                    tampilkanPesanSukses("Email reset password telah dikirim dengan sukses!");
                })
                .catch(error => {
                    console.error(error);
                    tampilkanPesanKesalahan("Error mengirim email reset password. Silakan coba lagi.");
                });
        };
        
        // Event listener setelah fungsi resetPasswordFunction didefinisikan
        resetPasswordButton.addEventListener('click', resetPasswordFunction);
        
        // Animasi
        mailField.addEventListener('focus', () => {
            labels.item(0).className = "focused-field";
        });
        
        mailField.addEventListener('blur', () => {
            if (!mailField.value)
                labels.item(0).className = "unfocused-field";
        });
        