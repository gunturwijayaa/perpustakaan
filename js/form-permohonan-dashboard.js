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
  
  // Add an event listener to listen for changes on the 'anggota' node
  

 // Mendengarkan perubahan pada referensi 'anggota'
 anggotaRef.on('value', function(snapshot) {
  try {
      // Mendapatkan data snapshot
      var anggota = snapshot.val();

      // Mendapatkan elemen tbody dari tabel
      var tableBody = document.getElementById('data');
      tableBody.innerHTML = ''; // Menghapus data yang sudah ada di tabel

      // Melooping setiap buku dan menambahkan baris baru ke tabel
      Object.keys(anggota).forEach(function(key) {
          var user = anggota[key];

          if (user.userType === "user") { 
          // Membuat elemen baru untuk setiap buku
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

          // ...

          var permohonanCall = document.createElement('td');
          permohonanCall.setAttribute('Permission', user.permission);

         
          
          
          // Check if permission is false
          if (user.permission === false) {
              var checkIcon = document.createElement('i');
              checkIcon.className = 'bx bxs-check-circle';
              checkIcon.style.fontSize = '30px';
              checkIcon.style.cursor = 'pointer';
              checkIcon.style.color = 'green';
              checkIcon.style.margin = '0 auto'; // Menambahkan properti margin untuk rata tengah
              permohonanCall.appendChild(checkIcon);
              
              var xCircleIcon = document.createElement('i');
              xCircleIcon.className = 'bx bxs-x-circle';
              xCircleIcon.style.fontSize = '30px';
              xCircleIcon.style.cursor = 'pointer';
              xCircleIcon.style.color = 'red';
              xCircleIcon.style.margin = '0 auto'; // Menambahkan properti margin untuk rata tengah
              permohonanCall.appendChild(xCircleIcon);
          } else if (user.permission === true) {
              // Check if permission is true
              var xCircleIcon = document.createElement('i');
              xCircleIcon.className = 'bx bxs-x-circle';
              xCircleIcon.style.fontSize = '30px';
              xCircleIcon.style.cursor = 'pointer';
              xCircleIcon.style.color = 'red';
              xCircleIcon.style.margin = '0 auto'; // Menambahkan properti margin untuk rata tengah
              permohonanCall.appendChild(xCircleIcon);
          } else {
              // Jika permission tidak true dan tidak false, Anda dapat memilih untuk melakukan sesuatu atau meninggalkannya kosong
          }
          
          // Menambahkan properti text-align untuk rata tengah
          permohonanCall.style.textAlign = 'center';
          
          // Menambahkan elemen ke dalam newRow
          newRow.appendChild(permohonanCall);
          

          // Menambahkan baris baru ke tabel
          tableBody.appendChild(newRow);
          }
      });

  } catch (error) {
      console.error("Error:", error);
  }
});


