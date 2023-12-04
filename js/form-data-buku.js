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

  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database
  var database = firebase.database();
  
  // Get a reference to the 'Books' node 

  var booksRef = database.ref('Books');
 
  
  // Add an event listener to listen for changes on the 'Books' node
  

 // Mendengarkan perubahan pada referensi 'Books'
 booksRef.on('value', function(snapshot) {
  try {
      // Mendapatkan data snapshot
      var books = snapshot.val();

      // Mendapatkan elemen tbody dari tabel
      var tableBody = document.getElementById('data');
      tableBody.innerHTML = ''; // Menghapus data yang sudah ada di tabel

      // Melooping setiap buku dan menambahkan baris baru ke tabel
      Object.keys(books).forEach(function(key) {
          var book = books[key];

          // Membuat elemen baru untuk setiap buku
          var newRow = document.createElement('tr');

          // Mengisi sel-sel dengan data spesifik
          var titleCell = document.createElement('td');
          titleCell.innerHTML = `<i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${book.title || ''}</strong>`;
          newRow.appendChild(titleCell);

          var categoryCell = document.createElement('td');
          var categoryId = book.categoryId;
          var androidCategoryRef = database.ref('Android Category').child(categoryId);
          androidCategoryRef.on('value', function(androidSnapshot) {
            var androidCategory = androidSnapshot.val();
            categoryCell.innerHTML = androidCategory ? androidCategory.category || '' : '';
            });

            newRow.appendChild(categoryCell);

          var downloadsCell = document.createElement('td');
          downloadsCell.style.textAlign = 'center';
          downloadsCell.innerHTML = book.downloadsCount || '';
          newRow.appendChild(downloadsCell);

          var descriptionCell = document.createElement('td');
          descriptionCell.innerHTML = book.description || '';
          newRow.appendChild(descriptionCell);

          var actionsCell = document.createElement('td');
          actionsCell.innerHTML = `
          <button type="button" class="btn" style="background-color: #1565C0; font-size: 10px; color: #fff;" id="editBuku" data-key="${key}">Edit</button>
          <button type="button" class="btn" style="background-color: #001F3F;  font-size: 10px; color: #fff;" id="hapusBuku" data-key="${key}">Hapus</button>
      `;
          newRow.appendChild(actionsCell);

          // Menambahkan baris baru ke tabel
          tableBody.appendChild(newRow);
      });
      
      var tombolEditList = document.querySelectorAll('#editBuku');
      tombolEditList.forEach(function (tombolEdit) {
          tombolEdit.addEventListener('click', function () {
              // Dapatkan nilai key dari atribut data-key
              var key = this.getAttribute('data-key');

              // Panggil fungsi editBuku
              editBuku(key);
          });
      });

      // Tambahkan event listener untuk tombol hapus di setiap baris
      var tombolHapusList = document.querySelectorAll('#hapusBuku');
      tombolHapusList.forEach(function (tombolHapus) {
          tombolHapus.addEventListener('click', function () {
              // Dapatkan nilai key dari atribut data-key
              var key = this.getAttribute('data-key');

              // Panggil fungsi hapusBuku
              hapusBuku(key, this);
          });
      });


  } catch (error) {
      console.error("Error:", error);
  }
});

 // Fungsi hapusBuku
 function hapusBuku(key, button) {
    var confirmation = confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (confirmation) {
        // Hapus data dari database
        booksRef.child(key).remove();

        // Hapus baris dari tabel
        var row = button.closest('tr');
        row.parentNode.removeChild(row);
    }
}

// Fungsi editBuku
function editBuku(key) {
  // Dapatkan data pengguna berdasarkan kunci
  var book = booksRef.child(key);

  // Munculkan dropdown untuk memilih kolom yang akan diubah
  var option = prompt("Pilih kolom yang ingin diubah:\n1. Judul buku\n2. Deskripsi");

  if (option !== null) {
      // Panggil fungsi updateBuku untuk memperbarui data berdasarkan pilihan
      switch (option) {
          case '1':
              var newTitle = prompt("Masukkan Judul Buku baru:", book.title);
              if (newTitle !== null) {
                  updateBuku(key, { title: newTitle });
              }
              break;
          case '2':
              var newDesk = prompt("Masukkan Deskripsi baru:", book.description);
              if (newDesk !== null) {
                  updateBuku(key, { description: newDesk });
              }
              break;
          default:
              alert("Pilihan tidak valid.");
      }
  }
}

