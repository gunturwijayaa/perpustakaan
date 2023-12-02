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
  
  var database = firebase.database().ref();

// Mendapatkan referensi tabel HTML
function fetchDataAndDisplay() {
    var dataTable = document.getElementById('data');
    dataTable.innerHTML = ''; // Clear the table before adding new data

    database.child('Permissions').on('value', function(snapshot) {
        var promises = [];

        snapshot.forEach(function(childSnapshot) {
            var permissionData = childSnapshot.val();
            var uid = permissionData.uid;
            var bookId = permissionData.bookId;
            var permohonan = permissionData.permohonan;

            var userPromise = database.child('Users').child(uid).once('value');
            var bookPromise = database.child('Books').child(bookId).once('value');

            promises.push(
                Promise.all([userPromise, bookPromise])
                    .then(function([userSnapshot, bookSnapshot]) {
                        if (userSnapshot.exists() && bookSnapshot.exists()) {
                            var nim = userSnapshot.child('nim').val();
                            var nama = userSnapshot.child('name').val();
                            var judulBuku = bookSnapshot.child('title').val();

                            // Add a new row to the table
                            var newRow = '<tr>' +
                                '<td><i class="fab fa-angular fa-lg text-danger me-3"></i><strong>' + nim + '</strong></td>' +
                                '<td>' + nama + '</td>' +
                                '<td style="text-align: center;">' + judulBuku + '</td>' +
                                '<td style="text-align: center;" id="data-permission">' + permohonan + '</td>' +
                                '</tr>';
                            dataTable.innerHTML += newRow;
                        } else {
                            console.error('User or book data not found.');
                        }
                    })
                    .catch(function(error) {
                        console.error('Error fetching user or book data:', error);
                    })
            );
        });

        Promise.all(promises)
            .then(function() {
                console.log('All data processed.');
            })
            .catch(function(error) {
                console.error('Error processing data:', error);
            });
    });
}

// Call the function to fetch and display data
fetchDataAndDisplay();
