/* ============================================================
   AURO — El viaje del origen: España → Andalucía → Jaén →
   Sierra Mágina → la finca. Relieve 3D (MapLibre + DEM), guiado
   con datos por nivel. Sin API key. Edita LAT/LNG con tu finca.
   ============================================================ */
(function () {
  if (typeof maplibregl === 'undefined') return;
  if (!document.getElementById('mapa')) return;

  // traducción (ES · EN · DE) — lee del diccionario global si está disponible
  const T = (s) => (window.AuroI18n && window.AuroI18n.t) ? window.AuroI18n.t(s) : s;
  let current = 0, elev = null;

  const LAT = 37.822260, LNG = -3.418403; // finca (Sierra Mágina, Jaén)

  const STEPS = [
    { name: 'España',        center: [-3.70, 40.20], zoom: 4.9,  pitch: 25, bearing: 0,   fact: 'España es la 1ª productora mundial de aceite de oliva (~50% del total).' },
    { name: 'Andalucía',     center: [-4.55, 37.55], zoom: 6.6,  pitch: 38, bearing: -6,  fact: 'Andalucía concentra cerca del 80% del aceite de España.' },
    { name: 'Jaén',          center: [-3.60, 37.90], zoom: 8.1,  pitch: 50, bearing: -10, fact: 'Jaén: la capital mundial del olivar, con más de 60 millones de olivos.' },
    { name: 'Sierra Mágina', center: [-3.46, 37.78], zoom: 10.4, pitch: 60, bearing: -14, fact: 'Sierra Mágina: aceite de montaña con Denominación de Origen.' },
    { name: 'La finca',      center: [LNG, LAT],     zoom: 14,   pitch: 66, bearing: -8,  fact: 'Aquí nace AURO: 100% Picual, cosecha temprana.' },
  ];

  const style = {
    version: 8,
    sources: {
      topo: {
        type: 'raster',
        tiles: [
          'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
          'https://b.tile.opentopomap.org/{z}/{x}/{y}.png',
          'https://c.tile.opentopomap.org/{z}/{x}/{y}.png',
        ],
        tileSize: 256, maxzoom: 17,
        attribution: '© OpenTopoMap (CC-BY-SA) · © OpenStreetMap',
      },
      dem: {
        type: 'raster-dem',
        tiles: ['https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png'],
        encoding: 'terrarium', tileSize: 256, maxzoom: 15,
        attribution: '© Mapzen / AWS Terrain Tiles',
      },
    },
    layers: [
      { id: 'bg', type: 'background', paint: { 'background-color': '#F4EFE5' } },
      { id: 'topo', type: 'raster', source: 'topo' },
      { id: 'hills', type: 'hillshade', source: 'dem', paint: { 'hillshade-exaggeration': 0.45 } },
    ],
    terrain: { source: 'dem', exaggeration: 1.4 },
  };

  const map = new maplibregl.Map({
    container: 'mapa',
    style,
    center: STEPS[0].center,
    zoom: STEPS[0].zoom,
    pitch: STEPS[0].pitch,
    bearing: STEPS[0].bearing,
    maxPitch: 80,
    cooperativeGestures: true,
    attributionControl: { compact: true },
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');

  // Marcador de la finca
  const pin = document.createElement('div');
  pin.className = 'finca-pin'; pin.innerHTML = '<span></span>';
  function altText() {
    return elev != null
      ? (T('Altitud ~') + Math.round(elev) + T(' m · Sierra Mágina, Jaén'))
      : 'Sierra Mágina, Jaén';
  }
  function popupHTML() {
    return T('<strong>AURO · Olivar de Sierra Mágina</strong><br>100% Picual · cosecha temprana<br>') +
      '<span id="finca-alt">' + altText() + '</span>';
  }
  const popup = new maplibregl.Popup({ offset: 16, closeButton: false }).setHTML(popupHTML());
  const marker = new maplibregl.Marker({ element: pin, anchor: 'center' })
    .setLngLat([LNG, LAT]).setPopup(popup).addTo(map);

  // UI del viaje
  const fact = document.getElementById('mapaFact');
  const stepBtns = Array.prototype.slice.call(document.querySelectorAll('.mapa__step'));
  let autoT = null;
  const stopAuto = () => { if (autoT) { clearTimeout(autoT); autoT = null; } };

  function go(i, fly) {
    i = Math.max(0, Math.min(STEPS.length - 1, i));
    const s = STEPS[i];
    current = i;
    stepBtns.forEach((b, k) => b.classList.toggle('is-active', k === i));
    if (fact) { fact.textContent = T(s.fact); fact.classList.add('show'); }
    map[fly === false ? 'jumpTo' : 'flyTo']({ center: s.center, zoom: s.zoom, pitch: s.pitch, bearing: s.bearing, duration: 2600, essential: true });
    const p = marker.getPopup();
    const open = p && p.isOpen && p.isOpen();
    if (i === STEPS.length - 1 && !open) marker.togglePopup();
    if (i !== STEPS.length - 1 && open) marker.togglePopup();
  }

  stepBtns.forEach((b) => b.addEventListener('click', () => { stopAuto(); go(+b.dataset.i); }));
  map.on('dragstart', stopAuto);

  function autoplay(i) { go(i); if (i < STEPS.length - 1) autoT = setTimeout(() => autoplay(i + 1), 3400); }

  // El mapa parte SIEMPRE en España (paso 0) y se queda quieto ahí.
  // La animación del viaje NO arranca hasta que el usuario llega de verdad
  // a esta sección (el mapa bien centrado en pantalla). Así nadie lo encuentra
  // ya terminado en Sierra Mágina.
  go(0, false);
  let started = false;
  function startJourney() {
    if (started) return;
    started = true;
    stopAuto();
    autoplay(0);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((es, ob) => es.forEach((e) => {
      // intersectionRatio alto + margen inferior negativo => sólo cuando el
      // mapa está claramente dentro del viewport, no de pasada al hacer scroll.
      if (e.isIntersecting && e.intersectionRatio >= 0.6 && !started) {
        startJourney();
        ob.disconnect();
      }
    }), { threshold: [0.6, 0.75], rootMargin: '0px 0px -12% 0px' })
      .observe(document.getElementById('mapa'));
  } else {
    // Sin IntersectionObserver: arranca al primer scroll manual cercano.
    window.addEventListener('scroll', function once() {
      var r = document.getElementById('mapa').getBoundingClientRect();
      if (r.top < window.innerHeight * 0.55 && r.bottom > 0) { startJourney(); window.removeEventListener('scroll', once); }
    }, { passive: true });
  }

  // Altitud real de la finca
  map.once('idle', () => {
    try {
      const e = map.queryTerrainElevation([LNG, LAT]);
      if (e) { elev = e; const p = marker.getPopup(); if (p) p.setHTML(popupHTML()); }
    } catch (_) {}
  });

  // Reacciona al cambio de idioma
  document.addEventListener('auro:langchange', () => {
    if (fact) fact.textContent = T(STEPS[current].fact);
    const p = marker.getPopup(); if (p) p.setHTML(popupHTML());
  });
})();
