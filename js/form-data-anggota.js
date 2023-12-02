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
  
  // Get a reference to the 'anggota' node
  var anggotaRef = database.ref('Users');

  // Mendengarkan perubahan pada referensi 'anggota'
  anggotaRef.on('value', function (snapshot) {
      try {
          // Mendapatkan data snapshot
          var anggota = snapshot.val();
  
          // Mendapatkan elemen tbody dari tabel
          var tableBody = document.getElementById('data');
          tableBody.innerHTML = ''; // Menghapus data yang sudah ada di tabel
  
          // Melooping setiap anggota dan menambahkan baris baru ke tabel
          Object.keys(anggota).forEach(function (key) {
              var user = anggota[key];
  
              if (user.userType === "user") {
                  // Membuat elemen baru untuk setiap anggota
                  var newRow = document.createElement('tr');
  
                  var nimCall = document.createElement('td');
                  nimCall.innerHTML = user.nim || '';
                  newRow.appendChild(nimCall);
  
                  // Mengisi sel-sel dengan data spesifik
                  var anggotaCall = document.createElement('td');
                  anggotaCall.innerHTML = `<i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${user.name || ''}</strong>`;
                  newRow.appendChild(anggotaCall);
  
                  var emailCall = document.createElement('td');
                  emailCall.innerHTML = user.email || '';
                  newRow.appendChild(emailCall);
  
                  var actionsCell = document.createElement('td');
                  actionsCell.style.textAlign = 'center';
                  actionsCell.innerHTML = `
                      <button type="button" class="btn" style="background-color: #1565C0; font-size: 10px; color: #fff;" id="editUser" data-key="${key}">Edit</button>
                      <button type="button" class="btn" style="background-color: #001F3F;  font-size: 10px; color: #fff;" id="hapusUser" data-key="${key}">Hapus</button>
                  `;
                  newRow.appendChild(actionsCell);
  
                  // Menambahkan baris baru ke tabel
                  tableBody.appendChild(newRow);
              }
          });
  
          // Tambahkan event listener untuk tombol edit di setiap baris
          var tombolEditList = document.querySelectorAll('#editUser');
          tombolEditList.forEach(function (tombolEdit) {
              tombolEdit.addEventListener('click', function () {
                  // Dapatkan nilai key dari atribut data-key
                  var key = this.getAttribute('data-key');
  
                  // Panggil fungsi editUser
                  editUser(key);
              });
          });
  
          // Tambahkan event listener untuk tombol hapus di setiap baris
          var tombolHapusList = document.querySelectorAll('#hapusUser');
          tombolHapusList.forEach(function (tombolHapus) {
              tombolHapus.addEventListener('click', function () {
                  // Dapatkan nilai key dari atribut data-key
                  var key = this.getAttribute('data-key');
  
                  // Panggil fungsi hapusUser
                  hapusUser(key, this);
              });
          });
  
      } catch (error) {
          console.error("Error:", error);
      }
  });
  
  // Fungsi hapusUser
  function hapusUser(key, button) {
      var confirmation = confirm("Apakah Anda yakin ingin menghapus user ini?");
      if (confirmation) {
          // Hapus data dari database
          anggotaRef.child(key).remove();
  
          // Hapus baris dari tabel
          var row = button.closest('tr');
          row.parentNode.removeChild(row);
      }
  }
  
  // Fungsi editUser
  // Fungsi editUser
function editUser(key) {
    // Dapatkan data pengguna berdasarkan kunci
    var user = anggotaRef.child(key);

    // Munculkan dropdown untuk memilih kolom yang akan diubah
    var option = prompt("Pilih kolom yang ingin diubah:\n1. NIM\n2. Nama\n3. Email");

    if (option !== null) {
        // Panggil fungsi updateUser untuk memperbarui data berdasarkan pilihan
        switch (option) {
            case '1':
                var newNIM = prompt("Masukkan NIM baru:", user.nim);
                if (newNIM !== null) {
                    updateUser(key, { nim: newNIM });
                }
                break;
            case '2':
                var newName = prompt("Masukkan Nama baru:", user.name);
                if (newName !== null) {
                    updateUser(key, { name: newName });
                }
                break;
            case '3':
                var newEmail = prompt("Masukkan Email baru:", user.email);
                if (newEmail !== null) {
                    updateUser(key, { email: newEmail });
                }
                break;
            default:
                alert("Pilihan tidak valid.");
        }
    }
}

