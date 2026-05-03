// ========================================
// 🎂 MANASA BIRTHDAY — SPECIAL EDITION 🎂
// ========================================

// ===== HEART LOADER =====
(function heartLoader() {
  const canvas = document.getElementById('heart-canvas');
  const ctx = canvas.getContext('2d');
  const percentEl = document.getElementById('heart-percent');
  const textEl = document.getElementById('heart-text');
  
  let W, H;
  function resize() {
    const size = Math.min(window.innerWidth * 0.7, 300);
    canvas.width = size * 2;
    canvas.height = size * 2;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    W = canvas.width;
    H = canvas.height;
  }
  resize();
  
  function heartX(t) { return 16 * Math.pow(Math.sin(t), 3); }
  function heartY(t) { return -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)); }
  
  const heartPoints = [];
  for (let t = 0; t < Math.PI * 2; t += 0.02) {
    heartPoints.push({ x: heartX(t), y: heartY(t) });
  }
  
  const particles = [];
  const maxParticles = 250;
  
  class Particle {
    constructor(x, y) {
      this.x = x; this.y = y;
      this.size = 1.2 + Math.random() * 2.5;
      this.life = 1;
      this.decay = 0.004 + Math.random() * 0.01;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.color = Math.random() > 0.5 ? 
        `rgba(255,${45 + Math.floor(Math.random()*60)},${100 + Math.floor(Math.random()*60)},` :
        `rgba(255,${180 + Math.floor(Math.random()*75)},${Math.floor(Math.random()*50)},`;
    }
    update() { this.life -= this.decay; this.x += this.vx * 0.3; this.y += this.vy * 0.3; this.size *= 0.998; }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
      ctx.fillStyle = this.color + Math.max(0, this.life) + ')';
      ctx.fill();
    }
  }
  
  let progress = 0;
  const loadingTexts = [
    "Loading something cool...", "Gathering efforts...", "Compiling creativity...",
    "Rendering vibes...", "Injecting drama...", "Adding sparkles...",
    "Wrapping it up...", "Almost there...", "Preparing magic...",
    "✨ Ready!"
  ];
  
  function animate() {
    ctx.clearRect(0, 0, W, H);
    
    progress += 0.5 + Math.random() * 0.7;
    if (progress > 100) progress = 100;
    
    const pct = Math.floor(progress);
    percentEl.textContent = pct + '%';
    textEl.textContent = loadingTexts[Math.min(Math.floor(pct / 11), loadingTexts.length - 1)];
    
    const cx = W / 2, cy = H / 2 - 10, scale = W / 48;
    const pointsToDraw = Math.floor((progress / 100) * heartPoints.length);
    const glowIntensity = 0.3 + (progress / 100) * 0.7;
    
    ctx.shadowColor = `rgba(255,45,117,${glowIntensity * 0.8})`;
    ctx.shadowBlur = 25 + (progress / 100) * 35;
    
    if (pointsToDraw > 1) {
      ctx.beginPath();
      ctx.moveTo(cx + heartPoints[0].x * scale, cy + heartPoints[0].y * scale);
      for (let i = 1; i < pointsToDraw; i++) {
        ctx.lineTo(cx + heartPoints[i].x * scale, cy + heartPoints[i].y * scale);
      }
      ctx.strokeStyle = `rgba(255,45,117,${glowIntensity})`;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      if (progress > 50) {
        const fillAlpha = ((progress - 50) / 50) * 0.4;
        ctx.fillStyle = `rgba(255,45,117,${fillAlpha})`;
        ctx.closePath();
        ctx.fill();
      }
    }
    
    if (pointsToDraw > 0 && pointsToDraw < heartPoints.length) {
      const ep = heartPoints[pointsToDraw - 1];
      for (let i = 0; i < 2; i++) {
        if (particles.length < maxParticles) {
          particles.push(new Particle(cx + ep.x * scale + (Math.random()-.5)*8, cy + ep.y * scale + (Math.random()-.5)*8));
        }
      }
    }
    
    if (progress > 60) {
      const ri = Math.floor(Math.random() * pointsToDraw);
      if (ri < heartPoints.length && particles.length < maxParticles) {
        particles.push(new Particle(
          cx + heartPoints[ri].x * scale * (0.3 + Math.random() * 0.5),
          cy + heartPoints[ri].y * scale * (0.3 + Math.random() * 0.5)
        ));
      }
    }
    
    ctx.shadowBlur = 0; ctx.shadowColor = 'transparent';
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(); particles[i].draw(ctx);
      if (particles[i].life <= 0) particles.splice(i, 1);
    }
    
    if (progress >= 100) {
      const ps = 1 + 0.1 * Math.sin(Date.now() * 0.005);
      ctx.save();
      ctx.translate(cx, cy); ctx.scale(ps, ps); ctx.translate(-cx, -cy);
      ctx.beginPath();
      ctx.moveTo(cx + heartPoints[0].x * scale, cy + heartPoints[0].y * scale);
      for (let i = 1; i < heartPoints.length; i++) ctx.lineTo(cx + heartPoints[i].x * scale, cy + heartPoints[i].y * scale);
      ctx.closePath();
      ctx.strokeStyle = `rgba(255,215,0,${0.3 + 0.2 * Math.sin(Date.now() * 0.003)})`;
      ctx.lineWidth = 2; ctx.shadowColor = 'rgba(255,215,0,0.5)'; ctx.shadowBlur = 25;
      ctx.stroke(); ctx.restore();
    }
    
    if (progress < 100) {
      requestAnimationFrame(animate);
    } else {
      let pulseCount = 0;
      function pulseFinish() {
        pulseCount++;
        ctx.clearRect(0, 0, W, H);
        const ps = 1 + 0.12 * Math.sin(pulseCount * 0.08);
        ctx.save();
        ctx.translate(cx, cy); ctx.scale(ps, ps); ctx.translate(-cx, -cy);
        ctx.shadowColor = 'rgba(255,45,117,0.8)'; ctx.shadowBlur = 40;
        ctx.beginPath();
        ctx.moveTo(cx + heartPoints[0].x * scale, cy + heartPoints[0].y * scale);
        for (let i = 1; i < heartPoints.length; i++) ctx.lineTo(cx + heartPoints[i].x * scale, cy + heartPoints[i].y * scale);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,45,117,0.5)'; ctx.fill();
        ctx.strokeStyle = 'rgba(255,107,157,0.9)'; ctx.lineWidth = 3; ctx.stroke();
        ctx.restore();
        
        for (let i = 0; i < 2; i++) {
          const ri = Math.floor(Math.random() * heartPoints.length);
          if (particles.length < maxParticles) {
            particles.push(new Particle(cx + heartPoints[ri].x * scale * Math.random(), cy + heartPoints[ri].y * scale * Math.random()));
          }
        }
        ctx.shadowBlur = 0; ctx.shadowColor = 'transparent';
        for (let i = particles.length - 1; i >= 0; i--) {
          particles[i].update(); particles[i].draw(ctx);
          if (particles[i].life <= 0) particles.splice(i, 1);
        }
        
        if (pulseCount < 50) {
          requestAnimationFrame(pulseFinish);
        } else {
          document.getElementById('heart-loader').classList.add('done');
          setTimeout(() => {
            showScreen('s-intro');
            startBgHearts();
            createIntroParticles();
          }, 400);
        }
      }
      requestAnimationFrame(pulseFinish);
    }
  }
  
  setTimeout(animate, 400);
})();


