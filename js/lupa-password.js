function buttonLupaPassword() {
  var email = document.getElementById('email').value;
  
  if (validateEmail(email)) {
      var otp = generateOTP(); // Fungsi untuk menghasilkan kode OTP
      alert('Kode OTP Anda: ' + otp);
      
      // Navigasi ke halaman "form-kode-otp.html" atau langkah berikutnya
      window.location.href = "form-kode-otp.html";
  } else {
      alert('Email tidak valid. Harap masukkan alamat email yang valid.');
  }
}

function validateEmail(email) {
  // Implementasi validasi email yang sesuai kebutuhan Anda
  // Ini hanya contoh sederhana, Anda mungkin ingin menggunakan validasi yang lebih kuat
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function generateOTP() {
  // Fungsi untuk menghasilkan kode OTP
  // Implementasi kode OTP sesuai kebutuhan Anda
  // Ini hanya contoh sederhana
  return Math.floor(1000 + Math.random() * 9000).toString();
}
