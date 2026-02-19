// ─── Custom Cursor ───
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
function animCursor(){
  cursor.style.left = mx+'px'; cursor.style.top = my+'px';
  rx += (mx-rx)*.15; ry += (my-ry)*.15;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animCursor);
}
animCursor();
// Hide on touch devices
if('ontouchstart' in window){ cursor.style.display='none'; ring.style.display='none'; document.body.style.cursor='auto'; }

// ─── Constellation Canvas ───
const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');
let W, H, particles=[];

function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
resize();
window.addEventListener('resize', resize);

const GOLD = [201,168,76];
function Particle(){
  this.x=Math.random()*W; this.y=Math.random()*H;
  this.vx=(Math.random()-.5)*.35; this.vy=(Math.random()-.5)*.35;
  this.r=Math.random()*1.4+.5;
  this.alpha=Math.random()*.5+.2;
}
Particle.prototype.update=function(){
  this.x+=this.vx; this.y+=this.vy;
  if(this.x<0||this.x>W) this.vx*=-1;
  if(this.y<0||this.y>H) this.vy*=-1;
};
Particle.prototype.draw=function(){
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
  ctx.fillStyle=`rgba(${GOLD},${this.alpha})`;
  ctx.fill();
};

for(let i=0;i<90;i++) particles.push(new Particle());

function drawLines(){
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<130){
        const a=(.18*(1-d/130));
        ctx.strokeStyle=`rgba(${GOLD},${a})`;
        ctx.lineWidth=.7;
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function loop(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{ p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(loop);
}
loop();

// ─── Navbar shrink ───
const nav = document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('shrunk', window.scrollY>60);
});

// ─── Mobile Menu ───
const burger = document.getElementById('burger');
const mMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

function openMenu(){ burger.classList.add('open'); mMenu.classList.add('open'); overlay.classList.add('open'); }
function closeMenu(){ burger.classList.remove('open'); mMenu.classList.remove('open'); overlay.classList.remove('open'); }
burger.addEventListener('click',()=> mMenu.classList.contains('open') ? closeMenu() : openMenu());
overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mob-link').forEach(a=> a.addEventListener('click', closeMenu));

// ─── Typewriter roles ───
const roles = [
  'Livestreamer & Content Creator',
  'Web Developer',
  'Data Scientist',
  'ML & AI Enthusiast',
  'Game Developer',
  'UI/UX Designer',
];
let ri=0, ci=0, deleting=false;
const roleEl = document.getElementById('roleText');

function typeRole(){
  const cur = roles[ri];
  if(!deleting){
    roleEl.textContent = cur.slice(0,++ci);
    if(ci===cur.length){ deleting=true; setTimeout(typeRole,1800); return; }
    setTimeout(typeRole, 70);
  } else {
    roleEl.textContent = cur.slice(0,--ci);
    if(ci===0){ deleting=false; ri=(ri+1)%roles.length; setTimeout(typeRole,400); return; }
    setTimeout(typeRole,35);
  }
}
typeRole();

// ─── Scroll reveal ───
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.1});
reveals.forEach(el=> obs.observe(el));

// ─── Project tab filter (stub) ───
document.querySelectorAll('.proj-tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.proj-tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});
