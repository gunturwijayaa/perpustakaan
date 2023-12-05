


  // Fungsi untuk mengembalikan kode buku ke nilai awal saat tombol "Reset" ditekan
  document.getElementById('resetData').addEventListener('click', function () {
    
  });


  // ...


  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";
  import { getDatabase, ref as dbRef, set, get,remove, onValue } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
  
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
  
  const input = document.getElementById("upload");
  const saveButton = document.getElementById("saveButton");
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);
  const database = getDatabase(firebaseApp);
  
 
  document.addEventListener("DOMContentLoaded", function() {
    updateKategoriOptions();    
  });

  
  function showMessage(message) {
      alert(message);
  }

  const categories = {
    "Sastra": "1701730046951",
    // Tambahkan kategori lain di sini sesuai kebutuhan
  };
  
  
  
  saveButton.addEventListener("click", async () => {
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
        try {
            const url = await uploadPDFtoStorage(uploadPDF);

            // Dapatkan ID kategori secara dinamis
            const categoryId = await getCategoryIdByName(kategori);

            // Simpan URL ke Realtime Database
            const dataRef = dbRef(database, "Books/" + currentTimeMillis);
            const data = {
                id: "" + currentTimeMillis,
                title: judulBuku,
                downloadsCount: 0,
                timestamp: currentTimeMillis,
                categoryId: categoryId,
                url: url,
                description: deskripsi,
                viewsCount: 0
            };

            // Gunakan set untuk menyimpan data ke Realtime Database
            await set(dataRef, data);

            showMessage("Data berhasil disimpan ke Realtime Database.");

            const movieBanner = document.getElementById('uploadedFile');

            if (movieBanner) {
                movieBanner.innerHTML = `<a href="${url}" target="_blank">Tautan PDF</a>`;
            } else {
                console.error('Elemen div tidak ditemukan.');
            }
        } catch (error) {
            showMessage("Terjadi kesalahan: " + error.message);
        }
    }
});

// Fungsi asinkron untuk mendapatkan ID kategori berdasarkan nama kategori
async function getCategoryIdByName(categoryName) {
    try {
        // Gantilah ini dengan logika untuk mengambil ID kategori dari sumber data Anda
        // Misalnya, panggil API atau query database
        // Disini saya memberikan contoh menggunakan Promise untuk simulasi pengambilan data

        return new Promise((resolve, reject) => {
            // Simulasikan pengambilan data dari sumber eksternal
            setTimeout(() => {
                const categoryId = categories[categoryName];
                if (categoryId) {
                    resolve(categoryId);
                } else {
                    reject(new Error("Kategori tidak ditemukan"));
                }
            }, 500); // Waktu simulasi pengambilan data
        });
    } catch (error) {
        throw new Error("Terjadi kesalahan saat mendapatkan ID kategori: " + error.message);
    }
}


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


const saveButton_1 = document.getElementById("saveButton_1");
const kategoriSelect = document.getElementById("kategori");

saveButton_1.addEventListener("click", async () => {
    const kategoriInput = document.getElementById("kategori_buku1");
    const kategoriValue = kategoriInput.value.trim();

    // Check if kategori is empty
    if (!kategoriValue) {
        showMessage("Harap isi kolom kategori terlebih dahulu.");
        return; // Stop execution if kategori is empty
    }

    var currentTimeMillis = new Date().getTime(); // timestamp

    try {
        const dataRef = dbRef(database, "Android Category/" + currentTimeMillis);
        const data = {
            id: "" + currentTimeMillis,
            timestamp: currentTimeMillis,
            category: kategoriValue,
        };

        await set(dataRef, data);

        showMessage("Data berhasil disimpan ke Realtime Database.");

        // Setelah data disimpan, perbarui opsi kategori
        updateKategoriOptions();

    } catch (error) {
        showMessage("Terjadi kesalahan: " + error.message);
    }
});

// Fungsi untuk memperbarui opsi kategori
function updateKategoriOptions() {
    // Kosongkan semua opsi saat ini
    kategoriSelect.innerHTML = '<option value="" id="pilih_kategori">Pilih Kategori</option>';

    // Ambil data kategori dari database
    const kategoriRef = dbRef(database, "Android Category");
    get(kategoriRef).then((snapshot) => {
        if (snapshot.exists()) {
            const categories = snapshot.val();
            // Tambahkan setiap kategori ke dalam opsi
            Object.values(categories).forEach((category) => {
                const option = document.createElement("option");
                option.value = category.category;
                option.text = category.category;
                kategoriSelect.appendChild(option);
            });
        }
    });
}


// Event listener untuk tombol hapus
const deleteButton = document.getElementById("delleteButton_1");
deleteButton.addEventListener("click", async () => {
    const kategoriToDelete = document.getElementById("kategori_buku1").value.trim();

    // Check if kategoriToDelete is empty
    if (!kategoriToDelete) {
        showMessage("Harap pilih kategori yang akan dihapus.");
        return; // Stop execution if kategoriToDelete is empty
    }

    try {
        // Ambil data kategori dari database
        const kategoriRef = dbRef(database, "Android Category");
        const snapshot = await get(kategoriRef);

        if (snapshot.exists()) {
            const categories = snapshot.val();

            // Temukan ID kategori yang sesuai dengan nama kategori yang akan dihapus
            const categoryIdToDelete = Object.keys(categories).find(
                (key) => categories[key].category === kategoriToDelete
            );

            // Hapus kategori dari database berdasarkan ID
            if (categoryIdToDelete) {
                const categoryRefToDelete = dbRef(database, "Android Category/" + categoryIdToDelete);
                await remove(categoryRefToDelete);

                showMessage("Kategori berhasil dihapus dari Realtime Database.");
                // Setelah menghapus, perbarui opsi kategori
                updateKategoriOptions();
            } else {
                showMessage("Kategori tidak ditemukan dalam database.");
            }
        } else {
            showMessage("Tidak ada data kategori di database.");
        }
    } catch (error) {
        showMessage("Terjadi kesalahan saat menghapus: " + error.message);
    }
});
