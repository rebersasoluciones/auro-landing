/* ============================================================
   AURO — Mapa satélite de los olivares (Leaflet + Esri World Imagery)
   Sin API key. Edita FINCA con las coordenadas reales de tu finca.
   ============================================================ */
(function () {
  if (typeof L === 'undefined') return;
  const el = document.getElementById('mapa');
  if (!el) return;

  // === EDITA ESTO con las coordenadas reales de tu finca [lat, lng] ===
  const FINCA = [37.7900, -3.4500];   // Sierra Mágina (Jaén) — aproximado
  const ZOOM = 13;

  const map = L.map(el, {
    center: FINCA,
    zoom: ZOOM,
    scrollWheelZoom: false,   // no atrapa el scroll de la página
    zoomControl: true,
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Imagen &copy; Esri, Maxar, Earthstar Geographics',
  }).addTo(map);

  const icon = L.divIcon({ className: 'finca-pin', html: '<span></span>', iconSize: [22, 22], iconAnchor: [11, 11] });
  L.marker(FINCA, { icon }).addTo(map)
    .bindPopup(
      '<strong>AURO · Olivar de Sierra Mágina</strong><br>' +
      '100% Picual · cosecha temprana<br>' +
      'Altitud ~800&nbsp;m · Sierra Mágina, Jaén'
    )
    .openPopup();

  // Halo de la zona de cultivo
  L.circle(FINCA, { radius: 1400, color: '#B9983A', weight: 2, fillColor: '#6F6B2E', fillOpacity: 0.12 }).addTo(map);

  // Activa el zoom con rueda solo al interactuar con el mapa
  map.on('click', () => map.scrollWheelZoom.enable());
  map.on('mouseout', () => map.scrollWheelZoom.disable());
})();
