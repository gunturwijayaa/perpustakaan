
// Fungsi untuk menangani unggah gambar
document.getElementById('upload').addEventListener('change', function (event) {
    const fileInput = event.target;
    const uploadedAvatar = document.getElementById('uploadedAvatar');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Setel sumber gambar baru ke elemen gambar
            uploadedAvatar.src = e.target.result;
        };

        // Baca gambar yang diunggah sebagai URL data
        reader.readAsDataURL(fileInput.files[0]);
    }
});

 // Mendapatkan elemen input kode buku
 const kodeBukuInput = document.getElementById('kode_buku');
  let initialKodeBuku = 'A99'; // Backup kode buku awal saat halaman dimuat

  // Mengisi nilai awal pada input kode buku saat halaman dimuat
  kodeBukuInput.value = initialKodeBuku;

  // Fungsi untuk menghasilkan kode buku berikutnya
  function generateNextKodeBuku() {
    const currentNumber = parseInt(initialKodeBuku.substring(1));
    const nextNumber = currentNumber + 1;
    const nextKodeBuku = 'A' + nextNumber;
    kodeBukuInput.value = nextKodeBuku;
    initialKodeBuku = nextKodeBuku; // Update initialKodeBuku for future increments
  }

  // Panggil fungsi generateNextKodeBuku() ketika Anda ingin mengunggah buku baru
  // Ini akan menghasilkan kode buku berikutnya secara otomatis
  generateNextKodeBuku();

  // Fungsi untuk mengembalikan kode buku ke nilai awal saat tombol "Reset" ditekan
  document.getElementById('resetData').addEventListener('click', function () {
    
    kodeBukuInput.value = initialKodeBuku;
  });


  // ...


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyCvrU2mXPzdc_MvmffICTcFKGTSsCuv11I",
    authDomain: "authfirebase-552c7.firebaseapp.com",
    databaseURL: "https://authfirebase-552c7-default-rtdb.firebaseio.com",
    projectId: "authfirebase-552c7",
    storageBucket: "authfirebase-552c7.appspot.com",
    messagingSenderId: "339816014771",
    appId: "1:339816014771:web:aa0e406a41c651018d21c6"
    };

    
  const input = document.getElementById("upload");
  const saveButton = document.getElementById("saveButton");
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  
  let uploadedFile = null; // Variabel untuk menyimpan file yang akan diunggah

  // Fungsi untuk mengunggah gambar ke Firebase Storage
function uploadImage(file) {
  const storageRef = ref(storage, "images/" + file.name);
  return uploadBytes(storageRef, file)
    .then((snapshot) => {
      console.log("Unggah berhasil!");
      return snapshot;
    })
    .catch((error) => {
      console.error("Gagal mengunggah gambar: " + error.message);
      throw error;
    });
}

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    // Simpan file yang akan diunggah
    uploadedFile = file;
  }
});

function showMessage(message) {
  alert(message); // Contoh sederhana dengan menggunakan alert
}



// Handle klik tombol "Save"
saveButton.addEventListener("click", () => {
  // Dapatkan nilai input dari elemen-elemen HTML
  const kodeBuku = document.getElementById("kode_buku").value.trim();
  const judulBuku = document.getElementById("judul_buku").value.trim();
  const penerbit = document.getElementById("penerbit").value.trim();
  const penulis = document.getElementById("penulis").value.trim();
  const deskripsi = document.getElementById("deskripsi").value.trim();
  const kategori = document.getElementById("kategori").value.trim();

  if (!kodeBuku || !judulBuku || !penerbit || !penulis || !deskripsi || !kategori) {
    showMessage("Harap isi semua kolom sebelum menyimpan data.");
    function showMessage(message) {
      alert(message); // Contoh sederhana dengan menggunakan alert
    }
    
  } else if (!uploadedFile) {
    showMessage("Pilih gambar terlebih dahulu sebelum mengunggah.");
    function showMessage(message) {
      alert(message); // Contoh sederhana dengan menggunakan alert
    }
  } else {
    // Unggah gambar saat tombol "Save" diklik
    uploadImage(uploadedFile)
  .then((snapshot) => {
    // Get the download URL after successful upload
    return getDownloadURL(snapshot.ref);
  })
  .then((url) => {
    // Continue with the rest of your logic
    // ...

    // Dapatkan referensi ke koleksi "Data-Buku" di Firestore
    const dataBukuCollection = collection(firestore, "Data-Buku");

    // Buat objek data untuk disimpan ke Firestore
    const data = {
      kode_buku: kodeBuku,
      judul_buku: judulBuku,
      penerbit: penerbit,
      penulis: penulis,
      kategori: kategori,
      gambar_url: url, // Use the obtained URL
    };

    // Tambahkan data ke koleksi "Data-Buku" di Firestore
    addDoc(dataBukuCollection, data)
      .then(() => {
        showMessage("Data berhasil disimpan ke Firestore.");
        // Reset nilai input field setelah berhasil menyimpan data
        // ...
      })
      .catch((error) => {
        showMessage("Terjadi kesalahan saat menyimpan data: " + error.message);
        // ...
      });
  })
  .catch((error) => {
    showMessage("Terjadi kesalahan saat mendapatkan URL gambar: " + error.message);
    // ...
  });
  }
});
