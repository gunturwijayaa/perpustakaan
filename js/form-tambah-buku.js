


  // Fungsi untuk mengembalikan kode buku ke nilai awal saat tombol "Reset" ditekan
  document.getElementById('resetData').addEventListener('click', function () {
    
  });


  // ...


  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";
  import { getDatabase, ref as dbRef, set, onValue } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
  
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
  const database = getDatabase(firebaseApp);
  
 

  
  function showMessage(message) {
      alert(message);
  }
  
  saveButton.addEventListener("click", () => {
    const judulBuku = document.getElementById("judul_buku").value.trim();
    const penulis = document.getElementById("penulis").value.trim();
    const deskripsi = document.getElementById("deskripsi").value.trim();
    const kategori = document.getElementById("kategori").value.trim();
    const uploadPDF = document.getElementById("pdfFile").files[0]; // Ambil file PDF
    
    var currentTimeMillis = new Date().getTime(); // timestamp

    if (!judulBuku || !penulis || !deskripsi || !kategori || !uploadPDF) {
        showMessage("Harap isi semua kolom sebelum menyimpan data.");
    } else if (!uploadPDF) {
        showMessage("Pilih file PDF terlebih dahulu sebelum mengunggah.");
    } else {
        uploadPDFtoStorage(uploadPDF) // Ganti dengan fungsi upload PDF yang sesuai
            .then((url) => {
                // Simpan URL ke Realtime Database
                const dataRef = dbRef(database, "Books/" + currentTimeMillis);
                const data = {
                    id: currentTimeMillis,
                    title: judulBuku,
                    downloadsCount: "0",
                    timestamp: currentTimeMillis,
                    categoryId: kategori,
                    pdf_url: url, // Gunakan properti pdf_url untuk menyimpan URL file PDF
                    gambar_url: "", // Ganti ini sesuai kebutuhan, misalnya dapat diisi dengan URL gambar jika ada
                    description: deskripsi,
                    viewsCount: "0"
                };

                // Gunakan set untuk menyimpan data ke Realtime Database
                set(dataRef, data)
                    .then(() => {
                        showMessage("Data berhasil disimpan ke Realtime Database.");

                        const movieBanner = document.getElementById('uploadedFile');

                        if (movieBanner) {
                            movieBanner.innerHTML = `<a href="${url}" target="_blank">Tautan PDF</a>`;
                        } else {
                            console.error('Elemen div tidak ditemukan.');
                        }
                    })
                    .catch((error) => {
                        showMessage("Terjadi kesalahan saat menyimpan data: " + error.message);
                    });
            })
            .catch((error) => {
                showMessage("Terjadi kesalahan saat mendapatkan URL file PDF: " + error.message);
            });
    }
});

// Fungsi untuk mengunggah file PDF ke Firebase Storage
function uploadPDFtoStorage(file) {
    const storageRef = ref(storage, "Books/" + file.name);
    return uploadBytes(storageRef, file)
        .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
        })
        .catch((error) => {
            console.error("Gagal mengunggah PDF: " + error.message);
            throw error;
        });
}
