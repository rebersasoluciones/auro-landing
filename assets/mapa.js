/* ============================================================
   AURO — Relieve 3D de Sierra Mágina (MapLibre GL + terreno DEM)
   Mapa topográfico (no satélite) con elevación real: girar, inclinar,
   sobrevolar. Sin API key. Edita LAT/LNG con tu finca.
   ============================================================ */
(function () {
  if (typeof maplibregl === 'undefined') return;
  if (!document.getElementById('mapa')) return;

  const LAT = 37.822260, LNG = -3.418403; // finca (Sierra Mágina, Jaén)

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
      { id: 'bg', type: 'background', paint: { 'background-color': '#dfeaf2' } },
      { id: 'topo', type: 'raster', source: 'topo' },
      { id: 'hills', type: 'hillshade', source: 'dem', paint: { 'hillshade-exaggeration': 0.45 } },
    ],
    terrain: { source: 'dem', exaggeration: 1.4 },
  };

  const map = new maplibregl.Map({
    container: 'mapa',
    style,
    center: [LNG, LAT],
    zoom: 13.3,
    pitch: 62,
    bearing: -22,
    maxPitch: 80,
    cooperativeGestures: true, // no atrapa el scroll de la página
    attributionControl: { compact: true },
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');

  const pin = document.createElement('div');
  pin.className = 'finca-pin';
  pin.innerHTML = '<span></span>';
  const popup = new maplibregl.Popup({ offset: 16, closeButton: false }).setHTML(
    '<strong>AURO · Olivar de Sierra Mágina</strong><br>' +
    '100% Picual · cosecha temprana<br>' +
    '<span id="finca-alt">Sierra Mágina, Jaén</span>'
  );
  const marker = new maplibregl.Marker({ element: pin, anchor: 'center' })
    .setLngLat([LNG, LAT]).setPopup(popup).addTo(map);

  map.on('load', () => { marker.togglePopup(); });

  // Altitud real consultada al terreno
  map.once('idle', () => {
    try {
      const e = map.queryTerrainElevation([LNG, LAT]);
      const node = document.getElementById('finca-alt');
      if (e && node) node.textContent = 'Altitud ~' + Math.round(e) + ' m · Sierra Mágina, Jaén';
    } catch (_) {}
  });

  // Vuelo de entrada suave la primera vez que entra en pantalla
  let flown = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((es, ob) => es.forEach((e) => {
      if (e.isIntersecting && !flown) {
        flown = true;
        map.easeTo({ zoom: 14, pitch: 66, bearing: -8, duration: 4000 });
        ob.disconnect();
      }
    }), { threshold: 0.4 }).observe(document.getElementById('mapa'));
  }
})();