// ===== BACKGROUND FLOATING HEARTS =====
function startBgHearts() {
  const canvas = document.getElementById('bg-hearts');
  const ctx = canvas.getContext('2d');
  let W, H;
  
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  
  const hearts = [];
  const colors = ['rgba(255,45,117,', 'rgba(255,107,157,', 'rgba(191,90,242,', 'rgba(255,215,0,', 'rgba(255,143,175,'];
  
  function spawnHeart() {
    hearts.push({
      x: Math.random() * W, y: H + 20,
      size: 6 + Math.random() * 14,
      speed: 0.25 + Math.random() * 0.6,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.008 + Math.random() * 0.015,
      wobbleAmp: 15 + Math.random() * 30,
      opacity: 0.08 + Math.random() * 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2
    });
  }
  
  function drawHeart(ctx, x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.3);
    ctx.bezierCurveTo(-size * 0.5, -size, -size, -size * 0.4, 0, size * 0.4);
    ctx.moveTo(0, -size * 0.3);
    ctx.bezierCurveTo(size * 0.5, -size, size, -size * 0.4, 0, size * 0.4);
    ctx.fill();
    ctx.restore();
  }
  
  function animate() {
    ctx.clearRect(0, 0, W, H);
    if (Math.random() < 0.025) spawnHeart();
    
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.y -= h.speed;
      h.wobble += h.wobbleSpeed;
      h.rotation += 0.002;
      ctx.fillStyle = h.color + h.opacity + ')';
      drawHeart(ctx, h.x + Math.sin(h.wobble) * h.wobbleAmp, h.y, h.size, h.rotation);
      if (h.y < -50) hearts.splice(i, 1);
    }
    requestAnimationFrame(animate);
  }
  animate();
}


// ===== INTRO PARTICLES =====
function createIntroParticles() {
  const container = document.getElementById('intro-particles');
  if (!container) return;
  const emojis = ['💖','💕','💗','💝','✨','🌸','💜','🌹','💫','❤️','💘','💎','👑','🧸'];
  
  function spawn() {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    p.style.animationDelay = Math.random() * 2 + 's';
    p.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
    container.appendChild(p);
    setTimeout(() => p.remove(), 10000);
  }
  
  for (let i = 0; i < 12; i++) spawn();
  setInterval(spawn, 600);
}


