document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");
  const form = document.querySelector(".login-container");

  // Username & password contoh
  if (user === "admin" && pass === "123") {
    errorMsg.textContent = "";
    window.location.href = "index.html"; // masuk ke halaman planet
  } else {
    errorMsg.textContent = "❌ Username atau Password salah!";
    form.classList.add("shake");
    setTimeout(() => form.classList.remove("shake"), 300);
  }
});