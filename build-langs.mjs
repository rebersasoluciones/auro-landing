/* ============================================================
   AURO — Generador de páginas por idioma (hreflang / URLs por país)
   ------------------------------------------------------------
   La raíz `index.html` es el ORIGEN (alemán por defecto, en auro.de).
   Este script genera copias reales en /es/ e /en/ con:
     - <html lang & data-lang> por idioma (i18n.js lo respeta)
     - rutas root-relativas reescritas a ../ (assets, favicon, legales)
     - canonical + og:locale por idioma (los hreflang apuntan siempre
       a las mismas URLs absolutas, así que se heredan tal cual)
     - un script que fija el idioma guardado para que gracias.html y
       las páginas legales mantengan el idioma en toda la sesión.

   Uso:  node build-langs.mjs
   Reejecuta este script cada vez que edites index.html.
   ============================================================ */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const SRC = 'index.html';
const LOCALES = {
  es: { htmlLang: 'es', ogLocale: 'es_ES', alts: ['de_DE', 'en_US'] },
  en: { htmlLang: 'en', ogLocale: 'en_US', alts: ['de_DE', 'es_ES'] },
};

const source = readFileSync(SRC, 'utf8');

function build(lang, cfg) {
  let h = source;

  // 1) <html lang + data-lang>
  h = h.replace(/<html lang="es">/, `<html lang="${cfg.htmlLang}" data-lang="${cfg.htmlLang}">`);

  // 2) rutas root-relativas -> ../ (assets, favicon, páginas legales)
  h = h.replace(/(["'])assets\//g, `$1../assets/`);
  h = h.replace(/(href|content)="favicon\.svg"/g, `$1="../favicon.svg"`);
  h = h.replace(/href="(aviso-legal|politica-privacidad|politica-cookies|politica-redes-sociales)\.html"/g,
                `href="../$1.html"`);

  // 3) canonical por idioma (los <link rel="alternate" hreflang> se mantienen)
  h = h.replace('<link rel="canonical" href="https://auro.de/">',
                `<link rel="canonical" href="https://auro.de/${lang}/">`);

  // 4) og:locale por idioma
  h = h.replace(
    /<meta property="og:locale" content="de_DE">\s*<meta property="og:locale:alternate" content="es_ES">\s*<meta property="og:locale:alternate" content="en_US">/,
    `<meta property="og:locale" content="${cfg.ogLocale}">\n` +
    cfg.alts.map(a => `<meta property="og:locale:alternate" content="${a}">`).join('\n')
  );

  // 5) fija el idioma guardado (salvo que la URL traiga ?lang=) para que
  //    gracias.html y las legales sigan en el mismo idioma.
  const persist = `<script>try{if(!new URLSearchParams(location.search).has('lang'))localStorage.setItem('auro_lang','${cfg.htmlLang}')}catch(e){}</script>\n`;
  h = h.replace('<script src="../assets/i18n.js"></script>',
                persist + '<script src="../assets/i18n.js"></script>');

  mkdirSync(lang, { recursive: true });
  writeFileSync(`${lang}/index.html`, h, 'utf8');
  console.log(`OK  ${lang}/index.html  (${h.length} bytes)`);
}

for (const [lang, cfg] of Object.entries(LOCALES)) build(lang, cfg);
console.log('Hecho.');
