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

    var database = firebase.database();
    
    const permissionsRef = firebase.database().ref('Permissions');

// Mendengarkan perubahan data (realtime)
// ...

// Mendengarkan perubahan data (realtime)
permissionsRef.on('value', (snapshot) => {
    // Mendapatkan data dari snapshot
    const permissionsData = snapshot.val();

    // Menemukan elemen tbody
    const tbody = document.getElementById("data");

    // Mengosongkan tbody sebelum menambahkan data baru
    tbody.innerHTML = "";

    // Iterasi melalui data Permissions
    for (const key in permissionsData) {
        const innerObj = permissionsData[key];

        for (const innerKey in innerObj) {
            const rowData = innerObj[innerKey];

            // Mendapatkan UID dari key (misalnya, 'JZTnXzkWLzZnJQ3e242jNKWKspj1')
            const uid = key;

            // Mengambil data pengguna dari tabel "Users" berdasarkan UID
            const userRef = firebase.database().ref('Users/' + uid);
            userRef.once('value').then((userSnapshot) => {
                const userData = userSnapshot.val();

                // Mengambil data buku dari tabel "Books" berdasarkan bookId
                const bookRef = firebase.database().ref('Books/' + rowData.bookId);
                bookRef.once('value').then((bookSnapshot) => {
                    const bookData = bookSnapshot.val();

                    // Menampilkan data hanya jika permission adalah false
                    if (rowData.permission === false) {
                        // Membuat elemen tr
                        const row = document.createElement("tr");

                        // Kolom pertama
                        const col1 = document.createElement("td");

                        // Menentukan isi kolom pertama
                        col1.innerHTML = userData && userData.nim
                            ? `<i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${userData.nim}</strong>`
                            : `<i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${uid}</strong>`;

                        // Menambahkan kolom pertama ke dalam baris
                        row.appendChild(col1);

                        // Kolom kedua
                        const col2 = document.createElement("td");
                        col2.innerHTML = userData && userData.name
                            ? userData.name
                            : 'Nama Tidak Tersedia';
                        row.appendChild(col2);

                        // Kolom ketiga
                        const col3 = document.createElement("td");
                        col3.style.textAlign = "center";
                        col3.innerHTML = bookData && bookData.title
                            ? bookData.title
                            : 'Judul Buku Tidak Tersedia';
                        row.appendChild(col3);

                        // Kolom keempat
                        const col4 = document.createElement("td");
                        col4.style.textAlign = "center";
                        col4.innerHTML = `
                          <button type="button" class="btn" style="background-color: #1565C0; font-size: 10px; color: #fff;" onclick="terimaPermintaan('${uid}')">Terima</button>
                          <button type="button" class="btn" style="background-color: #001F3F; font-size: 10px; color: #fff;" onclick="tolakPermintaan('${uid}')">Tolak</button>`;
                        row.appendChild(col4);

                        // Menambahkan baris ke tbody
                        tbody.appendChild(row);
                    }
                }).catch((error) => {
                    console.error("Error getting book data:", error);
                });
            }).catch((error) => {
                console.error("Error getting user data:", error);
            });
        }
    }
}, (error) => {
    console.error("Error getting permissions:", error);
});





                  

    