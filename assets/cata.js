/* ============================================================
   AURO — Ficha de cata viva: radar de sabor + datos animados
   Sin dependencias. Anima al entrar en pantalla. Respeta reduced-motion.
   ➜ Edita los valores en FLAVORS y en los data-pct del HTML con tu analítica.
   ============================================================ */
(function () {
  const section = document.querySelector('#cata');
  if (!section) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const svg = section.querySelector('.radar');

  // Perfil organoléptico (0–10) — valores de ejemplo, editables
  const FLAVORS = [
    { label: 'Frutado', v: 8.5 },
    { label: 'Amargo', v: 6.5 },
    { label: 'Picante', v: 7 },
    { label: 'Verde', v: 7.5 },
    { label: 'Almendra', v: 5 },
    { label: 'Manzana', v: 6 },
  ];
  const MAX = 10, cx = 180, cy = 150, R = 105, N = FLAVORS.length;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / N;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const mk = (tag, attrs) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };

  if (svg) {
    svg.setAttribute('viewBox', '0 0 360 300');
    // anillos
    for (let ring = 1; ring <= 5; ring++) {
      const r = R * ring / 5, pts = [];
      for (let i = 0; i < N; i++) { const p = pt(i, r); pts.push(p[0].toFixed(1) + ',' + p[1].toFixed(1)); }
      svg.appendChild(mk('polygon', { points: pts.join(' '), fill: 'none', stroke: '#171713', 'stroke-opacity': ring === 5 ? 0.28 : 0.1, 'stroke-width': 1 }));
    }
    // radios + etiquetas
    for (let i = 0; i < N; i++) {
      const o = pt(i, R);
      svg.appendChild(mk('line', { x1: cx, y1: cy, x2: o[0], y2: o[1], stroke: '#171713', 'stroke-opacity': 0.1, 'stroke-width': 1 }));
      const lp = pt(i, R + 20);
      const t = mk('text', {
        x: lp[0].toFixed(1), y: lp[1].toFixed(1), 'font-size': 12.5,
        'font-family': 'Oswald, sans-serif', 'font-weight': 600, fill: '#6F6B2E',
        'text-anchor': Math.abs(lp[0] - cx) < 8 ? 'middle' : (lp[0] > cx ? 'start' : 'end'),
        'dominant-baseline': 'middle',
      });
      t.textContent = FLAVORS[i].label;
      svg.appendChild(t);
    }
    // polígono de datos (animado)
    const poly = mk('polygon', { fill: '#B9983A', 'fill-opacity': 0.22, stroke: '#B9983A', 'stroke-width': 2, 'stroke-linejoin': 'round' });
    svg.appendChild(poly);
    const dots = FLAVORS.map(() => { const c = mk('circle', { r: 3.5, fill: '#B9983A' }); svg.appendChild(c); return c; });
    svg._draw = (t) => {
      const pts = [];
      FLAVORS.forEach((f, i) => {
        const p = pt(i, (f.v / MAX) * R * t);
        pts.push(p[0].toFixed(1) + ',' + p[1].toFixed(1));
        dots[i].setAttribute('cx', p[0].toFixed(1)); dots[i].setAttribute('cy', p[1].toFixed(1));
      });
      poly.setAttribute('points', pts.join(' '));
    };
    svg._draw(0);
  }

  const fills = section.querySelectorAll('.stat__fill');
  let played = false;
  function play() {
    if (played) return; played = true;
    fills.forEach((f) => { f.style.width = (f.dataset.pct || 0) + '%'; });
    if (svg && svg._draw) {
      if (reduce) { svg._draw(1); return; }
      const dur = 950, t0 = performance.now();
      (function anim(now) {
        let t = Math.min(1, (now - t0) / dur);
        t = 1 - Math.pow(1 - t, 3);
        svg._draw(t);
        if (t < 1) requestAnimationFrame(anim);
      })(t0);
    }
  }

  if (reduce) { play(); }
  else if ('IntersectionObserver' in window) {
    new IntersectionObserver((es, ob) => es.forEach((e) => { if (e.isIntersecting) { play(); ob.disconnect(); } }), { threshold: 0.25 }).observe(section);
  } else { play(); }
})();
