/* ============================================================
   AURO — Banner de consentimiento de cookies (RGPD/DSGVO)
   + Google Consent Mode v2.

   - El estado por defecto (denegado) y la aplicación del
     consentimiento guardado se fijan en el <head> ANTES de GTM/GA
     (bloque "Consent Mode v2"). Este archivo solo:
       1) Muestra el banner a quien aún no ha elegido.
       2) Gestiona los clics (aceptar / rechazar / configurar).
       3) Llama a gtag('consent','update', …) y guarda la elección.
       4) Deja siempre un acceso para reabrir y cambiar la elección
          (retirada del consentimiento tan fácil como darlo).

   Autónomo: inyecta su propio CSS y DOM, así funciona en todas las
   páginas independientemente de su hoja de estilos.
   ============================================================ */
(function () {
  'use strict';

  var LS_KEY = 'auro_cookie_consent';

  /* ---------- gtag / dataLayer (por si el head no cargó aún) ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  /* ---------- idioma (alemán por defecto) ---------- */
  function getLang() {
    var l = (window.AuroI18n && window.AuroI18n.lang)
      || (document.documentElement && document.documentElement.lang)
      || 'de';
    l = String(l).slice(0, 2).toLowerCase();
    return (l === 'es' || l === 'en') ? l : 'de';
  }

  var I18N = {
    de: {
      title: 'Wir respektieren deine Privatsphäre',
      body: 'Wir verwenden Cookies und ähnliche Technologien, um unsere Website zu betreiben (notwendig) und – nur mit deiner Einwilligung – um Zugriffe zu analysieren und Marketing zu messen. Du kannst frei zustimmen, ablehnen oder deine Auswahl anpassen.',
      more: 'Cookie-Richtlinie',
      accept: 'Alle akzeptieren',
      reject: 'Alle ablehnen',
      settings: 'Einstellungen',
      save: 'Auswahl speichern',
      necessary: 'Notwendig',
      necessaryDesc: 'Für den Betrieb der Website erforderlich. Immer aktiv.',
      always: 'Immer aktiv',
      analytics: 'Analyse',
      analyticsDesc: 'Google Analytics – hilft uns zu verstehen, wie die Website genutzt wird.',
      marketing: 'Marketing',
      marketingDesc: 'Messung von Werbung und Reichweite (Meta/Facebook, Google Ads, TikTok).',
      reopen: 'Cookie-Einstellungen'
    },
    es: {
      title: 'Respetamos tu privacidad',
      body: 'Usamos cookies y tecnologías similares para que la web funcione (necesarias) y —solo con tu consentimiento— para analizar el tráfico y medir el marketing. Puedes aceptar, rechazar o configurar tu elección libremente.',
      more: 'Política de cookies',
      accept: 'Aceptar todo',
      reject: 'Rechazar todo',
      settings: 'Configurar',
      save: 'Guardar selección',
      necessary: 'Necesarias',
      necessaryDesc: 'Imprescindibles para el funcionamiento de la web. Siempre activas.',
      always: 'Siempre activas',
      analytics: 'Analítica',
      analyticsDesc: 'Google Analytics — nos ayuda a entender cómo se usa la web.',
      marketing: 'Marketing',
      marketingDesc: 'Medición de publicidad y alcance (Meta/Facebook, Google Ads, TikTok).',
      reopen: 'Configurar cookies'
    },
    en: {
      title: 'We respect your privacy',
      body: 'We use cookies and similar technologies to run our website (necessary) and — only with your consent — to analyse traffic and measure marketing. You can freely accept, reject or customise your choice.',
      more: 'Cookie policy',
      accept: 'Accept all',
      reject: 'Reject all',
      settings: 'Settings',
      save: 'Save choices',
      necessary: 'Necessary',
      necessaryDesc: 'Required for the website to work. Always on.',
      always: 'Always on',
      analytics: 'Analytics',
      analyticsDesc: 'Google Analytics — helps us understand how the site is used.',
      marketing: 'Marketing',
      marketingDesc: 'Advertising and reach measurement (Meta/Facebook, Google Ads, TikTok).',
      reopen: 'Cookie settings'
    }
  };

  function t() { return I18N[getLang()] || I18N.de; }

  function cookiePolicyHref() {
    var sub = /\/(de|es|en|personaliza|fondo-olivos)\//.test(location.pathname);
    return (sub ? '../' : '') + 'politica-cookies.html';
  }

  /* ---------- persistencia ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || 'null'); } catch (e) { return null; }
  }
  function save(consent) {
    consent.ts = new Date().toISOString();
    consent.v = 2;
    try { localStorage.setItem(LS_KEY, JSON.stringify(consent)); } catch (e) {}
  }

  /* ---------- aplicar consentimiento a Google (Consent Mode v2) ---------- */
  function applyConsent(consent) {
    gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage:        consent.ads ? 'granted' : 'denied',
      ad_user_data:      consent.ads ? 'granted' : 'denied',
      ad_personalization:consent.ads ? 'granted' : 'denied'
    });
    // Evento para posibles disparadores de GTM
    window.dataLayer.push({
      event: 'cookie_consent_update',
      consent_analytics: !!consent.analytics,
      consent_ads: !!consent.ads
    });
    // Etiquetas de marketing (TikTok + Meta) — solo con consentimiento de marketing/ads
    if (consent.ads) { loadTikTok(); loadMeta(); }
    else {
      if (window.ttq && window.ttq.revokeConsent) { try { window.ttq.revokeConsent(); } catch (e) {} }
      if (window.fbq) { try { window.fbq('consent', 'revoke'); } catch (e) {} }
    }
  }

  /* ---------- Meta (Facebook) Pixel — se carga SOLO con consentimiento de marketing ---------- */
  var META_ID = '1767761024402899';
  var metaLoaded = false;
  function loadMeta() {
    if (metaLoaded) { if (window.fbq) { try { window.fbq('consent', 'grant'); } catch (e) {} } return; }
    metaLoaded = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    // Cargamos el pixel ya con consentimiento otorgado (sólo llegamos aquí si consintió marketing)
    window.fbq('consent', 'grant');
    window.fbq('init', META_ID);
    window.fbq('track', 'PageView');
  }

  /* ---------- TikTok Pixel — se carga SOLO con consentimiento de marketing ---------- */
  var TIKTOK_ID = 'D9CH2B3C77U133LMPGH0';
  var tiktokLoaded = false;
  function loadTikTok() {
    if (tiktokLoaded) { if (window.ttq && window.ttq.grantConsent) { try { window.ttq.grantConsent(); } catch (e) {} } return; }
    tiktokLoaded = true;
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"], ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]); return e }, ttq.load = function (e, n) { var r = "https://analytics.tiktok.com/i18n/pixel/events.js", o = n && n.partner; ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = r, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {}; n = document.createElement("script"); n.type = "text/javascript", n.async = !0, n.src = r + "?sdkid=" + e + "&lib=" + t; e = document.getElementsByTagName("script")[0]; e.parentNode.insertBefore(n, e) };
      ttq.load(TIKTOK_ID);
      ttq.grantConsent && ttq.grantConsent();
      ttq.page();
    }(window, document, 'ttq');
  }

  /* ---------- CSS ---------- */
  function injectStyles() {
    if (document.getElementById('auro-consent-style')) return;
    var css =
      '.auro-cc,.auro-cc *{box-sizing:border-box}' +
      '.auro-cc{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;' +
        'display:flex;justify-content:center;padding:16px;pointer-events:none;' +
        'font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif}' +
      '.auro-cc__panel{pointer-events:auto;width:100%;max-width:720px;background:#1c1b16;' +
        'color:#f4efe5;border:1px solid rgba(185,152,58,.35);border-radius:14px;' +
        'box-shadow:0 12px 40px rgba(0,0,0,.45);padding:20px 22px;' +
        'max-height:calc(100vh - 32px);overflow:auto}' +
      '.auro-cc__title{font-family:Oswald,Inter,sans-serif;font-weight:600;font-size:1.05rem;' +
        'margin:0 0 8px;letter-spacing:.01em;color:#fff}' +
      '.auro-cc__body{font-size:.86rem;line-height:1.55;margin:0 0 14px;' +
        'color:rgba(244,239,229,.85)}' +
      '.auro-cc__body a{color:#c9a94a;text-decoration:underline}' +
      '.auro-cc__actions{display:flex;flex-wrap:wrap;gap:10px}' +
      '.auro-cc__btn{flex:1 1 auto;min-width:140px;cursor:pointer;border-radius:9px;' +
        'font:inherit;font-weight:600;font-size:.85rem;padding:11px 16px;border:1px solid transparent;' +
        'transition:opacity .15s,background .15s}' +
      '.auro-cc__btn:focus-visible{outline:2px solid #c9a94a;outline-offset:2px}' +
      '.auro-cc__btn--accept{background:#b9983a;color:#171713}' +
      '.auro-cc__btn--reject{background:transparent;color:#f4efe5;border-color:rgba(244,239,229,.4)}' +
      '.auro-cc__btn--settings{background:transparent;color:rgba(244,239,229,.8);border-color:rgba(244,239,229,.25)}' +
      '.auro-cc__btn--save{background:#b9983a;color:#171713;flex-basis:100%}' +
      '.auro-cc__btn:hover{opacity:.88}' +
      '.auro-cc__prefs{margin:4px 0 16px;border-top:1px solid rgba(244,239,229,.12);padding-top:14px}' +
      '.auro-cc__row{display:flex;gap:12px;align-items:flex-start;padding:10px 0;' +
        'border-bottom:1px solid rgba(244,239,229,.08)}' +
      '.auro-cc__row:last-child{border-bottom:0}' +
      '.auro-cc__row-main{flex:1}' +
      '.auro-cc__row-title{font-weight:600;font-size:.86rem;color:#fff;margin:0 0 3px}' +
      '.auro-cc__row-desc{font-size:.78rem;line-height:1.45;color:rgba(244,239,229,.7);margin:0}' +
      '.auro-cc__switch{position:relative;flex:0 0 auto;width:42px;height:24px;margin-top:2px}' +
      '.auro-cc__switch input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}' +
      '.auro-cc__track{position:absolute;inset:0;background:rgba(244,239,229,.25);border-radius:999px;transition:background .15s;pointer-events:none}' +
      '.auro-cc__track:before{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;' +
        'background:#fff;border-radius:50%;transition:transform .15s}' +
      '.auro-cc__switch input:checked+.auro-cc__track{background:#b9983a}' +
      '.auro-cc__switch input:checked+.auro-cc__track:before{transform:translateX(18px)}' +
      '.auro-cc__switch input:disabled+.auro-cc__track{opacity:.6;cursor:not-allowed}' +
      '.auro-cc__always{font-size:.72rem;color:#c9a94a;margin-top:4px;font-weight:600}' +
      '.auro-cc-reopen{position:fixed;left:14px;bottom:14px;z-index:2147482000;cursor:pointer;' +
        'background:#1c1b16;color:#f4efe5;border:1px solid rgba(185,152,58,.4);border-radius:999px;' +
        'font:600 .74rem Inter,system-ui,sans-serif;padding:8px 12px;opacity:.6;' +
        'box-shadow:0 4px 14px rgba(0,0,0,.3);transition:opacity .15s}' +
      '.auro-cc-reopen:hover,.auro-cc-reopen:focus-visible{opacity:1;outline:none}' +
      '@media (max-width:560px){.auro-cc__btn{min-width:0;flex-basis:100%}}' +
      '@media (prefers-reduced-motion:reduce){.auro-cc *{transition:none!important}}';
    var s = document.createElement('style');
    s.id = 'auro-consent-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ---------- DOM del banner ---------- */
  var bannerEl = null;

  function buildBanner(existing) {
    var L = t();
    injectStyles();
    if (bannerEl) bannerEl.remove();

    var prefs = existing || { analytics: false, ads: false };

    var wrap = document.createElement('div');
    wrap.className = 'auro-cc';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'false');
    wrap.setAttribute('aria-label', L.title);
    wrap.setAttribute('data-no-i18n', '');

    wrap.innerHTML =
      '<div class="auro-cc__panel">' +
        '<p class="auro-cc__title">' + esc(L.title) + '</p>' +
        '<p class="auro-cc__body">' + esc(L.body) + ' ' +
          '<a href="' + cookiePolicyHref() + '">' + esc(L.more) + '</a>.</p>' +
        '<div class="auro-cc__prefs" hidden>' +
          row(L.necessary, L.necessaryDesc, 'nec', true, true, L.always) +
          row(L.analytics, L.analyticsDesc, 'analytics', prefs.analytics, false) +
          row(L.marketing, L.marketingDesc, 'ads', prefs.ads, false) +
        '</div>' +
        '<div class="auro-cc__actions">' +
          '<button type="button" class="auro-cc__btn auro-cc__btn--reject" data-act="reject">' + esc(L.reject) + '</button>' +
          '<button type="button" class="auro-cc__btn auro-cc__btn--settings" data-act="settings">' + esc(L.settings) + '</button>' +
          '<button type="button" class="auro-cc__btn auro-cc__btn--accept" data-act="accept">' + esc(L.accept) + '</button>' +
          '<button type="button" class="auro-cc__btn auro-cc__btn--save" data-act="save" hidden>' + esc(L.save) + '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(wrap);
    bannerEl = wrap;

    var prefsBox = wrap.querySelector('.auro-cc__prefs');
    var saveBtn  = wrap.querySelector('[data-act="save"]');
    var setBtn   = wrap.querySelector('[data-act="settings"]');

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-act]');
      if (!btn) return;
      var act = btn.getAttribute('data-act');
      if (act === 'accept') decide({ analytics: true, ads: true });
      else if (act === 'reject') decide({ analytics: false, ads: false });
      else if (act === 'settings') {
        prefsBox.hidden = false;
        setBtn.hidden = true;
        saveBtn.hidden = false;
      } else if (act === 'save') {
        decide({
          analytics: wrap.querySelector('#auro-cc-analytics').checked,
          ads: wrap.querySelector('#auro-cc-ads').checked
        });
      }
    });

    // Si se abre desde "reabrir" y ya había elección → mostrar prefs directamente
    if (existing) {
      prefsBox.hidden = false;
      setBtn.hidden = true;
      saveBtn.hidden = false;
    }
  }

  function row(title, desc, key, checked, disabled, alwaysLabel) {
    var id = 'auro-cc-' + key;
    var input = '<span class="auro-cc__switch"><input type="checkbox" id="' + id + '"' +
      (checked ? ' checked' : '') + (disabled ? ' checked disabled' : '') +
      '><span class="auro-cc__track"></span></span>';
    var extra = disabled ? '<p class="auro-cc__always">' + esc(alwaysLabel || '') + '</p>' : '';
    return '<div class="auro-cc__row">' +
        '<div class="auro-cc__row-main">' +
          '<p class="auro-cc__row-title">' + esc(title) + '</p>' +
          '<p class="auro-cc__row-desc">' + esc(desc) + '</p>' + extra +
        '</div>' + input +
      '</div>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function decide(consent) {
    save(consent);
    applyConsent(consent);
    if (bannerEl) { bannerEl.remove(); bannerEl = null; }
    ensureReopen();
  }

  /* ---------- botón para reabrir (retirar/cambiar consentimiento) ---------- */
  function ensureReopen() {
    if (document.querySelector('.auro-cc-reopen')) return;
    // Si la página ya ofrece un enlace propio, no añadimos el botón flotante.
    if (document.querySelector('[data-cookie-settings]')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'auro-cc-reopen';
    b.setAttribute('data-no-i18n', '');
    b.textContent = '🍪 ' + t().reopen;
    b.addEventListener('click', openSettings);
    document.body.appendChild(b);
  }

  function openSettings() {
    buildBanner(load() || { analytics: false, ads: false });
  }

  /* ---------- API pública ---------- */
  window.AuroConsent = {
    open: openSettings,
    reset: function () { try { localStorage.removeItem(LS_KEY); } catch (e) {} location.reload(); }
  };

  /* ---------- init ---------- */
  function init() {
    // Enlaza cualquier control propio de la página
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); openSettings(); });
    });

    var existing = load();
    if (existing && (existing.analytics != null)) {
      // Ya eligió: el head ya aplicó el estado de Google; cargamos TikTok + Meta si
      // aceptó marketing y dejamos el acceso para cambiar la elección.
      if (existing.ads) { loadTikTok(); loadMeta(); }
      ensureReopen();
    } else {
      buildBanner(null);
    }

    // Reconstruye textos si cambia el idioma con el selector
    document.addEventListener('auro:langchange', function () {
      if (bannerEl) buildBanner(load());
      var r = document.querySelector('.auro-cc-reopen');
      if (r) r.textContent = '🍪 ' + t().reopen;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
