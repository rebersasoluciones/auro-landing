/* ============================================================
   AURO — Lista de espera + cuenta atrás.
   1) Captura el registro y crea un LEAD en Odoo (crm.lead).
   2) Guarda siempre una copia local (localStorage) por seguridad.
   3) Redirige a la página de gracias (gracias.html) con animación.
   4) Cuenta atrás real en el footer hasta la primera cosecha.
   ============================================================ */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     CONFIG ODOO  ·  ← EDITA ESTO
     ----------------------------------------------------------
     Pega en `endpoint` la URL que recibe el lead. Dos opciones:

       A) Formulario web de Odoo (si la web y Odoo comparten dominio,
          o tienes CORS/CSRF configurados):
          https://TU-EMPRESA.odoo.com/website/form/crm.lead

       B) Proxy serverless (recomendado para webs estáticas como
          GitHub Pages; guarda la API key en secreto en el servidor):
          https://tu-proxy.workers.dev/lead

     Si lo dejas VACÍO, la web funciona igual en "modo local":
     guarda los registros en el navegador (los puedes exportar con
     window.auroExportLeads() desde la consola) y lleva a gracias.html.
     ---------------------------------------------------------- */
  var ODOO = {
    // Formulario web de Odoo (crea el lead en crm.lead)
    endpoint: 'https://www.proyectocaminodesantiago.com/website/form/crm.lead',
    csrfToken: '',                      // opcional: token CSRF de Odoo si tu instancia lo exige
    campaign: 'Lista de espera AURO',   // aparecerá en el nombre del lead
    source: 'Landing prelanzamiento'
  };

  var LS_KEY = 'auro_waitlist_leads';
  // Contador de inscritos (cacheado y creciente). Parte de una base y sube:
  // ~WAITLIST_PER_DAY al día (crecimiento orgánico simulado) + inscripciones reales
  // de este navegador. Se cachea en localStorage de forma monótona (nunca baja).
  var WAITLIST_BASE = 200;                    // inscritos de partida
  var WAITLIST_START = Date.UTC(2026, 7, 6);  // fecha base: 6 ago 2026
  var WAITLIST_PER_DAY = 7;                    // ritmo de crecimiento diario

  /* ---------- referidos ---------- */
  // Código de referido propio (estable en este navegador)
  function myRefCode() {
    var c = null;
    try { c = localStorage.getItem('auro_ref_me'); } catch (e) {}
    if (!c) {
      c = (Math.random().toString(36).slice(2, 8) + Math.random().toString(36).slice(2, 5)).toUpperCase().slice(0, 7);
      try { localStorage.setItem('auro_ref_me', c); } catch (e) {}
    }
    return c;
  }
  // Captura ?ref= de la URL (quién te ha invitado) y lo recuerda
  function incomingRef() {
    try {
      var u = new URLSearchParams(location.search).get('ref');
      if (u) { u = u.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 32); if (u) localStorage.setItem('auro_ref_in', u); }
      return localStorage.getItem('auro_ref_in') || '';
    } catch (e) { return ''; }
  }
  incomingRef(); // se ejecuta al cargar la página para capturar el ?ref

  // Número de lata reservada (1..1000). Cosmético hasta conectarlo al nº real de Odoo.
  function myCanNumber() {
    var n = 0;
    try { n = parseInt(localStorage.getItem('auro_can_no'), 10) || 0; } catch (e) {}
    if (!n) {
      var START = Date.UTC(2026, 6, 1);           // 1 jul 2026
      var days = Math.max(0, Math.floor((Date.now() - START) / 86400000));
      n = 500 + days * 4 + Math.floor(Math.random() * 9);
      n = Math.min(998, Math.max(501, n));
      try { localStorage.setItem('auro_can_no', String(n)); } catch (e) {}
    }
    return n;
  }

  /* ---------- utilidades ---------- */
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function pad(x) { return (x < 10 ? '0' : '') + x; }

  function saveLocal(lead) {
    try {
      var arr = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      arr.push(lead);
      localStorage.setItem(LS_KEY, JSON.stringify(arr));
    } catch (e) { /* almacenamiento no disponible: seguimos igual */ }
  }

  // Exporta los registros locales a CSV (útil durante la puesta en marcha)
  window.auroExportLeads = function () {
    var arr = [];
    try { arr = JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch (e) {}
    if (!arr.length) { console.log('[AURO] No hay registros locales.'); return; }
    var rows = [['email', 'nombre', 'fecha']].concat(arr.map(function (l) {
      return [l.email || '', l.name || '', l.ts || ''];
    }));
    var csv = rows.map(function (r) {
      return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');
    var a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'auro_leads.csv';
    a.click();
  };

  /* ---------- envío a Odoo ---------- */
  function sendToOdoo(email, name) {
    if (!ODOO.endpoint) return Promise.resolve({ local: true }); // modo local

    var mine = myRefCode();
    var ref = incomingRef();
    var can = myCanNumber();
    var fd = new FormData();
    fd.append('email_from', email);
    fd.append('contact_name', name || email);
    fd.append('name', ODOO.campaign + ' — ' + (name || email));
    fd.append('description',
      'Alta en la lista de espera (prelanzamiento AURO).\n' +
      'Origen: ' + ODOO.source + '\n' +
      'Puesto en la lista: Nº ' + can + ' (las primeras 1.000 se llevan la cosecha numerada)\n' +
      'Regalo prometido: acceso a la IA de recetas.\n' +
      'Código de referido propio: ' + mine +
      (ref ? ('\nInvitado por (ref): ' + ref) : ''));
    if (ODOO.csrfToken) fd.append('csrf_token', ODOO.csrfToken);

    return fetch(ODOO.endpoint, { method: 'POST', body: fd, mode: 'cors' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json().catch(function () { return {}; });
      });
  }

  function goThanks(name) {
    try { sessionStorage.setItem('auro_name', name || ''); } catch (e) {}
    // Desde /es/ o /en/ subimos un nivel a la página de gracias de la raíz.
    var sub = /\/(?:es|en)\//.test(location.pathname);
    window.location.href = (sub ? '../' : '') + 'gracias.html';
  }

  /* ---------- formulario ---------- */
  (function initForm() {
    var form = document.getElementById('waitlistForm');
    if (!form) return;

    var email   = document.getElementById('wlEmail');
    var name    = document.getElementById('wlName');
    var consent = document.getElementById('wlConsent');
    var submit  = document.getElementById('wlSubmit');
    var errEl   = document.getElementById('wlError');
    var honey   = document.getElementById('wlCompany'); // honeypot anti-bots
    var loadedAt = Date.now();                          // marca de tiempo para el "time trap"

    function showError(msg) { errEl.textContent = msg; errEl.hidden = false; }
    function clearError() { errEl.textContent = ''; errEl.hidden = true; }

    // El botón solo se habilita si se acepta la política de privacidad
    function syncConsent() { submit.disabled = !consent.checked; }
    consent.addEventListener('change', syncConsent);
    syncConsent();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError();

      var em = (email.value || '').trim();
      var nm = (name.value || '').trim();

      // Anti-bots (honeypot): si el campo señuelo trae valor, es un bot.
      // Simulamos éxito sin enviar nada a Odoo ni guardar el registro.
      if (honey && honey.value) { goThanks(nm); return; }

      // Anti-bots (time trap): los bots rellenan y envían en milisegundos.
      // Un humano tarda en escribir el email y marcar el consentimiento.
      if (Date.now() - loadedAt < 2000) { goThanks(nm); return; }

      if (!isEmail(em)) { showError('Introduce un email válido.'); email.focus(); return; }
      if (!consent.checked) { showError('Necesitamos tu consentimiento para poder avisarte.'); return; }

      submit.disabled = true;
      var original = submit.textContent;
      submit.textContent = 'Enviando…';

      myRefCode();    // garantiza el código de referido para la página de gracias
      myCanNumber();  // asigna y guarda el número de lata reservada

      // Copia local SIEMPRE (aunque Odoo falle, no perdemos el registro)
      saveLocal({ email: em, name: nm, ref: incomingRef() || '', ts: new Date().toISOString() });

      sendToOdoo(em, nm)
        .then(function () { goThanks(nm); })
        .catch(function (err) {
          // El lead ya está guardado localmente → seguimos a la página de gracias
          console.warn('[AURO] Odoo no confirmó el lead (guardado en local):', err);
          submit.textContent = original;
          submit.disabled = false;
          goThanks(nm);
        });
    });
  })();

  /* ---------- contador de inscritos (cacheado y creciente) ---------- */
  var CNT_KEY = 'auro_wl_count';
  function waitlistCount() {
    var local = 0;
    try { local = (JSON.parse(localStorage.getItem(LS_KEY) || '[]')).length; } catch (e) {}
    var days = Math.max(0, (Date.now() - WAITLIST_START) / 86400000);
    var target = WAITLIST_BASE + Math.floor(days * WAITLIST_PER_DAY) + local;
    // Cache monótona: el número mostrado nunca disminuye entre visitas.
    var cached = 0;
    try { cached = parseInt(localStorage.getItem(CNT_KEY), 10) || 0; } catch (e) {}
    if (target < cached) target = cached;
    try { localStorage.setItem(CNT_KEY, String(target)); } catch (e) {}
    return target;
  }

  (function initCounter() {
    var el = document.getElementById('wlCount');
    if (!el) return;
    var target = waitlistCount();
    function fmt(n) { return Math.round(n).toLocaleString('es-ES'); }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(target); return; }
    var from = Math.max(0, target - 40), t0 = null, dur = 1200;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      p = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (target - from) * p);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  })();

  /* ---------- cuenta atrás (footer) ---------- */
  (function initCountdown() {
    var cd = document.getElementById('countdown');
    if (!cd) return;
    var deadline = new Date(cd.getAttribute('data-deadline')).getTime();
    if (isNaN(deadline)) return;

    var out = {
      days:  cd.querySelector('[data-cd="days"]'),
      hours: cd.querySelector('[data-cd="hours"]'),
      mins:  cd.querySelector('[data-cd="mins"]'),
      secs:  cd.querySelector('[data-cd="secs"]')
    };

    function tick() {
      var diff = deadline - Date.now();
      if (diff < 0) diff = 0;
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      out.days.textContent  = d;
      out.hours.textContent = pad(h);
      out.mins.textContent  = pad(m);
      out.secs.textContent  = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  })();

})();
