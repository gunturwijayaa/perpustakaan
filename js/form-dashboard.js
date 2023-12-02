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


//download
const downloadRef = database.ref('Books');

// Inisialisasi jumlah download di luar fungsi mendengarkan
let jumlahDownload = 0;

// Mendengarkan perubahan pada node "Books"
downloadRef.on('value', (snapshot) => {
  // Mendapatkan data buku dari snapshot
  const books = snapshot.val();

  // Setiap kali ada perubahan, reset jumlahDownload menjadi 0
  jumlahDownload = 0;

  if (books) {
    // Loop melalui setiap buku
    Object.keys(books).forEach((bookId) => {
      const book = books[bookId];

      // Memeriksa apakah buku memiliki properti downloadsCount
      if (book.downloadsCount) {
        // Menambahkan downloadsCount buku ke dalam jumlah total
        jumlahDownload += Number(book.downloadsCount, 10) || 0;

        // Menampilkan downloadsCount buku (misalnya, di console)
        console.log(`DownloadsCount for book ${bookId}: ${book.downloadsCount}`);
      }
    });
  }

  // Memperbarui elemen HTML dengan ID "banyakDownload"
  const banyakDownloadElem = document.getElementById('banyakDownload');
  if (banyakDownloadElem) {
    banyakDownloadElem.innerText = `${jumlahDownload}`;
  }
});



//views


const viewsRef = database.ref('Books');

// Inisialisasi jumlah download di luar fungsi mendengarkan
let jumlahViews = 0;

// Mendengarkan perubahan pada node "Books"
viewsRef.on('value', (snapshot) => {
  // Mendapatkan data buku dari snapshot
  const views = snapshot.val();

  // Setiap kali ada perubahan, reset jumlahViews menjadi 0
  jumlahViews = 0;

  if (views) {
    // Loop melalui setiap buku
    Object.keys(views).forEach((bookId) => {
      const view = views[bookId];

      // Memeriksa apakah buku memiliki properti viewsCount
      if (view.viewsCount) {
        // Menambahkan viewsCount buku ke dalam jumlah total
        jumlahViews += Number(view.viewsCount, 10) || 0;

        // Menampilkan viewsCount buku (misalnya, di console)
        console.log(`viewsCount for book ${bookId}: ${view.viewsCount}`);
      }
    });
  }

  // Memperbarui elemen HTML dengan ID "banyakDownload"
  const banyakViewsElem = document.getElementById('banyakViews');
  if (banyakViewsElem) {
    banyakViewsElem.innerText = `${jumlahViews}`;
  }
});
