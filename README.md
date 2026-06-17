# AURO — Landing Page

Landing page de **AURO**, aceite de oliva virgen extra de Jaén (100% Arbequina), orientada al mercado alemán. Markteinführung 2026.

Estética xilográfica en verde oscuro + crema/marfil, con tipografía Barlow Condensed / DM Sans, animaciones GSAP y un formulario de captación de leads (Vormerkung) con consentimiento RGPD.

## Estructura

Sitio estático, sin build. Se sirve tal cual.

```
index.html            # Landing principal
impressum.html        # Aviso legal (§5 DDG/TMG)
datenschutz.html      # Política de privacidad (DSGVO/RGPD)
kontakt.html          # Contacto
favicon.svg           # Favicon (oliva + hoja)
laurel.svg            # Marco decorativo (laurel) — fondos oscuros
laurel-dark.svg       # Marco decorativo (laurel) — fondos claros
*.jpg / *.png         # Imágenes (lata, cosecha, ensalada, paisaje, patrón…)
```

## Desarrollo local

Cualquier servidor estático sirve. Por ejemplo:

```bash
python3 -m http.server 8000
# o
npx serve .
```

Luego abre http://localhost:8000

## Despliegue — GitHub Pages (automático)

El despliegue está automatizado con GitHub Actions (`.github/workflows/deploy.yml`):
cada `push` a `main` publica el sitio.

**Configuración inicial (una sola vez):**

1. Sube el repositorio a GitHub.
2. En **Settings → Pages → Build and deployment**, selecciona **Source: GitHub Actions**.
3. Listo. A partir de ahí, cada push a `main` ejecuta el workflow y publica en
   `https://<usuario>.github.io/<repo>/`.

Puedes ver el estado en la pestaña **Actions** y lanzarlo a mano con **Run workflow**
(evento `workflow_dispatch`).

El archivo `.nojekyll` evita el procesado por Jekyll.

### Dominio propio (opcional)

Hay una plantilla `CNAME.example` con el dominio (`auro.de`). **No se activa hasta que
lo renombres a `CNAME`** — así no interfiere con la URL `*.github.io` mientras no tengas
el dominio y el DNS listos.

**Para activarlo:**

1. Configura el DNS de tu dominio:
   - **Apex (`auro.de`)** → registros `A` a las IP de GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
     (y opcionalmente los `AAAA`: `2606:50c0:8000::153` … `8003::153`)
   - **Subdominio (`www.auro.de`)** → registro `CNAME` a `<usuario>.github.io.`
2. Renombra el archivo y haz push:
   ```bash
   git mv CNAME.example CNAME
   git commit -m "Activa dominio propio auro.de"
   git push
   ```
3. En **Settings → Pages → Custom domain**, escribe el dominio y marca **Enforce HTTPS**.

## Pendiente antes de producción

- Rellenar los datos `[entre corchetes]` en `impressum.html`, `datenschutz.html` y `kontakt.html`.
- Auto-alojar Google Fonts y GSAP (ahora vía CDN) para cumplir RGPD de forma estricta.
- Conectar el formulario a un backend / servicio de email (ahora guarda en `localStorage` y exporta CSV en local).
- Optimizar/convertir las imágenes a WebP.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
