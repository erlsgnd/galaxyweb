// Animasi bintang bergerak
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Responsive canvas saat resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Bintang
let stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    d: Math.random() * 1
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.shadowColor = "#62dfff"; // glow biru
  ctx.shadowBlur = 5;
  ctx.beginPath();
  for (let s of stars) {
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  updateStars();
}

function updateStars() {
  for (let s of stars) {
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
}

// Animasi berjalan
setInterval(drawStars, 50);

// Login logic
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "123") {
    document.querySelector(".login-container").innerHTML = "<h2>🚀 Warp Jump...</h2>";

    // Animasi bintang lebih cepat saat login sukses (opsional)
    for (let s of stars) {
      s.d *= 2; 
    }

if (username === "admin" && password === "123") {
  document.querySelector(".login-container").innerHTML = "<h2>🚀 Warp Jump...</h2>";

  // Bintang makin cepat
  for (let s of stars) {
    s.d *= 5; 
  }

  // Efek putih fade in
  const warp = document.getElementById("warpEffect");
  setTimeout(() => {
    warp.classList.add("active");
  }, 500);

  // Redirect setelah animasi selesai
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
} else {
  alert("❌ Username atau Password salah!");
}

    setTimeout(() => {
      window.location.href = "index.html"; // pindah ke halaman planet
    }, 2000);
  } else {
    alert("❌ Username atau Password salah!");
  }
});