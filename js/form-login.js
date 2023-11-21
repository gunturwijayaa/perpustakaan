
// fungsi untuk memberi keterangan di login jika email blm di masukan 
document.getElementById("formAuthentication").addEventListener("submit", function (event) {
    var emailInput = document.getElementById("email").value;
    var emailError = document.getElementById("email-error");
  
    if (emailInput === "") {
      emailError.innerText = "Email Harus Di isi";
      event.preventDefault(); // Prevent form submission
    } else {
      emailError.innerText = ""; // Clear the error message
    }
  });
  
  