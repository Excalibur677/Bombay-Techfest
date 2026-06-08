'use strict';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const noMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const scrollObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); scrollObs.unobserve(e.target); } }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

function initGlitch() {
  const t = $('#hero-title');
  if (!t || noMotion()) return;
  function fire() {
    t.classList.add('glitching');
    setTimeout(() => t.classList.remove('glitching'), 280);
    setTimeout(fire, 3000 + Math.random() * 4000);
  }
  setTimeout(fire, 1500);
}

function initTyping() {
  const el = $('#hud-typing');
  if (!el || noMotion()) return;
  const lines = ['NEURAL_LINK: ESTABLISHING...', 'CANDIDATE_PROFILE: LOADING...', 'AUGMENTATION_PROTOCOL: READY', 'WELCOME, AGENT.'];
  let li = 0, ci = 0, del = false;
  function tick() {
    const line = lines[li];
    if (!del) {
      el.textContent = line.slice(0, ++ci);
      if (ci === line.length) { del = true; return setTimeout(tick, 2000); }
    } else {
      el.textContent = line.slice(0, --ci);
      if (ci === 0) { del = false; li = (li + 1) % lines.length; return setTimeout(tick, 400); }
    }
    setTimeout(tick, del ? 18 + Math.random() * 12 : 42 + Math.random() * 28);
  }
  setTimeout(tick, 800);
}

function initCountUp() {
  const els = $$('[data-count]');
  if (!els.length) return;
  const ease = t => 1 - Math.pow(1 - t, 3);
  function run(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const t0 = performance.now();
    (function tick(now) {
      const p = clamp((now - t0) / 2000, 0, 1);
      el.textContent = Math.round(ease(p) * target).toLocaleString('en-IN') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } }),
    { threshold: 0.5 }
  );
  els.forEach(el => obs.observe(el));
}

function initTilt() {
  if (isTouch() || noMotion()) return;
  $$('.card--tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      card.style.transform = `perspective(800px) rotateX(${clamp(-dy * 10, -10, 10)}deg) rotateY(${clamp(dx * 10, -10, 10)}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}


function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || noMotion()) return;
  const ctx = canvas.getContext('2d');
  const CYAN = '0,240,255';
  const COUNT = 55;
  const MAX_DIST = 160;
  let W, H, nodes;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeNode() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.4,
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: COUNT }, makeNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.5;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${CYAN},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // draw nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CYAN},0.8)`;
      ctx.fill();
    });
  }

  function update() {
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
  }

  let raf;
  function loop() { update(); draw(); raf = requestAnimationFrame(loop); }

  // pause when tab is hidden (perf)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else loop();
  });

  window.addEventListener('resize', () => { resize(); });

  init();
  loop();
}

document.addEventListener('DOMContentLoaded', () => {
  $$('[data-animate]').forEach(el => scrollObs.observe(el));
  initGlitch();
  initTyping();
  initCountUp();
  initTilt();
  initParticles();
});
