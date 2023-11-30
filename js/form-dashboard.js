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

//buku

// Mendapatkan referensi database
const database = firebase.database();

// Mendapatkan referensi ke node "Books" di database
const booksRef = database.ref('Books');

// Mendengarkan perubahan pada node "Books"
booksRef.on('value', (snapshot) => {
  // Mendapatkan data buku dari snapshot
  const books = snapshot.val();

  // Menghitung jumlah buku
  const jumlahBuku = books ? Object.keys(books).length : 0;

  // Memperbarui elemen HTML dengan ID "banyakBuku"
  document.getElementById('banyakBuku').innerText = ` ${jumlahBuku}`;
});


//anggota

const anggotaRef = database.ref('Users');

// Mendengarkan perubahan pada node "Users"
anggotaRef.on('value', (snapshot) => {
  // Mendapatkan data anggota dari snapshot
  const anggota = snapshot.val();

  // Menghitung jumlah anggota berdasarkan userType
  const jumlahAnggota = {
    user: 0,
   
    // Tambahkan jenis userType lainnya jika ada
  };

  if (anggota) {
    // Loop melalui setiap anggota dan tambahkan ke jumlah sesuai userType
    Object.values(anggota).forEach((user) => {
      if (user.userType && jumlahAnggota[user.userType] !== undefined) {
        jumlahAnggota[user.userType]++;
      }
    });
  }

  // Memperbarui elemen HTML dengan ID "banyakAnggota"
  document.getElementById('banyakAnggota').innerText = ` ${jumlahAnggota.user} `;
  // Tambahkan jenis userType lainnya jika ada
});


const downloadRef = database.ref('Books');

// Mendengarkan perubahan pada node "Books"
downloadRef.on('value', (snapshot) => {
  // Mendapatkan data buku dari snapshot
  const books = snapshot.val();

  // Inisialisasi jumlah download
  let jumlahDownload = 0;

  if (books) {
    // Loop melalui setiap buku dan tambahkan ke jumlah sesuai downloadsCount
    Object.values(books).forEach((book) => {
      if (book.downloadsCount) {
        jumlahDownload += Number(book.downloadsCount, 10) || 0;
      }
    });
  }

  // Memperbarui elemen HTML dengan ID "banyakDownload"
  document.getElementById('banyakDownload').innerText = ` ${jumlahDownload} `;
});
