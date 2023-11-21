// Memperoleh elemen-elemen HTML yang dibutuhkan
const avatarDiv = document.getElementById("avatarDiv");
const dropdownMenu = document.getElementById("dropdownMenu");

// Menambahkan event listener untuk klik pada avatar
avatarDiv.addEventListener("click", function () {
  // Memeriksa apakah dropdown saat ini tersembunyi atau ditampilkan
  if (dropdownMenu.style.display === "none") {
    // Jika tersembunyi, tampilkan dropdown
    dropdownMenu.style.display = "block";
  } else {
    // Jika ditampilkan, sembunyikan dropdown
    dropdownMenu.style.display = "none";
  }
});

// Menambahkan event listener untuk mengatasi klik di luar dropdown
document.addEventListener("click", function (event) {
  if (event.target !== avatarDiv) {
    // Jika yang diklik bukan avatar, sembunyikan dropdown
    dropdownMenu.style.display = "none";
  }
});

  
async function getData() {
  const buku = await db.collection("Data-Buku").get();
  const jumlahBuku = buku.docs.length; // Menghitung jumlah buku
  const anggota = await db.collection("Anggota").get();
  const jumlahAnggota = anggota.docs.length; // Menghitung jumlah anggota

  // Memasukkan jumlah anggota ke dalam elemen dengan kelas "numbers"
  document.querySelector('.numbers').textContent = jumlahAnggota;
  // Memasukkan jumlah buku ke dalam elemen dengan kelas "numbers"
  document.querySelector('.numbers-buku').textContent = jumlahBuku;

}