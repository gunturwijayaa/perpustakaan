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
    
      const db = firebase.firestore();
      
    
      db.collection("Data-Buku").onSnapshot(snapshot => {
        snapshot.docChanges();
        getData();
    })
    
    
    async function getData() {
        const buku = await db.collection("Data-Buku").get();
        const jumlahBuku = buku.docs.length; // Menghitung jumlah buku
        const anggota = await db.collection("Anggota").get();
        const jumlahAnggota = anggota.docs.length; // Menghitung jumlah anggota
    
        // Memasukkan jumlah anggota ke dalam elemen dengan kelas "numbers"
        document.querySelector('.numbers').textContent = jumlahAnggota;
        // Memasukkan jumlah buku ke dalam elemen dengan kelas "numbers"
        document.querySelector('.numbers-buku').textContent = jumlahBuku;

        
    
        // Menghapus isi elemen dengan ID "data"
        document.getElementById('data').innerHTML = '';
    
        // Menampilkan data buku dalam tabel
        buku.docs.forEach((buku, i) => {
            console.log(buku.id);
            document.getElementById('data').innerHTML += `
                <tr>
                    <td>${buku.data().kode_buku}</td>
                    <td>${buku.data().judul_buku}</td>
                    <td>${buku.data().penerbit}</td>
                    <td>${buku.data().penulis}</td>
                    <td>${buku.data().kategori}</td>
    
                    <td>
                        <input type="submit" value="Edit" class="btn btn-warning editData" data-id="${buku.id}" data-bs-toggle="modal" data-bs-target="#modalUpdate">
                        <input type="submit" class="btn btn-danger hapusData" data-id="${buku.id}" value="Hapus">
                    </td>
                </tr>
            `;
            
        });
    
        
        // Menambahkan event listener untuk tombol "Hapus" dengan SweetAlert konfirmasi
        const hapusButtons = document.querySelectorAll('.hapusData');
        hapusButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                const id = event.target.getAttribute('data-id');
                showDeleteConfirmation(id); // Memanggil fungsi konfirmasi sebelum menghapus
            });
        });
    }
    
    // Fungsi untuk menampilkan SweetAlert konfirmasi sebelum menghapus
    function showDeleteConfirmation(id) {
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus?',
            text: 'Anda akan menghapus data buku?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id); // Jika konfirmasi di-ya-kan, panggil fungsi hapus data
            }
        });
    }
    
    // Fungsi untuk menghapus data berdasarkan ID
    function deleteData(id) {
        var docRef = db.collection("Data-Buku").doc(id);
    
        docRef.delete()
            .then(function () {
                console.log("Dokumen berhasil dihapus!");
                // Jika berhasil dihapus, Anda bisa memperbarui tampilan atau melakukan tindakan lain yang diperlukan.
            })
            .catch(function (error) {
                console.error("Gagal menghapus dokumen: ", error);
                // Handle kesalahan penghapusan jika diperlukan.
            });
    }
    
    // Tambahkan event listener ke tabel untuk menangani tombol "Edit" dan "Simpan"
    
    document.getElementById('data').addEventListener('click', function (e) {
        const target = e.target;
    
        if (target.classList.contains('editData')) {
            // Tombol "Edit" diklik
            const row = target.closest('tr');
            const cells = row.cells;
    
            // Ubah sel menjadi input untuk pengeditan
            for (let i = 1; i < cells.length - 1; i++) {
                const cell = cells[i];
                const oldValue = cell.textContent;
                cell.innerHTML = `<input type="text" value="${oldValue}" style="width: 100px" />`;
            }
    
            // Ganti tombol "Edit" dengan "Simpan"
            const buttonContainer = cells[cells.length - 1];
            const editButton = buttonContainer.querySelector('.editData');
            editButton.textContent = "Simpan";
            editButton.classList.remove('editData');
            editButton.classList.add('saveData');
        } else if (target.classList.contains('saveData')) {
            // Tombol "Simpan" diklik
            const row = target.closest('tr');
            const cells = row.cells;
    
            // Ambil nilai dari input yang diedit
            const updatedData = {

                judul_buku: cells[1].querySelector('input').value,
                penerbit: cells[2].querySelector('input').value,
                penulis: cells[3].querySelector('input').value,
                kategori: cells[4].querySelector('input').value
            };
    
            const bukuId = target.getAttribute('data-id');
            const bukuRef = db.collection("Data-Buku").doc(bukuId);
    
            bukuRef.update(updatedData)
                .then(() => {
                    // Perbarui tampilan
                    getData();
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        }
    });
        

    

    
    // Fungsi untuk melakukan pencarian data buku
    function cariData() {
        const input = document.querySelector('input[type="text"]');
        const filter = input.value.toLowerCase();
        const dataRows = document.querySelectorAll('#data tr'); // Semua baris data
    
        dataRows.forEach((row) => {
            const cells = row.getElementsByTagName('td');
            let found = false;
    
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                if (cell) {
                    const cellText = cell.textContent || cell.innerText;
                    if (cellText.toLowerCase().indexOf(filter) > -1) {
                        found = true;
                        break;
                    }
                }
            }
    
            if (found) {
                row.style.display = ''; // Menampilkan baris yang sesuai dengan pencarian
            } else {
                row.style.display = 'none'; // Menyembunyikan baris yang tidak sesuai
            }
        });
    }
    
    // Event listener untuk input saat mengubah nilai
    document.querySelector('input[type="text"]').addEventListener('input', cariData);
    

    