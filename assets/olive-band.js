/* ============================================================
   AURO — Banda de olivas (three.js, sin build)
   Ramas de olivo, hojas y aceitunas cruzando de derecha a izquierda.
   REACTIVA al ratón: las aceitunas se apartan del cursor + parallax.
   Acabado satinado con reflejos (RoomEnvironment). Respeta reduced-motion.
   ============================================================ */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

(function () {
  const canvas = document.querySelector('.olive-band__canvas');
  if (!canvas) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rnd = (a, b) => a + Math.random() * (b - a);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 16);

  // Reflejos satinados con un entorno de degradado propio (solo three core)
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = (function () {
    const c = document.createElement('canvas'); c.width = 16; c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 0, 64);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.5, '#f1ead8');
    g.addColorStop(1, '#c9bd93');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 16, 64);
    const t = new THREE.CanvasTexture(c);
    t.mapping = THREE.EquirectangularReflectionMapping;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  scene.environment = pmrem.fromEquirectangular(envTex).texture;
  envTex.dispose();

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.3);
  key.position.set(5, 8, 9); scene.add(key);
  const warm = new THREE.DirectionalLight(0xffe6bf, 0.5);
  warm.position.set(-7, -2, 5); scene.add(warm);

  // --- Geometrías compartidas ---
  const oliveGeo = new THREE.SphereGeometry(0.5, 22, 16);
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.62);
  leafShape.bezierCurveTo(0.26, -0.2, 0.26, 0.2, 0, 0.62);
  leafShape.bezierCurveTo(-0.26, 0.2, -0.26, -0.2, 0, -0.62);
  const leafGeo = new THREE.ShapeGeometry(leafShape, 14);

  // --- Materiales (satinado/clearcoat para sheen aceitoso) ---
  const oliveMats = [
    new THREE.MeshPhysicalMaterial({ color: 0x93a02f, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.18 }),
    new THREE.MeshPhysicalMaterial({ color: 0xb4be46, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.15 }),
    new THREE.MeshPhysicalMaterial({ color: 0x6f7a24, roughness: 0.3,  clearcoat: 1, clearcoatRoughness: 0.2 }),
    new THREE.MeshPhysicalMaterial({ color: 0x3c3320, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.25 }),
  ];
  const leafMats = [
    new THREE.MeshPhysicalMaterial({ color: 0x5d6b30, roughness: 0.5, clearcoat: 0.5, clearcoatRoughness: 0.4, side: THREE.DoubleSide }),
    new THREE.MeshPhysicalMaterial({ color: 0x86925a, roughness: 0.55, clearcoat: 0.4, clearcoatRoughness: 0.45, side: THREE.DoubleSide }),
  ];
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x5a4a2d, roughness: 0.8 });
  const pick = (a) => a[(Math.random() * a.length) | 0];

  function makeOlive() {
    const m = new THREE.Mesh(oliveGeo, pick(oliveMats));
    m.scale.set(0.58, 0.76, 0.58).multiplyScalar(rnd(0.75, 1.4));
    return m;
  }
  function makeLeaf() {
    const m = new THREE.Mesh(leafGeo, pick(leafMats));
    m.scale.setScalar(rnd(0.9, 1.7));
    return m;
  }
  function makeSprig() {
    const g = new THREE.Group();
    const len = rnd(1.9, 2.8);
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.055, len, 6), stemMat));
    const pairs = Math.max(3, Math.round(len / 0.42));
    for (let i = 0; i < pairs; i++) {
      const y = -len / 2 + 0.25 + i * (len - 0.5) / pairs;
      for (const side of [-1, 1]) {
        const lf = new THREE.Mesh(leafGeo, pick(leafMats));
        lf.scale.setScalar(rnd(0.6, 0.9));
        lf.position.set(side * 0.1, y, 0);
        lf.rotation.z = side * 1.05 + rnd(-0.2, 0.2);
        lf.rotation.y = rnd(-0.35, 0.35);
        g.add(lf);
      }
    }
    for (let k = 0; k < 2; k++) {
      const ol = makeOlive(); ol.scale.multiplyScalar(0.72);
      ol.position.set(rnd(-0.12, 0.12), len / 2 - 0.25 - k * 0.34, 0.06);
      g.add(ol);
    }
    g.scale.setScalar(rnd(0.7, 1.05));
    return g;
  }

  const bounds = { hw: 30, hh: 6 };
  function resize() {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const vh = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    bounds.hh = vh / 2; bounds.hw = (vh / 2) * camera.aspect;
  }

  function reposition(o, fromRight) {
    o.position.x = fromRight ? (bounds.hw + rnd(2, 12)) : rnd(-bounds.hw, bounds.hw);
    o.position.y = rnd(-bounds.hh * 0.82, bounds.hh * 0.82);
    o.position.z = rnd(-3, 3.5);
    o.rotation.set(rnd(0, 6.28), rnd(0, 6.28), rnd(0, 6.28));
    const u = o.userData;
    u.spd = rnd(1.4, 3.6) * (1 + (o.position.z + 3) / 11);
    u.rx = rnd(-0.4, 0.4); u.ry = rnd(-0.5, 0.5); u.rz = rnd(-0.4, 0.4);
    u.bob = rnd(0, 6.28); u.bobA = rnd(0.12, 0.45);
    u.vx = 0; u.vy = 0;
  }

  const group = new THREE.Group();
  scene.add(group);
  resize();
  const items = [];
  const COUNT = 42;
  for (let i = 0; i < COUNT; i++) {
    const r = Math.random();
    const o = r < 0.4 ? makeOlive() : r < 0.62 ? makeLeaf() : makeSprig(); // ~38% ramas
    o.userData = {};
    reposition(o, false);
    group.add(o); items.push(o);
  }

  // --- Ratón (reactivo) ---
  const mouse = { x: 0, y: 0, active: false };
  function onMove(e) {
    const r = canvas.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    mouse.active = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1;
    mouse.x = (nx * 2 - 1);
    mouse.y = -(ny * 2 - 1);
  }
  addEventListener('pointermove', onMove, { passive: true });
  addEventListener('pointerleave', () => (mouse.active = false));

  const R = 7, FORCE = 34;
  const clock = new THREE.Clock();
  let running = false;

  function step(dt) {
    // parallax: la escena se inclina suavemente hacia el ratón
    const tx = mouse.active ? mouse.x : 0, ty = mouse.active ? mouse.y : 0;
    group.rotation.y += (tx * 0.14 - group.rotation.y) * 0.06;
    group.rotation.x += (-ty * 0.09 - group.rotation.x) * 0.06;

    const mwx = mouse.x * bounds.hw, mwy = mouse.y * bounds.hh;
    for (const o of items) {
      const u = o.userData;
      // repulsión del cursor
      if (mouse.active) {
        const dx = o.position.x - mwx, dy = o.position.y - mwy;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 0.001;
          const f = (1 - d / R) * FORCE;
          u.vx += (dx / d) * f * dt;
          u.vy += (dy / d) * f * dt;
        }
      }
      u.vx *= 0.9; u.vy *= 0.9;
      o.position.x += (u.vx - u.spd) * dt;
      o.position.y += u.vy * dt + Math.sin((u.bob += dt)) * u.bobA * dt;
      o.rotation.x += u.rx * dt; o.rotation.y += u.ry * dt; o.rotation.z += u.rz * dt;
      if (o.position.x < -bounds.hw - 2) reposition(o, true);
    }
    renderer.render(scene, camera);
  }

  function loop() {
    if (!running) return;
    step(Math.min(clock.getDelta(), 0.05));
    requestAnimationFrame(loop);
  }
  function start() { if (!running && !reduce) { running = true; clock.getDelta(); requestAnimationFrame(loop); } }
  function stop() { running = false; }

  addEventListener('resize', resize);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? start() : stop())),
      { threshold: 0.01 }).observe(canvas);
  } else { start(); }

  renderer.render(scene, camera); // frame inicial / único si reduced-motion
})();
