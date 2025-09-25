/* STARFIELD (canvas) */
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

const layers = [
  {count: 220, size: [0.3,1], speed: 0.15, stars: []},
  {count: 80, size: [1,2.2], speed: 0.4, stars: []},
  {count: 30, size: [2.4,3.5], speed: 0.9, stars: []}
];

function rnd(min,max){ return Math.random()*(max-min)+min; }
function initStars(){
  layers.forEach(layer=>{
    layer.stars = [];
    for(let i=0;i<layer.count;i++){
      layer.stars.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: rnd(layer.size[0], layer.size[1]),
        speed: rnd(layer.speed*0.5, layer.speed*1.5),
        alpha: rnd(0.4,1)
      });
    }
  });
}
initStars();

function draw(){
  ctx.clearRect(0,0,W,H);
  // subtle nebula gradient overlay
  const g = ctx.createLinearGradient(0,0,W,H);
  g.addColorStop(0,'rgba(2,6,23,0.0)');
  g.addColorStop(1,'rgba(4,12,40,0.25)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,W,H);

  layers.forEach(layer=>{
    ctx.beginPath();
    layer.stars.forEach(s=>{
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.moveTo(s.x, s.y);
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    });
    ctx.fill();
  });

  update();
  requestAnimationFrame(draw);
}

function update(){
  layers.forEach(layer=>{
    layer.stars.forEach(s=>{
      s.y += s.speed;
      if(s.y > H + 10){
        s.y = -10;
        s.x = Math.random()*W;
      }
      // twinkle
      s.alpha += (Math.random()-0.5)*0.05;
      s.alpha = Math.max(0.2, Math.min(1, s.alpha));
    });
  });
}

draw();
window.addEventListener('resize', ()=>{
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  initStars();
});

/* SMOOTH NAVIGATION */
document.querySelectorAll('.planet-nav a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth', block:'center'});
    // highlight on click
    el.classList.add('visible');
    setTimeout(()=>el.classList.remove('visible'), 1200);
  });
});

/* SHOW MORE BUTTONS */
document.querySelectorAll('.more-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const card = btn.closest('.planet-card');
    const more = card.querySelector('.more-details');
    const opened = more.style.display === 'block';
    if(opened){
      more.style.display = 'none';
      btn.textContent = 'Lihat lebih';
    } else {
      more.style.display = 'block';
      btn.textContent = 'Tutup';
      // scroll card into center (mobile-friendly)
      card.scrollIntoView({behavior:'smooth', block:'center'});
    }
  });
});

/* INTERSECTION OBSERVER for fade-in */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
    else e.target.classList.remove('visible');
  });
},{threshold:0.15});

document.querySelectorAll('.planet-card').forEach(card=>observer.observe(card));