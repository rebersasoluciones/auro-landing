# Modelo 3D de la lata (Blender → web)

Aquí va el modelo 3D de la lata para el visor interactivo de la web.

## 1) Exportar desde Blender a `.glb`

`Archivo → Exportar → glTF 2.0 (.glb/.gltf)` y usa estos ajustes:

- **Formato:** `glTF Binary (.glb)` ← un solo archivo, con texturas embebidas.
- **Incluir:** si seleccionas solo la lata, marca *Selected Objects*; si no, exporta todo.
- **Transform:** *+Y Up* (por defecto, es lo correcto para web).
- **Geometría / Materiales:** *Materials = Export*, *Images = Automatic* (las mete dentro del .glb).
  Marca *Apply Modifiers* y *UVs / Normals* (y *Tangents* si usas normal maps).
- **Compresión (opcional):** activa *Draco* para que pese menos (la web lo soporta).

### Antes de exportar (importante)
- **Aplica transformaciones**: selecciona la lata → `Ctrl+A → All Transforms`.
- **Centra** la lata cerca del origen (0,0,0) y a tamaño real (~16 cm de alto está bien).
- **Materiales procedurales** (nodos de ruido, etc.) **no se exportan** tal cual: glTF solo
  entiende PBR *Principled BSDF*. Si usaste shaders procedurales, **hornéalos a texturas**
  (Base Color, Metallic, Roughness, Normal) antes de exportar. Si usaste Principled BSDF
  con imágenes, va perfecto.
- **No hace falta** exportar luces ni el world: la web pone su propia iluminación/reflejos.

## 2) Peso objetivo
Ideal para web: **1–15 MB**. Si tu `.glb` sale más pesado (modelo de render con mucha
geometría/texturas 4K), súbelo igual y yo lo **optimizo** (Draco/meshopt, texturas a 2K).
Límite duro de GitHub por archivo: 100 MB.

## 3) Cómo subir el `.glb`
En GitHub, en la rama `claude/busy-wright-9njief`, entra a la carpeta `assets/3d/`
(esta misma) → botón **`Add file` → `Upload files`** → arrastra `lata.glb` → *Commit*
a la rama. (Truco: en la barra de direcciones cambia `/new/` por `/upload/`.)

Cuando esté subido, avísame y lo monto con **model-viewer** (drag / zoom / auto-rota / AR)
y lo afinamos (luz, sombra de contacto) antes de integrarlo en el hero.