// Fungsi updateBuku untuk memperbarui data pengguna di database
function updateBuku(key, newData) {
  // Dapatkan data pengguna berdasarkan kunci
  var buku = booksRef.child(key);

  // Update data pengguna di database
  buku.update(newData);

  // Perbarui tampilan tabel jika diperlukan
  // ...

  alert("Data pengguna berhasil diperbarui!");
}


var searchInput = document.getElementById('searchInput');

// Menambahkan event listener untuk event input pada elemen pencarian
searchInput.addEventListener('input', function () {
  searchBooks();
});

// Fungsi pencarian
function searchBooks() {
  // Mendapatkan nilai input pencarian
  var filter = searchInput.value.toUpperCase();

  // Mendapatkan daftar buku dari referensi Firebase 'Books'
  var booksRef = database.ref('Books');

  booksRef.on('value', function (snapshot) {
    try {
      // Mendapatkan data snapshot
      var books = snapshot.val();

      // Mendapatkan elemen tbody dari tabel
      var tableBody = document.getElementById('data');
      tableBody.innerHTML = ''; // Menghapus data yang sudah ada di tabel

      // Melooping setiap buku dan menambahkan baris baru ke tabel
      Object.keys(books).forEach(function (key) {
        var book = books[key];

        // Mengecek apakah data buku sesuai dengan kriteria pencarian
        if (book.title.toUpperCase().includes(filter)) {
          var newRow = document.createElement('tr');

          // Mengisi sel-sel dengan data spesifik
          var titleCell = document.createElement('td');
          titleCell.innerHTML = `<i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${book.title || ''}</strong>`;
          newRow.appendChild(titleCell);

          var categoryCell = document.createElement('td');
          categoryCell.innerHTML = book.categoryId || '';
          newRow.appendChild(categoryCell);

          var downloadsCell = document.createElement('td');
          downloadsCell.style.textAlign = 'center';
          downloadsCell.innerHTML = book.downloadsCount || '';
          newRow.appendChild(downloadsCell);

          var descriptionCell = document.createElement('td');
          descriptionCell.innerHTML = book.description || '';
          newRow.appendChild(descriptionCell);

          var actionsCell = document.createElement('td');
          actionsCell.innerHTML = `
            <button type="button" class="btn" style="background-color: #1565C0; font-size: 10px; color: #fff;" id="editBuku" data-key="${key}">Edit</button>
            <button type="button" class="btn" style="background-color: #001F3F;  font-size: 10px; color: #fff;" id="hapusBuku" data-key="${key}">Hapus</button>
          `;
          newRow.appendChild(actionsCell);

          // Menambahkan baris baru ke tabel
          tableBody.appendChild(newRow);
        }
      });

      // Tambahkan event listener untuk tombol edit di setiap baris
      var tombolEditList = document.querySelectorAll('#editBuku');
      tombolEditList.forEach(function (tombolEdit) {
        tombolEdit.addEventListener('click', function () {
          // Dapatkan nilai key dari atribut data-key
          var key = this.getAttribute('data-key');

          // Panggil fungsi editBuku
          editBuku(key);
        });
      });

      // Tambahkan event listener untuk tombol hapus di setiap baris
      var tombolHapusList = document.querySelectorAll('#hapusBuku');
      tombolHapusList.forEach(function (tombolHapus) {
        tombolHapus.addEventListener('click', function () {
          // Dapatkan nilai key dari atribut data-key
          var key = this.getAttribute('data-key');

          // Panggil fungsi hapusBuku
          hapusBuku(key, this);
        });
      });

    } catch (error) {
      console.error("Error:", error);
    }
  });
}
