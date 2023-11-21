//fungsi logout
document.getElementById("logout-link").addEventListener("click", function (event) {
  event.preventDefault(); // Mencegah tautan default dari mengarahkan ke "#" (href="#")
  
  Swal.fire({
    title: 'Apakah Anda yakin ingin keluar?',
    text: "Anda akan keluar dari aplikasi ini.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Keluar!',
    cancelButtonText: 'Tidak, Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "http://127.0.0.1:5500/user/index.html?#";
    }
  });
});