// ===== SCREEN MANAGEMENT =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  const target = document.getElementById(id);
  if (!target) return;
  target.classList.remove('hidden');
  void target.offsetWidth;
  target.classList.add('active');
  // Scroll inner to top
  const inner = target.querySelector('.screen-inner');
  if (inner) inner.scrollTop = 0;
}


// ===== CONFETTI =====
function popConfetti(count) {
  count = count || 35;
  const colors = ['#ff2d75','#ff6b9d','#bf5af2','#ffd700','#ff8fab','#e91e63','#ff003c','#ffb6c1'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.top = '-10px';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.setProperty('--dur', (2 + Math.random() * 2.5) + 's');
    c.style.animationDelay = Math.random() * 0.6 + 's';
    c.style.width = (5 + Math.random() * 7) + 'px';
    c.style.height = (7 + Math.random() * 9) + 'px';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}


// ===== NAVIGATION =====
function goToStory() {
  popConfetti(35);
  showScreen('s-story');
  setTimeout(() => {
    const cards = document.querySelectorAll('.story-card');
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 350);
    });
  }, 250);
}

function goToTraits() {
  popConfetti(30);
  showScreen('s-traits');
  setTimeout(() => {
    const cards = document.querySelectorAll('.trait-card');
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('visible');
        const fill = card.querySelector('.trait-fill');
        if (fill) setTimeout(() => { fill.style.width = fill.dataset.width + '%'; }, 150);
      }, i * 180);
    });
  }, 250);
}

function goToWish() {
  popConfetti(50);
  showScreen('s-wish');
  startFireworks();
  
  setTimeout(() => { document.getElementById('w-happy').classList.add('show'); popConfetti(15); }, 400);
  setTimeout(() => { document.getElementById('w-birthday').classList.add('show'); popConfetti(20); }, 1000);
  setTimeout(() => { document.getElementById('w-name').classList.add('show'); popConfetti(35); }, 1700);
  setTimeout(() => { document.getElementById('w-age').classList.add('show'); }, 2400);
  setTimeout(() => { document.getElementById('wish-msg').classList.add('show'); }, 3000);
  setTimeout(() => {
    document.getElementById('wish-footer').classList.add('show');
    document.getElementById('btn-replay').classList.add('show');
  }, 4000);
}

function replay() {
  document.querySelectorAll('.show, .visible').forEach(el => el.classList.remove('show', 'visible'));
  document.querySelectorAll('.trait-fill').forEach(f => { f.style.width = '0'; });
  showScreen('s-intro');
  popConfetti(25);
}


// ===== FIREWORKS =====
function startFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  
  const fireworks = [], sparks = [];
  
  function launchFirework() {
    fireworks.push({
      x: Math.random() * W, y: H,
      targetY: H * 0.15 + Math.random() * H * 0.35,
      speed: 3.5 + Math.random() * 2.5,
      color: `hsl(${Math.random() * 60 + 320}, 100%, 65%)`,
      trail: []
    });
  }
  
  function explode(x, y, color) {
    const count = 35 + Math.floor(Math.random() * 25);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 1 + Math.random() * 3.5;
      sparks.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 1, decay: 0.012 + Math.random() * 0.02, color, size: 1 + Math.random() * 1.5
      });
    }
  }
  
  let fc = 0;
  function animate() {
    ctx.fillStyle = 'rgba(10,0,16,0.18)';
    ctx.fillRect(0, 0, W, H);
    fc++;
    
    if (fc % 35 === 0 || (fc < 50 && fc % 12 === 0)) launchFirework();
    
    for (let i = fireworks.length - 1; i >= 0; i--) {
      const f = fireworks[i];
      f.y -= f.speed;
      f.trail.push({ x: f.x, y: f.y });
      if (f.trail.length > 6) f.trail.shift();
      for (let j = 0; j < f.trail.length; j++) {
        ctx.beginPath();
        ctx.arc(f.trail[j].x, f.trail[j].y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${j / f.trail.length * 0.4})`;
        ctx.fill();
      }
      if (f.y <= f.targetY) { explode(f.x, f.y, f.color); fireworks.splice(i, 1); }
    }
    
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx; s.y += s.vy; s.vy += 0.04; s.life -= s.decay; s.vx *= 0.99; s.vy *= 0.99;
      ctx.beginPath();
      ctx.arc(s.x, s.y, Math.max(0, s.size * s.life), 0, Math.PI * 2);
      ctx.fillStyle = s.color.replace('65%)', Math.max(0, s.life * 65) + '%)');
      ctx.shadowColor = s.color; ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0;
      if (s.life <= 0) sparks.splice(i, 1);
    }
    requestAnimationFrame(animate);
  }
  animate();
}


// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