// Fungsi updateUser untuk memperbarui data pengguna di database
function updateUser(key, newData) {
    // Dapatkan data pengguna berdasarkan kunci
    var user = anggotaRef.child(key);

    // Update data pengguna di database
    user.update(newData);

    // Perbarui tampilan tabel jika diperlukan
    // ...

    alert("Data pengguna berhasil diperbarui!");
}




// Mendapatkan referensi ke elemen input pencarian
var searchInput = document.getElementById('searchInput');

// Menambahkan event listener untuk event input pada elemen pencarian
searchInput.addEventListener('input', function () {
  searchAccounts();
});

// Fungsi pencarian
function searchAccounts() {
  // Mendapatkan nilai input pencarian
  var filter = searchInput.value.toUpperCase();

  // Mendapatkan daftar anggota dari referensi Firebase 'Users'
  var anggotaRef = database.ref('Users');

  anggotaRef.on('value', function (snapshot) {
    try {
      // Mendapatkan data snapshot
      var anggota = snapshot.val();

      // Mendapatkan elemen tbody dari tabel
      var tableBody = document.getElementById('data');
      tableBody.innerHTML = ''; // Menghapus data yang sudah ada di tabel

      // Melooping setiap anggota dan menambahkan baris baru ke tabel
      Object.keys(anggota).forEach(function (key) {
        var user = anggota[key];

        // Mengecek apakah data pengguna sesuai dengan kriteria pencarian
        if (
          user.userType === 'user' &&
          (user.nim.toUpperCase().includes(filter) ||
            user.name.toUpperCase().includes(filter) ||
            user.email.toUpperCase().includes(filter))
        ) {
          // Membuat elemen baru untuk setiap anggota
          var newRow = document.createElement('tr');

          var nimCall = document.createElement('td');
          nimCall.innerHTML = user.nim || '';
          newRow.appendChild(nimCall);

          // Mengisi sel-sel dengan data spesifik
          var anggotaCall = document.createElement('td');
          anggotaCall.innerHTML = `<i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${user.name || ''}</strong>`;
          newRow.appendChild(anggotaCall);

          var emailCall = document.createElement('td');
          emailCall.innerHTML = user.email || '';
          newRow.appendChild(emailCall);

          var actionsCell = document.createElement('td');
          actionsCell.style.textAlign = 'center';
          actionsCell.innerHTML = `
              <button type="button" class="btn" style="background-color: #1565C0; font-size: 10px; color: #fff;" id="editUser" data-key="${key}">Edit</button>
              <button type="button" class="btn" style="background-color: #001F3F;  font-size: 10px; color: #fff;" id="hapusUser" data-key="${key}">Hapus</button>
          `;
          newRow.appendChild(actionsCell);

          // Menambahkan baris ke tabel
          tableBody.appendChild(newRow);
        }
      });

        // Tambahkan event listener untuk tombol edit di setiap baris
        var tombolEditList = document.querySelectorAll('#editUser');
        tombolEditList.forEach(function (tombolEdit) {
            tombolEdit.addEventListener('click', function () {
                // Dapatkan nilai key dari atribut data-key
                var key = this.getAttribute('data-key');

                // Panggil fungsi editUser
                editUser(key);
            });
        });

        // Tambahkan event listener untuk tombol hapus di setiap baris
        var tombolHapusList = document.querySelectorAll('#hapusUser');
        tombolHapusList.forEach(function (tombolHapus) {
            tombolHapus.addEventListener('click', function () {
                // Dapatkan nilai key dari atribut data-key
                var key = this.getAttribute('data-key');

                // Panggil fungsi hapusUser
                hapusUser(key, this);
            });
        });

    } catch (error) {
      console.error('Error:', error.message);
    }
  });
}

