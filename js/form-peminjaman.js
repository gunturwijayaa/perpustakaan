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
  
    // Get the currently authenticated user
    // const user = firebase.auth().currentUser;

    // Get a reference to the database
    var database = firebase.database();
    
    // Get a reference to the 'Books' node
    var permissions = database.ref('Permissions');
    
    // Add an event listener to listen for changes on the 'Books' node
    
    
   // Mendengarkan perubahan pada referensi 'Books'
   permissions.on('value', function(snapshot) {
    try {
        // Mendapatkan data snapshot
        var permission = snapshot.val();
  
        // Mendapatkan elemen tbody dari tabel
        var tableBody = document.getElementById('data');
        tableBody.innerHTML = ''; // Menghapus data yang sudah ada di tabel
  
        // Melooping setiap buku dan menambahkan baris baru ke tabel
        Object.keys(permission).forEach(function(key) {
            var book = permission[key];
  
            // Membuat elemen baru untuk setiap buku
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
                <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                        <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                        <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                    </div>
                </div>
            `;
            newRow.appendChild(actionsCell);
  
            // Menambahkan baris baru ke tabel
            tableBody.appendChild(newRow);
        });
  
    } catch (error) {
        console.error("Error:", error);
    }
  });


  