
const firebaseConfig = {
  apiKey: "AIzaSyCvrU2mXPzdc_MvmffICTcFKGTSsCuv11I",
  authDomain: "authfirebase-552c7.firebaseapp.com",
  databaseURL: "https://authfirebase-552c7-default-rtdb.firebaseio.com",
  projectId: "authfirebase-552c7",
  storageBucket: "authfirebase-552c7.appspot.com",
  messagingSenderId: "339816014771",
  appId: "1:339816014771:web:aa0e406a41c651018d21c6"
  };

  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database
  var database = firebase.database();
  
  // Get a reference to the 'Books' node
  var booksRef = database.ref('Books');
  var AnggotaRef = database.ref('Akun-Anggota');
  
  // Add an event listener to listen for changes on the 'Books' node
  booksRef.on('value', function(snapshot) {
    try {
      // Get the data snapshot
      var books = snapshot.val();
    
      // Calculate the total number of books
      var totalBooks = Object.keys(books).length;
    
      // Display the total number of books in the element with id 'jumlahBuku'
      document.getElementById('jumlahBuku').innerHTML = totalBooks;
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

  AnggotaRef.on('value', function(snapshot) {
    try {
      // Get the data snapshot
      var anggota = snapshot.val();
    
      // Calculate the total number of books
      var totalAnggota = Object.keys(anggota).length;
    
      // Display the total number of books in the element with id 'jumlahBuku'
      document.getElementById('jumlahAnggota').innerHTML = totalAnggota;
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

 // Mendengarkan perubahan pada referensi 'Books'
 booksRef.on('value', function(snapshot) {
  try {
      // Mendapatkan data snapshot
      var books = snapshot.val();

      // Menghitung total buku
      var totalBooks = Object.keys(books).length;

      // Menampilkan total buku
      document.getElementById('jumlahBuku').innerHTML = totalBooks;

      // Mendapatkan elemen tbody dari tabel
      var tableBody = document.getElementById('data');
      tableBody.innerHTML = ''; // Menghapus data yang sudah ada di tabel

      // Melooping setiap buku dan menambahkan baris baru ke tabel
      Object.keys(books).forEach(function(key) {
          var book = books[key];
          var newRow = tableBody.insertRow(tableBody.rows.length);

          // Mengisi sel-sel dengan data spesifik
          newRow.insertCell(0).innerHTML = book.title || '';
          newRow.insertCell(1).innerHTML = book.categoryId || '';
          newRow.insertCell(2).innerHTML = book.downloadsCount || '';
          newRow.insertCell(3).innerHTML = book.viewsCount || '';

          // Menambahkan tombol pada sel terakhir
          var actionsCell = newRow.insertCell(4);
          actionsCell.innerHTML = `
              <input type="submit" value="Edit" class="btn btn-warning editData" data-id="${key}" data-bs-toggle="modal" data-bs-target="#modalUpdate">
              <input type="submit" class="btn btn-danger hapusData" data-id="${key}" value="Hapus">
          `;
      });
      
      // Menambahkan event listener untuk tombol edit dan hapus
      tableBody.addEventListener('click', function(e) {
        const target = e.target;
    
        if (target.classList.contains('editData')) {
            // Tombol "Edit" diklik
            const row = target.closest('tr');
            const cells = row.cells;
    
            // Ubah sel menjadi input untuk pengeditan
            for (let i = 0; i < cells.length - 1; i++) {
                const cell = cells[i];
                const oldValue = cell.textContent;
                cell.innerHTML = `<input type="text" value="${oldValue}" style="width: 100px" />`;
            }
    
            // Ganti tombol "Edit" dengan "Simpan"
            const editButton = target;
            editButton.value = "Simpan";
            editButton.classList.remove('editData');
            editButton.classList.add('saveData');
        } else if (target.classList.contains('saveData')) {
            // Tombol "Simpan" diklik
            const row = target.closest('tr');
            const cells = row.cells;
    
            // Ambil nilai dari input yang diedit
            const updatedData = {
                title: cells[0].querySelector('input').value,
                categoryId: cells[1].querySelector('input').value,
                downloadsCount: cells[2].querySelector('input').value,
                viewsCount: cells[3].querySelector('input').value,
            };
    
            const bookId = target.getAttribute('data-id');
            const bookRef = booksRef.child(bookId);
    

              bookRef.update(updatedData)
                  .then(() => {
                      // Perbarui tampilan
                      // Anda dapat menambahkan logika untuk menampilkan pesan sukses atau memperbarui tabel jika diperlukan
                  })
                  .catch((error) => {
                      console.error("Error updating document: ", error);
                  });
          }
      });

  } catch (error) {
      console.error("Error: ", error);
  }
});


// Fungsi untuk menghapus buku berdasarkan ID
function hapusBuku(bookId) {
  // Konfirmasi dengan pengguna sebelum menghapus buku
  var konfirmasiHapus = confirm("Apakah Anda yakin ingin menghapus buku ini?");

  if (konfirmasiHapus) {
      // Menggunakan referensi ke node 'Books' dan menghapus buku spesifik
      booksRef.child(bookId).remove()
          .then(function() {
              console.log("Buku berhasil dihapus!");
              // Opsional: Anda dapat memperbarui antarmuka pengguna atau melakukan tindakan lain setelah penghapusan
          })
          .catch(function(error) {
              console.error("Error menghapus buku:", error.message);
          });
  }
}

// Menyematkan fungsi pada tombol 'Hapus'
document.getElementById('data').addEventListener('click', function(event) {
  if (event.target.classList.contains('hapusData')) {
      var bookId = event.target.getAttribute('data-id');
      hapusBuku(bookId);
  }
});

