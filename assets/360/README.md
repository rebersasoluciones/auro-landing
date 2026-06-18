# Visor 360° — AURO

El hero usa un visor 360° por **secuencia de imágenes** (no 3D / no three.js).
Es ligero, fotorrealista y encaja con el sitio estático.

## Cómo reemplazar los placeholders por tus fotos reales

1. Toma la secuencia siguiendo la guía de abajo.
2. Exporta **24 imágenes** (o 36) numeradas en orden de giro:
   ```
   assets/360/lata/frame-001.png
   assets/360/lata/frame-002.png
   ...
   assets/360/lata/frame-024.png
   ```
3. **Sobrescribe** los placeholders con esos mismos nombres. No hay que tocar código.
4. ¿Tus fotos son `.jpg`? Cambia una sola línea en `index.html`:
   `data-ext="png"` → `data-ext="jpg"`.
   ¿36 fotogramas? `data-count="24"` → `data-count="36"`.

Si falta el primer fotograma, el visor cae automáticamente a `assets/lata-auro.png`.

## Guía para fotografiar la lata (secuencia turntable)

- **Gira el producto, no la cámara.** Cámara en trípode, fija; lata sobre una base
  giratoria (plato giratorio / lazy susan).
- **Pasos iguales.** 24 fotos = una cada **15°**; 36 fotos = cada **10°** (más fluido).
  Marca el plato con cinta cada 15° para acertar el ángulo.
- **Centrado idéntico** en todos los cuadros: misma distancia, mismo encuadre, la lata
  siempre en el mismo punto. No muevas el trípode.
- **Iluminación constante.** Luz difusa y fija (caja de luz o ventana indirecta).
  Evita sombras que se muevan o reflejos cambiantes.
- **Exposición y balance de blancos manuales** (bloqueados), iguales en toda la serie.
- **Fondo limpio**, blanco o liso (luego se puede recortar). Mejor aún: fondo transparente
  (PNG) si recortas la lata.
- **Misma resolución** en todas; idealmente formato vertical estable (los placeholders son 560×720).
- Empieza por la cara principal (etiqueta de frente) = `frame-001`.

## Opciones del visor (atributos `data-*` en `index.html`)

| Atributo        | Por defecto            | Qué hace                                  |
|-----------------|------------------------|-------------------------------------------|
| `data-path`     | `assets/360/lata/`     | Carpeta de los fotogramas                 |
| `data-prefix`   | `frame-`               | Prefijo del nombre                        |
| `data-count`    | `24`                   | Nº de fotogramas                          |
| `data-pad`      | `3`                    | Dígitos del número (3 → `frame-001`)      |
| `data-ext`      | `png`                  | Extensión (`png` o `jpg`)                 |
| `data-autospin` | `true`                 | Giro automático hasta la 1ª interacción   |
| `data-reverse`  | `false`                | Invierte el sentido del arrastre          |
| `data-fallback` | `assets/lata-auro.png` | Imagen si la secuencia no carga           |

Interacción: arrastrar (ratón/táctil), flechas ←/→ (teclado) y giro automático.
Respeta `prefers-reduced-motion` y pausa el giro fuera de pantalla.
