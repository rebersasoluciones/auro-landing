/* ============================================================
   AURO — Visor 360° por secuencia de imágenes (vanilla, sin dependencias)
   ------------------------------------------------------------
   Uso: añade a un contenedor el atributo data-viewer-360 y la config:
     <div data-viewer-360
          data-path="assets/360/lata/"   ruta de los fotogramas
          data-prefix="frame-"           prefijo del nombre
          data-count="24"                nº de fotogramas (sube a 36 = más fluido)
          data-pad="3"                   dígitos: 3 → frame-001
          data-ext="png"                 EXTENSIÓN — pon "jpg" si tus fotos son .jpg
          data-autospin="true"           giro automático hasta la 1ª interacción
          data-reverse="false"           invierte el sentido del arrastre
          data-fallback="assets/lata-auro.png">  imagen si algo falla
     </div>

   Para usar TUS fotos: deja 24 (o 36) imágenes en data-path nombradas
   frame-001.<ext> … frame-0NN.<ext>, en orden de giro. Sin tocar el código.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initViewer(el) {
    var path     = el.dataset.path || "";
    var prefix   = el.dataset.prefix || "frame-";
    var count    = Math.max(1, parseInt(el.dataset.count || "24", 10));
    var pad      = parseInt(el.dataset.pad || "3", 10);
    var ext      = (el.dataset.ext || "png").replace(/^\./, "");
    var autospin = el.dataset.autospin !== "false";
    var reverse  = el.dataset.reverse === "true";
    var fallback = el.dataset.fallback || "";
    var altText  = el.dataset.alt || "Vista 360°";

    // URLs de los fotogramas
    var urls = [];
    for (var i = 1; i <= count; i++) {
      urls.push(path + prefix + String(i).padStart(pad, "0") + "." + ext);
    }

    // ---- DOM interno ----
    var img = document.createElement("img");
    img.className = "viewer-360__img";
    img.alt = altText;
    img.decoding = "async";
    img.draggable = false;

    var overlay = document.createElement("div");
    overlay.className = "viewer-360__overlay";
    overlay.innerHTML =
      '<span class="viewer-360__spinner" aria-hidden="true"></span>' +
      '<span class="viewer-360__progress">0%</span>';
    var progressEl = overlay.querySelector(".viewer-360__progress");

    var hint = document.createElement("span");
    hint.className = "viewer-360__hint";
    hint.setAttribute("aria-hidden", "true");
    hint.textContent = "↔ Arrastra para girar";

    el.appendChild(img);
    el.appendChild(overlay);
    el.appendChild(hint);

    // ---- Estado ----
    var index = 0;
    var loaded = 0;
    var ready = false;
    var failed = false;
    var touched = false;
    var images = new Array(count);

    function showFrame(idx) {
      index = ((idx % count) + count) % count;
      if (images[index] && images[index].complete) {
        img.src = images[index].src;
      }
      el.setAttribute("aria-valuenow", index + 1);
    }

    // ---- Precarga ----
    function fail() {
      if (failed) return;
      failed = true;
      stopAuto();
      stopMomentum();
      if (fallback) {
        el.innerHTML =
          '<img class="img-warm viewer-360__fallback" src="' + fallback +
          '" alt="' + altText.replace(/"/g, "&quot;") + '">';
      }
      el.removeAttribute("role");
      el.removeAttribute("tabindex");
    }

    urls.forEach(function (url, i) {
      var im = new Image();
      im.onload = function () {
        loaded++;
        if (i === 0) { img.src = im.src; }            // primer cuadro cuanto antes
        if (progressEl) {
          progressEl.textContent = Math.round((loaded / count) * 100) + "%";
        }
        if (loaded === count) { onReady(); }
      };
      im.onerror = function () {
        // Si falta el PRIMER fotograma, asumimos que aún no hay secuencia → fallback
        if (i === 0) { fail(); }
        loaded++;
        if (loaded === count && !ready) { onReady(); }
      };
      im.src = url;
      images[i] = im;
    });

    function onReady() {
      if (ready || failed) return;
      ready = true;
      el.classList.add("is-ready");
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      showFrame(index);
      startAuto();
    }

    // ---- Interacción (arrastre con Pointer Events: ratón + táctil) ----
    var dragging = false, startX = 0, startIndex = 0, lastX = 0, lastT = 0, vel = 0;

    function pxPerFrame() {
      return Math.max(4, el.clientWidth / count);
    }

    function onDown(e) {
      if (!ready) return;
      dragging = true;
      markTouched();
      stopAuto();
      stopMomentum();
      startX = lastX = e.clientX;
      startIndex = index;
      lastT = e.timeStamp || Date.now();
      vel = 0;
      el.classList.add("is-dragging");
      if (el.setPointerCapture && e.pointerId != null) {
        try { el.setPointerCapture(e.pointerId); } catch (_) {}
      }
    }

    function onMove(e) {
      if (!dragging) return;
      var dir = reverse ? -1 : 1;
      var delta = Math.round((e.clientX - startX) / pxPerFrame());
      showFrame(startIndex - delta * dir);

      var now = e.timeStamp || Date.now();
      var dt = now - lastT;
      if (dt > 0) {
        vel = ((e.clientX - lastX) / pxPerFrame()) / dt * 16; // frames por tick
        lastX = e.clientX;
        lastT = now;
      }
    }

    function onUp() {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("is-dragging");
      if (!reduceMotion && Math.abs(vel) > 0.4) startMomentum();
    }

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("lostpointercapture", onUp);

    // Teclado (accesibilidad)
    el.addEventListener("keydown", function (e) {
      if (!ready) return;
      var dir = reverse ? -1 : 1;
      if (e.key === "ArrowLeft")      { showFrame(index + dir);  markTouched(); stopAuto(); e.preventDefault(); }
      else if (e.key === "ArrowRight"){ showFrame(index - dir);  markTouched(); stopAuto(); e.preventDefault(); }
      else if (e.key === "Home")      { showFrame(0);            markTouched(); stopAuto(); e.preventDefault(); }
    });

    function markTouched() {
      if (touched) return;
      touched = true;
      el.classList.add("is-touched");
    }

    // ---- Giro automático y momentum (un solo rAF) ----
    var rafId = null, mode = null; // 'auto' | 'momentum'

    function tick() {
      if (mode === "auto") {
        // avance fraccional acumulado → ~1 vuelta cada 8 s
        autoAcc += (count / (8 * 60)) * (reverse ? -1 : 1);
        if (Math.abs(autoAcc) >= 1) {
          showFrame(index + (autoAcc > 0 ? 1 : -1));
          autoAcc -= (autoAcc > 0 ? 1 : -1);
        }
      } else if (mode === "momentum") {
        var dir = reverse ? -1 : 1;
        momAcc += vel;
        vel *= 0.92;
        if (Math.abs(momAcc) >= 1) {
          showFrame(index - (momAcc > 0 ? 1 : -1) * dir);
          momAcc -= (momAcc > 0 ? 1 : -1);
        }
        if (Math.abs(vel) < 0.15) { stopMomentum(); return; }
      }
      rafId = window.requestAnimationFrame(tick);
    }

    var autoAcc = 0, momAcc = 0;

    function startAuto() {
      if (reduceMotion || !autospin || touched || mode) return;
      mode = "auto"; autoAcc = 0;
      rafId = window.requestAnimationFrame(tick);
    }
    function stopAuto() {
      if (mode === "auto") { mode = null; if (rafId) cancelAnimationFrame(rafId); rafId = null; }
    }
    function startMomentum() {
      mode = "momentum"; momAcc = 0;
      rafId = window.requestAnimationFrame(tick);
    }
    function stopMomentum() {
      if (mode === "momentum") { mode = null; if (rafId) cancelAnimationFrame(rafId); rafId = null; }
    }

    // Pausar autospin fuera de pantalla / pestaña oculta (batería)
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) stopAuto();
          else if (!touched) startAuto();
        });
      }, { threshold: 0.2 }).observe(el);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopAuto();
      else if (!touched) startAuto();
    });
  }

  function boot() {
    var nodes = document.querySelectorAll("[data-viewer-360]");
    for (var i = 0; i < nodes.length; i++) initViewer(nodes[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
