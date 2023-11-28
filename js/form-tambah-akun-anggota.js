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
      var nama = document.getElementById('nama').value;
      var email = document.getElementById('email').value;
      var nim = document.getElementById('nim').value;
      var no_hp = document.getElementById('no_hp').value;
      var alamat = document.getElementById('alamat').value;
      var password = document.getElementById('password').value;
      var prodi = document.getElementById('prodi').value; // Mengambil nilai prodi
    
      if (nama === '' || email === '' || nim === '' || alamat === '' || password === '' || prodi === '') {
        alert('Harap isi semua kolom yang wajib diisi dan pilih prodi.');
      } else {
        // Menggunakan Firebase Firestore
        try {
          // Simpan data ke koleksi "Akun-Anggota"
          const akunAnggotaDocRef = await addDoc(collection(db, "Akun-Anggota"), {
            nama: nama,
            email: email,
            nim: nim,
            no_hp: no_hp,
            alamat: alamat,
            password: password,
            prodi: prodi, // Menambahkan prodi ke data
          });
    
          // Simpan data ke koleksi "Anggota"
          const anggotaDocRef = await addDoc(collection(db, "Anggota"), {
            nama: nama,
            nim: nim,
            no_hp: no_hp,
            prodi: prodi,
          });
    
          alert('User Telah Ditambahkan dengan ID: ' + akunAnggotaDocRef.id);
    
          // Kosongkan nilai semua field input setelah data berhasil ditambahkan
          document.getElementById('nama').value = '';
          document.getElementById('email').value = '';
          document.getElementById('nim').value = '';
          document.getElementById('no_hp').value = '';
          document.getElementById('alamat').value = '';
          document.getElementById('password').value = '';
          document.getElementById('prodi').value = ''; // Mengosongkan pilihan prodi
    
          document.getElementById('btn_save').style.display = 'block';
        } catch (error) {
          console.error('Error saat menyimpan data: ', error);
          alert('Gagal menyimpan data. Silakan coba lagi.');
        }
      }
    });
    