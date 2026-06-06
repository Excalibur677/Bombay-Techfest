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

document.addEventListener('DOMContentLoaded', () => {
  $$('[data-animate]').forEach(el => scrollObs.observe(el));
  initGlitch();
  initTyping();
  initCountUp();
  initTilt();
});
