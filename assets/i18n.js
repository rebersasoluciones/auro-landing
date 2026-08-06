/* ============================================================
   AURO — i18n (ES · EN · DE)
   Traduce toda la web sin duplicar HTML: un diccionario cuya
   clave es el texto en español. Un selector en la cabecera
   permite elegir idioma; la elección se guarda en el navegador.
   Los scripts del mapa y de la cata leen de window.AuroI18n.t().
   ============================================================ */
(function () {
  'use strict';

  var NBSP = ' ';

  var DICT = {
    en: {
      /* Ideas para tu mesa (recetas) */
      "En crudo": "Finishing oil",
      "Un hilo de AURO lo cambia todo": "A drizzle of AURO changes everything",
      "Recién abierto, en frío: sobre una tostada, unas hojas o unas verduras a la brasa. Un chorro final que realza lo que ya tienes.": "Freshly opened, cold: over toast, greens or grilled vegetables. A finishing drizzle that lifts what you already have.",
      "Tostadas y pan": "Toast & bread",
      "Sobre pan caliente, con tomate o solo. El desayuno más sencillo y el mejor.": "On warm bread, with tomato or on its own. The simplest breakfast — and the best.",
      "Ensaladas y verduras": "Salads & vegetables",
      "Un chorro final sobre hojas, tomate o verduras asadas. Aliño y aroma al instante.": "A final drizzle over leaves, tomato or roasted vegetables. Dressing and aroma in an instant.",
      "Pan con tomate": "Bread with tomato",
      "Pescados y carnes a la brasa": "Grilled fish & meat",
      "Cremas y hummus": "Soups & hummus",
      "Pasta y arroces": "Pasta & rice",
      "Quesos": "Cheeses",
      "Un buen chorro final": "A generous finishing drizzle",
      "Tostada de pan con un chorro de aceite de oliva virgen extra AURO": "Toast drizzled with AURO extra virgin olive oil",
      "Ensalada fresca aliñada con aceite de oliva virgen extra AURO": "Fresh salad dressed with AURO extra virgin olive oil",
      "Más ideas para usar AURO": "More ways to use AURO",
      /* Ajustes 2026 (lista de espera, envíos, media) */
      "Apúntate y te avisamos en cuanto salga la primera cosecha. Los primeros de la lista entran antes que nadie.": "Sign up and we'll let you know the moment the first harvest is out. The first on the list get in before anyone else.",
      "Edición limitada de 1.000 latas": "Limited edition of 1,000 tins",
      "Primera cosecha de octubre · latas numeradas de un lote único, sin reposición.": "First harvest in October · numbered tins from a single batch, no restock.",
      "personas ya se han inscrito.": "people have already signed up.",
      "¿Cómo y dónde hacéis los envíos?": "How and where do you ship?",
      "Enviamos a domicilio a toda Europa. Prepararemos los envíos cuando abramos la venta; los detalles de plazos y gastos por país llegarán primero a quienes estén en la lista.": "We ship to homes across all of Europe. We'll arrange shipping when sales open; details on delivery times and costs per country will reach those on the list first.",
      "Olivares centenarios de Sierra Mágina, Jaén, al atardecer": "Centuries-old olive groves of Sierra Mágina, Jaén, at sunset",
      "Aceite de oliva virgen extra AURO recién elaborado, vertido en copa de cata": "Freshly made AURO extra virgin olive oil poured into a tasting glass",
      "Cosecha temprana 100% Picual, recién extraída en frío.": "Early-harvest 100% Picual, freshly cold-extracted.",
      "Lata de AURO 500 ml, modelo 3D interactivo": "AURO tin 500 ml, interactive 3D model",
      /* head / nav / hero */
      "AURO — Aceite de Oliva Virgen Extra · Sierra Mágina, Jaén": "AURO — Extra Virgin Olive Oil · Sierra Mágina, Jaén",
      "Origen": "Origin",
      "Cosecha": "Harvest",
      "Proceso": "Process",
      "Lista de espera": "Waitlist",
      "Contacto": "Contact",
      "Únete a la lista": "Join the list",
      "Ver en tu cocina (AR)": "View in your kitchen (AR)",
      "↔ Gira la lata": "↔ Turn the tin",
      "Prelanzamiento · Cosecha 2026": "Pre-launch · 2026 Harvest",
      "Aceite de oliva virgen extra de cosecha temprana": "Early-harvest extra virgin olive oil",
      "100% Picual. Un aceite intenso, elegante y profundamente mediterráneo.": "100% Picual. An intense, elegant and deeply Mediterranean oil.",
      "Conocer el origen": "Discover the origin",
      /* origen */
      "El origen": "The origin",
      "en cada gota": "in every drop",
      "“Un aceite pensado para quien entiende que el sabor también puede contar un lugar.”": "“An oil made for those who understand that flavour can tell of a place.”",
      "AURO nace en un paisaje de olivos, luz seca y tierra noble. Cosecha temprana, recogida en el momento exacto, para capturar el verdor y la fuerza de la aceituna Picual.": "AURO is born in a landscape of olive trees, dry light and noble soil. An early harvest, picked at exactly the right moment, to capture the greenness and strength of the Picual olive.",
      "Leer la historia de AURO": "Read the AURO story",
      /* mapa */
      "El viaje del origen": "The journey of origin",
      "De España a nuestra finca": "From Spain to our estate",
      "España produce ~la mitad del aceite del mundo y Jaén es su capital. Recorre el viaje, en 3D, hasta nuestro olivar de montaña.": "Spain produces ~half of the world's olive oil and Jaén is its capital. Follow the journey, in 3D, to our mountain grove.",
      "España": "Spain",
      "Andalucía": "Andalusia",
      "La finca": "The estate",
      /* atributos */
      "Carácter": "Character",
      "Lo que hace único a AURO": "What makes AURO unique",
      "La variedad más noble de Jaén. Robusta, frutada e inconfundible.": "The noblest variety of Jaén. Robust, fruity and unmistakable.",
      "Cosecha temprana": "Early harvest",
      "Recogida cuando la aceituna aún está verde. Máximos polifenoles.": "Picked while the olive is still green. Maximum polyphenols.",
      "Extracción en frío": "Cold extraction",
      "Prensado por debajo de 27 °C. Se conservan aroma y nutrientes.": "Pressed below 27 °C. Aroma and nutrients preserved.",
      "Origen Jaén": "From Jaén",
      "Sierra Mágina, corazón olivarero del mundo. Trazabilidad total.": "Sierra Mágina, the world's olive-growing heart. Full traceability.",
      /* cata */
      "Análisis & cata": "Analysis & tasting",
      "La calidad, en números": "Quality, in numbers",
      "Cosecha temprana 100% Picual. Esto es, de verdad, lo que hay dentro de cada lata.": "Early-harvest 100% Picual. This is, truly, what's inside every tin.",
      "Polifenoles": "Polyphenols",
      "Cosecha temprana: máximos antioxidantes (>250 = saludable).": "Early harvest: maximum antioxidants (>250 = healthy).",
      "Acidez": "Acidity",
      "Muy por debajo del límite AOVE (≤0,8%). Menos = más puro.": "Well below the EVOO limit (≤0.8%). Less = purer.",
      "Peróxidos": "Peroxides",
      "Frescura óptima (límite legal ≤20).": "Optimal freshness (legal limit ≤20).",
      "* Valores de ejemplo de la cosecha 2026. Sustitúyelos por los de tu analítica.": "* Sample values for the 2026 harvest. Replace them with your own lab analysis.",
      "Frutado": "Fruity",
      "Amargo": "Bitter",
      "Picante": "Pungent",
      "Verde": "Green",
      "Almendra": "Almond",
      "Manzana": "Apple",
      /* proceso */
      "El proceso": "The process",
      "Del árbol a la lata, en frío": "From tree to tin, cold",
      "Seis pasos y pocas horas.": "Six steps and a few hours.",
      "Desliza para verlo →": "Swipe to see it →",
      "Recolección": "Harvesting",
      "Recolección temprana": "Early harvesting",
      "Recogemos la Picual aún verde, en octubre, en su punto de máxima fuerza y aroma.": "We pick the Picual while still green, in October, at its peak of strength and aroma.",
      "Al molino": "To the mill",
      "Al molino en horas": "To the mill within hours",
      "De la rama al molino en menos de un día. Limpiamos y lavamos la aceituna recién cogida.": "From branch to mill in under a day. We clean and wash the freshly picked olives.",
      "Molturación": "Milling",
      "Molemos la aceituna entera, hueso incluido, hasta obtener una pasta homogénea.": "We mill the whole olive, stone included, into a smooth paste.",
      "Batido en frío": "Cold malaxation",
      "Batimos la pasta lentamente": "We slowly malax the paste",
      "por debajo de 27 °C": "below 27 °C",
      "para preservar polifenoles y aromas.": "to preserve polyphenols and aromas.",
      "Extracción en frío · <27 °C": "Cold extraction · <27 °C",
      "Extracción": "Extraction",
      "Extracción por centrifugado": "Extraction by centrifuge",
      "Separamos el aceite por centrifugación, sin calor y sin disolventes. Solo zumo de aceituna.": "We separate the oil by centrifugation — no heat, no solvents. Just olive juice.",
      "Envasado": "Bottling",
      "Decantación y envasado": "Settling and bottling",
      "Reposa, se clarifica y se envasa en lata, protegido de la luz para que llegue como recién hecho.": "It rests, clarifies and is packed in a tin, shielded from light so it arrives as fresh as just made.",
      "Cosecha temprana. 100% Picual. Sin atajos.": "Early harvest. 100% Picual. No shortcuts.",
      /* lista de espera */
      "Sé de los primeros": "Be among the first",
      "en probar AURO": "to taste AURO",
      "Apúntate y coge tu puesto en la lista. Te avisamos en cuanto salga la primera cosecha.": "Sign up and grab your spot on the list. We'll let you know as soon as the first harvest is out.",
      "Tu puesto en la lista": "Your spot on the list",
      "Las primeras 1.000 se llevan la cosecha 2026 numerada": "The first 1,000 get the numbered 2026 harvest",
      "Producción limitada": "Limited production",
      "Primera cosecha 2026 · solo": "First harvest 2026 · only",
      "1.000 latas numeradas": "1,000 numbered tins",
      ". Acceso anticipado para los primeros 500.": ". Early access for the first 500.",
      "Plazas casi agotadas — quedan pocas": "Almost sold out — few spots left",
      "Las 500 plazas de acceso anticipado están llenas.": "All 500 early-access spots are taken.",
      "Ya en la lista de espera:": "Already on the waitlist:",
      "Regalo para los primeros:": "Gift for the first ones:",
      "acceso anticipado a una IA de recetas creada para cocinar con AURO.": "early access to a recipe AI built for cooking with AURO.",
      "Email": "Email",
      "Nombre": "Name",
      "(opcional)": "(optional)",
      "Acepto recibir un email cuando AURO esté disponible y el tratamiento de mis datos según la": "I agree to receive an email when AURO is available and to the processing of my data under the",
      "política de privacidad": "privacy policy",
      ". Puedo darme de baja en cualquier momento.": ". I can unsubscribe at any time.",
      "Sin spam. Solo un email cuando arranque.": "No spam. Just one email at launch.",
      /* footer countdown */
      "Primera cosecha · 1 nov 2026": "First harvest · 1 Nov 2026",
      "La cuenta atrás ha empezado": "The countdown has begun",
      "Días": "Days",
      "Horas": "Hours",
      "Min": "Min",
      "Seg": "Sec",
      /* footer */
      "Aceite de oliva virgen extra de cosecha temprana. Elaborado en Sierra Mágina, Jaén.": "Early-harvest extra virgin olive oil. Made in Sierra Mágina, Jaén.",
      "Explorar": "Explore",
      "Mayoristas": "Wholesale",
      "Legal": "Legal",
      "Aviso legal": "Legal notice",
      "Política de privacidad": "Privacy policy",
      "Política de cookies": "Cookie policy",
      "Política de redes sociales": "Social media policy",
      "Aceite de oliva virgen extra · Sierra Mágina · Jaén": "Extra virgin olive oil · Sierra Mágina · Jaén",
      "© 2026 AURO OLIVE S.L. · Todos los derechos reservados": "© 2026 AURO OLIVE S.L. · All rights reserved",
      /* attrs */
      "Tu nombre": "Your name",
      "Lata de AURO — aceite de oliva virgen extra 500 ml, modelo 3D interactivo": "AURO tin — extra virgin olive oil 500 ml, interactive 3D model",
      "Detalle del envase AURO": "AURO packaging detail",
      "Recolección de la aceituna Picual": "Harvesting the Picual olive",
      "Aceituna recién recogida camino del molino": "Freshly picked olives on the way to the mill",
      "Molienda de la aceituna": "Milling the olives",
      "Batido de la pasta de aceituna en frío": "Cold malaxation of the olive paste",
      "Separación del aceite por centrifugado": "Separating the oil by centrifuge",
      "Envasado del aceite en lata": "Packing the oil into a tin",
      "AURO — Inicio": "AURO — Home",
      "Principal": "Main",
      "Abrir menú": "Open menu",
      "Niveles del viaje del origen": "Origin journey levels",
      "Mapa 3D de relieve: viaje del origen del aceite de España a Sierra Mágina": "3D relief map: the oil's journey of origin from Spain to Sierra Mágina",
      "Perfil de cata: frutado, amargo, picante, verde, almendra y manzana": "Tasting profile: fruity, bitter, pungent, green, almond and apple",
      "El proceso de elaboración de AURO": "AURO's production process",
      "Paso 1 de 6": "Step 1 of 6", "Paso 2 de 6": "Step 2 of 6", "Paso 3 de 6": "Step 3 of 6",
      "Paso 4 de 6": "Step 4 of 6", "Paso 5 de 6": "Step 5 of 6", "Paso 6 de 6": "Step 6 of 6",
      "Paso anterior": "Previous step", "Ir a un paso": "Go to a step", "Paso siguiente": "Next step",
      "Cosecha temprana, 100% Picual": "Early harvest, 100% Picual",
      "Cuenta atrás para la primera cosecha de AURO": "Countdown to AURO's first harvest",
      /* mapa.js */
      "España es la 1ª productora mundial de aceite de oliva (~50% del total).": "Spain is the world's leading olive oil producer (~50% of the total).",
      "Andalucía concentra cerca del 80% del aceite de España.": "Andalusia accounts for nearly 80% of Spain's olive oil.",
      "Jaén: la capital mundial del olivar, con más de 60 millones de olivos.": "Jaén: the world capital of olive groves, with over 60 million olive trees.",
      "Sierra Mágina: aceite de montaña con Denominación de Origen.": "Sierra Mágina: mountain oil with a Protected Designation of Origin.",
      "Aquí nace AURO: 100% Picual, cosecha temprana.": "AURO is born here: 100% Picual, early harvest.",
      "<strong>AURO · Olivar de Sierra Mágina</strong><br>100% Picual · cosecha temprana<br>": "<strong>AURO · Sierra Mágina olive grove</strong><br>100% Picual · early harvest<br>",
      "Altitud ~": "Altitude ~",
      " m · Sierra Mágina, Jaén": " m · Sierra Mágina, Jaén",
      /* gracias.html */
      "¡Estás dentro! · AURO": "You're in! · AURO",
      "Estás en la lista": "You're on the list",
      "¡Bienvenido a AURO!": "Welcome to AURO!",
      "Hemos guardado tu sitio. Serás de los primeros en probar la primera cosecha 2026: 100% Picual de Sierra Mágina, edición numerada.": "We've saved your spot. You'll be among the first to taste the 2026 harvest: 100% Picual from Sierra Mágina, a numbered edition.",
      "Tu regalo: IA de recetas AURO": "Your gift: AURO recipe AI",
      "Como parte de los primeros, tendrás acceso anticipado a una inteligencia artificial especializada en recetas para sacarle todo el partido a este aceite.": "As one of the first, you'll get early access to an AI specialised in recipes to make the most of this oil.",
      "Te enviaremos el acceso por email antes del lanzamiento.": "We'll send you access by email before launch.",
      "Volver a la web": "Back to the site",
      "Ver cómo se hace": "See how it's made",
      "Revisa tu bandeja de entrada (y spam) para confirmar que somos nosotros. Sin spam: solo un email cuando arranque.": "Check your inbox (and spam) to confirm it's us. No spam: just one email at launch.",
      /* FAQ */
      "Preguntas frecuentes": "Frequently asked questions",
      "Todo lo que quieres saber antes de apuntarte": "Everything you want to know before signing up",
      "¿Cuándo estará disponible AURO?": "When will AURO be available?",
      "La primera cosecha sale en 2026. Quienes estén en la lista serán los primeros en recibir el aviso y tendrán acceso anticipado antes que nadie.": "The first harvest arrives in 2026. Those on the list will be the first to be notified and get early access before anyone else.",
      "¿Apuntarme me compromete a algo?": "Does signing up commit me to anything?",
      "No. Apuntarte es gratis y sin compromiso: solo te avisamos cuando salga la primera cosecha. Puedes darte de baja cuando quieras.": "No. Signing up is free and with no commitment: we only notify you when the first harvest is out. You can unsubscribe whenever you want.",
      "¿Cuánto costará?": "How much will it cost?",
      "Habrá un precio de lanzamiento exclusivo para la lista. Lo comunicaremos por email antes de abrir la venta, para que los primeros tengan la mejor condición.": "There will be a launch price exclusive to the list. We'll announce it by email before sales open, so the first ones get the best deal.",
      "¿Qué es la «cosecha temprana»?": "What is “early harvest”?",
      "Recogemos la aceituna Picual aún verde, en octubre. Así el aceite conserva más polifenoles (antioxidantes), más aroma y un amargor y picor nobles: el sello de un AOVE premium.": "We pick the Picual olive while still green, in October. This keeps more polyphenols (antioxidants), more aroma and a noble bitterness and pungency: the mark of a premium EVOO.",
      "¿Cómo se hará el envío?": "How will shipping work?",
      "Prepararemos el envío a domicilio cuando abramos la venta. Los detalles de zonas, plazos y gastos llegarán primero a quienes estén en la lista.": "We'll arrange home delivery when sales open. Details on areas, times and costs will reach those on the list first.",
      "¿En qué consiste el regalo de la IA de recetas?": "What is the recipe AI gift?",
      "Los primeros en apuntarse tendrán acceso anticipado a una inteligencia artificial especializada en recetas para sacarle todo el partido a AURO en la cocina.": "The first to sign up will get early access to an AI specialised in recipes to make the most of AURO in the kitchen.",
      /* Referidos (gracias) */
      "Sube en la lista: invita a tus amigos": "Move up the list: invite your friends",
      "Comparte tu enlace y, por cada amigo que se apunte, subes puestos hacia el acceso anticipado.": "Share your link — for every friend who signs up, you move up toward early access.",
      "Copiar enlace": "Copy link",
      "¡Enlace copiado!": "Link copied!",
      "Me apunto a la lista de espera de AURO, el aceite de oliva virgen extra 100% Picual de cosecha temprana de Sierra Mágina. Apúntate tú también:": "I've joined the AURO waitlist — the 100% Picual early-harvest extra virgin olive oil from Sierra Mágina. Join too:",
      /* La lata (explorador) */
      "La lata": "The tin",
      "Por qué AURO va en lata": "Why AURO comes in a tin",
      "Toca cada punto y descubre qué hace especial a esta lata.": "Tap each point and discover what makes this tin special.",
      "Aluminio": "Aluminium",
      "D.O.P. Sierra Mágina": "PDO Sierra Mágina",
      "Lata de aluminio: 0% luz": "Aluminium tin: 0% light",
      "La luz es el peor enemigo del aceite: lo oxida y le roba aroma y antioxidantes. La lata bloquea el 100% de la luz y el oxígeno, por eso los polifenoles y la vitamina E llegan intactos a tu mesa: más sabor y todo su valor saludable. Además, el aluminio es ligero, irrompible y se recicla una y otra vez sin perder calidad.": "Light is olive oil's worst enemy: it oxidises the oil and strips away its aroma and antioxidants. The tin blocks 100% of light and oxygen, so the polyphenols and vitamin E reach your table intact — more flavour and all its health benefits. Plus, aluminium is light, unbreakable and endlessly recyclable without losing quality.",
      "Denominación de Origen Protegida": "Protected Designation of Origin",
      "Sierra Mágina, en el corazón de Jaén, cuenta con su propia D.O.P.: un sello europeo que garantiza el origen, la variedad y la calidad del aceite de esta sierra. Altitud, frío y sol que dan un aceite más aromático y equilibrado.": "Sierra Mágina, in the heart of Jaén, has its own PDO: a European seal that guarantees the origin, variety and quality of this mountain oil. Altitude, cold and sun give a more aromatic, balanced oil.",
      "100% Picual, la reina de Jaén": "100% Picual, the queen of Jaén",
      "La variedad más noble y estable de Jaén. Rica en antioxidantes, de frutado verde intenso, con un amargor y un picor nobles que delatan un aceite vivo.": "The noblest and most stable variety in Jaén. Rich in antioxidants, with an intense green fruitiness and a noble bitterness and pungency that reveal a living oil.",
      "Cosecha temprana, recogida en verde": "Early harvest, picked green",
      "Recolectada en octubre, aún verde. Da menos aceite por aceituna, pero conserva los máximos polifenoles y aroma. Calidad por encima de cantidad.": "Harvested in October, still green. It yields less oil per olive but keeps maximum polyphenols and aroma. Quality over quantity.",
      "500 ml, la medida justa": "500 ml, just the right size",
      "El formato perfecto para disfrutarlo fresco en semanas, no en meses. Consérvalo en un lugar fresco y oscuro y úsalo en crudo para notarlo todo.": "The perfect size to enjoy it fresh in weeks, not months. Keep it in a cool, dark place and use it raw to taste it all.",
      "Origen y calidad": "Origin & quality",
      "Producto de España": "Product of Spain",
      "Primera cosecha 2026 · plazas limitadas": "First harvest 2026 · limited spots",
      /* legal chrome */
      "← Volver": "← Back",
      "AURO OLIVE S.L. · última actualización: julio de 2026": "AURO OLIVE S.L. · last updated: July 2026",
      "Contenido pendiente de publicación": "Content coming soon",
      "Traducción orientativa. La versión en español es la única legalmente vinculante.": "Informational translation. Only the Spanish version is legally binding.",
      "Idioma": "Language"
    },

    de: {
      /* Ideas para tu mesa (recetas) */
      "En crudo": "Zum Verfeinern",
      "Un hilo de AURO lo cambia todo": "Ein Spritzer AURO verändert alles",
      "Recién abierto, en frío: sobre una tostada, unas hojas o unas verduras a la brasa. Un chorro final que realza lo que ya tienes.": "Frisch geöffnet, kalt: über Brot, Blattsalat oder gegrilltem Gemüse. Ein letzter Spritzer, der hervorhebt, was du schon hast.",
      "Tostadas y pan": "Brot & Toast",
      "Sobre pan caliente, con tomate o solo. El desayuno más sencillo y el mejor.": "Auf warmem Brot, mit Tomate oder pur. Das einfachste Frühstück – und das beste.",
      "Ensaladas y verduras": "Salate & Gemüse",
      "Un chorro final sobre hojas, tomate o verduras asadas. Aliño y aroma al instante.": "Ein letzter Spritzer über Blattsalat, Tomate oder Ofengemüse. Dressing und Aroma im Nu.",
      "Pan con tomate": "Brot mit Tomate",
      "Pescados y carnes a la brasa": "Fisch & Fleisch vom Grill",
      "Cremas y hummus": "Cremesuppen & Hummus",
      "Pasta y arroces": "Pasta & Reis",
      "Quesos": "Käse",
      "Un buen chorro final": "Ein großzügiger Schuss zum Schluss",
      "Tostada de pan con un chorro de aceite de oliva virgen extra AURO": "Brot mit einem Spritzer AURO nativem Olivenöl extra",
      "Ensalada fresca aliñada con aceite de oliva virgen extra AURO": "Frischer Salat mit AURO nativem Olivenöl extra",
      "Más ideas para usar AURO": "Weitere Ideen für AURO",
      /* Ajustes 2026 (lista de espera, envíos, media) */
      "Apúntate y te avisamos en cuanto salga la primera cosecha. Los primeros de la lista entran antes que nadie.": "Trag dich ein und wir benachrichtigen dich, sobald die erste Ernte da ist. Die Ersten auf der Liste kommen vor allen anderen dran.",
      "Edición limitada de 1.000 latas": "Limitierte Edition von 1.000 Dosen",
      "Primera cosecha de octubre · latas numeradas de un lote único, sin reposición.": "Erste Ernte im Oktober · nummerierte Dosen aus einer einzigen Charge, ohne Nachproduktion.",
      "personas ya se han inscrito.": "Personen haben sich bereits eingetragen.",
      "¿Cómo y dónde hacéis los envíos?": "Wie und wohin versendet ihr?",
      "Enviamos a domicilio a toda Europa. Prepararemos los envíos cuando abramos la venta; los detalles de plazos y gastos por país llegarán primero a quienes estén en la lista.": "Wir liefern nach Hause in ganz Europa. Wir organisieren den Versand, sobald der Verkauf startet; Details zu Lieferzeiten und Kosten je Land erhalten zuerst die Personen auf der Liste.",
      "Olivares centenarios de Sierra Mágina, Jaén, al atardecer": "Jahrhundertealte Olivenhaine der Sierra Mágina, Jaén, bei Sonnenuntergang",
      "Aceite de oliva virgen extra AURO recién elaborado, vertido en copa de cata": "Frisch hergestelltes AURO natives Olivenöl extra, in ein Verkostungsglas gegossen",
      "Cosecha temprana 100% Picual, recién extraída en frío.": "Frühe Ernte, 100% Picual, frisch kalt extrahiert.",
      "Lata de AURO 500 ml, modelo 3D interactivo": "AURO-Dose 500 ml, interaktives 3D-Modell",
      "AURO — Aceite de Oliva Virgen Extra · Sierra Mágina, Jaén": "AURO — Natives Olivenöl Extra · Sierra Mágina, Jaén",
      "Origen": "Herkunft",
      "Cosecha": "Ernte",
      "Proceso": "Verfahren",
      "Lista de espera": "Warteliste",
      "Contacto": "Kontakt",
      "Únete a la lista": "Auf die Liste",
      "Ver en tu cocina (AR)": "In deiner Küche ansehen (AR)",
      "↔ Gira la lata": "↔ Dose drehen",
      "Prelanzamiento · Cosecha 2026": "Vorverkauf · Ernte 2026",
      "Aceite de oliva virgen extra de cosecha temprana": "Natives Olivenöl extra aus früher Ernte",
      "100% Picual. Un aceite intenso, elegante y profundamente mediterráneo.": "100% Picual. Ein intensives, elegantes und zutiefst mediterranes Öl.",
      "Conocer el origen": "Den Ursprung entdecken",
      "El origen": "Der Ursprung",
      "en cada gota": "in jedem Tropfen",
      "“Un aceite pensado para quien entiende que el sabor también puede contar un lugar.”": "„Ein Öl für alle, die verstehen, dass Geschmack auch von einem Ort erzählen kann.“",
      "AURO nace en un paisaje de olivos, luz seca y tierra noble. Cosecha temprana, recogida en el momento exacto, para capturar el verdor y la fuerza de la aceituna Picual.": "AURO entsteht in einer Landschaft aus Olivenbäumen, trockenem Licht und edler Erde. Frühe Ernte, im genau richtigen Moment gepflückt, um das Grün und die Kraft der Picual-Olive einzufangen.",
      "Leer la historia de AURO": "Die Geschichte von AURO lesen",
      "El viaje del origen": "Die Reise des Ursprungs",
      "De España a nuestra finca": "Von Spanien zu unserem Gut",
      "España produce ~la mitad del aceite del mundo y Jaén es su capital. Recorre el viaje, en 3D, hasta nuestro olivar de montaña.": "Spanien produziert ~die Hälfte des Olivenöls der Welt und Jaén ist seine Hauptstadt. Verfolge die Reise in 3D bis zu unserem Bergolivenhain.",
      "España": "Spanien",
      "Andalucía": "Andalusien",
      "La finca": "Das Gut",
      "Carácter": "Charakter",
      "Lo que hace único a AURO": "Was AURO einzigartig macht",
      "La variedad más noble de Jaén. Robusta, frutada e inconfundible.": "Die edelste Sorte Jaéns. Robust, fruchtig und unverwechselbar.",
      "Cosecha temprana": "Frühe Ernte",
      "Recogida cuando la aceituna aún está verde. Máximos polifenoles.": "Geerntet, wenn die Olive noch grün ist. Höchster Polyphenolgehalt.",
      "Extracción en frío": "Kaltextraktion",
      "Prensado por debajo de 27 °C. Se conservan aroma y nutrientes.": "Pressung unter 27 °C. Aroma und Nährstoffe bleiben erhalten.",
      "Origen Jaén": "Herkunft Jaén",
      "Sierra Mágina, corazón olivarero del mundo. Trazabilidad total.": "Sierra Mágina, das Olivenherz der Welt. Vollständige Rückverfolgbarkeit.",
      "Análisis & cata": "Analyse & Verkostung",
      "La calidad, en números": "Qualität in Zahlen",
      "Cosecha temprana 100% Picual. Esto es, de verdad, lo que hay dentro de cada lata.": "Frühe Ernte, 100% Picual. Das ist wirklich in jeder Dose.",
      "Polifenoles": "Polyphenole",
      "Cosecha temprana: máximos antioxidantes (>250 = saludable).": "Frühe Ernte: maximale Antioxidantien (>250 = gesund).",
      "Acidez": "Säuregehalt",
      "Muy por debajo del límite AOVE (≤0,8%). Menos = más puro.": "Weit unter dem Grenzwert für natives Öl extra (≤0,8%). Weniger = reiner.",
      "Peróxidos": "Peroxide",
      "Frescura óptima (límite legal ≤20).": "Optimale Frische (gesetzl. Grenzwert ≤20).",
      "* Valores de ejemplo de la cosecha 2026. Sustitúyelos por los de tu analítica.": "* Beispielwerte der Ernte 2026. Durch deine eigene Laboranalyse ersetzen.",
      "Frutado": "Fruchtig",
      "Amargo": "Bitter",
      "Picante": "Scharf",
      "Verde": "Grün",
      "Almendra": "Mandel",
      "Manzana": "Apfel",
      "El proceso": "Das Verfahren",
      "Del árbol a la lata, en frío": "Vom Baum in die Dose, kalt",
      "Seis pasos y pocas horas.": "Sechs Schritte, wenige Stunden.",
      "Desliza para verlo →": "Wischen zum Ansehen →",
      "Recolección": "Ernte",
      "Recolección temprana": "Frühe Ernte",
      "Recogemos la Picual aún verde, en octubre, en su punto de máxima fuerza y aroma.": "Wir ernten die Picual noch grün, im Oktober, auf dem Höhepunkt von Kraft und Aroma.",
      "Al molino": "Zur Mühle",
      "Al molino en horas": "Zur Mühle in Stunden",
      "De la rama al molino en menos de un día. Limpiamos y lavamos la aceituna recién cogida.": "Vom Zweig zur Mühle in unter einem Tag. Wir reinigen und waschen die frisch geernteten Oliven.",
      "Molturación": "Mahlen",
      "Molemos la aceituna entera, hueso incluido, hasta obtener una pasta homogénea.": "Wir mahlen die ganze Olive samt Kern zu einer gleichmäßigen Paste.",
      "Batido en frío": "Kaltes Kneten",
      "Batimos la pasta lentamente": "Wir kneten die Paste langsam",
      "por debajo de 27 °C": "unter 27 °C",
      "para preservar polifenoles y aromas.": "um Polyphenole und Aromen zu bewahren.",
      "Extracción en frío · <27 °C": "Kaltextraktion · <27 °C",
      "Extracción": "Extraktion",
      "Extracción por centrifugado": "Extraktion durch Zentrifuge",
      "Separamos el aceite por centrifugación, sin calor y sin disolventes. Solo zumo de aceituna.": "Wir trennen das Öl durch Zentrifugation — ohne Wärme, ohne Lösungsmittel. Nur Olivensaft.",
      "Envasado": "Abfüllung",
      "Decantación y envasado": "Klärung und Abfüllung",
      "Reposa, se clarifica y se envasa en lata, protegido de la luz para que llegue como recién hecho.": "Es ruht, klärt sich und wird in die Dose gefüllt, lichtgeschützt, damit es frisch wie eben gemacht ankommt.",
      "Cosecha temprana. 100% Picual. Sin atajos.": "Frühe Ernte. 100% Picual. Keine Abkürzungen.",
      "Sé de los primeros": "Sei unter den Ersten,",
      "en probar AURO": "die AURO probieren",
      "Apúntate y coge tu puesto en la lista. Te avisamos en cuanto salga la primera cosecha.": "Trag dich ein und sichere dir deinen Platz auf der Liste. Wir benachrichtigen dich, sobald die erste Ernte da ist.",
      "Tu puesto en la lista": "Dein Platz auf der Liste",
      "Las primeras 1.000 se llevan la cosecha 2026 numerada": "Die ersten 1.000 erhalten die nummerierte Ernte 2026",
      "Producción limitada": "Limitierte Produktion",
      "Primera cosecha 2026 · solo": "Erste Ernte 2026 · nur",
      "1.000 latas numeradas": "1.000 nummerierte Dosen",
      ". Acceso anticipado para los primeros 500.": ". Früher Zugang für die ersten 500.",
      "Plazas casi agotadas — quedan pocas": "Fast ausverkauft — nur noch wenige Plätze",
      "Las 500 plazas de acceso anticipado están llenas.": "Alle 500 Plätze für den frühen Zugang sind vergeben.",
      "Ya en la lista de espera:": "Bereits auf der Warteliste:",
      "Regalo para los primeros:": "Geschenk für die Ersten:",
      "acceso anticipado a una IA de recetas creada para cocinar con AURO.": "früher Zugang zu einer Rezept-KI, die fürs Kochen mit AURO gemacht ist.",
      "Email": "E-Mail",
      "Nombre": "Name",
      "(opcional)": "(optional)",
      "Acepto recibir un email cuando AURO esté disponible y el tratamiento de mis datos según la": "Ich möchte eine E-Mail erhalten, sobald AURO verfügbar ist, und stimme der Verarbeitung meiner Daten gemäß der",
      "política de privacidad": "Datenschutzerklärung",
      ". Puedo darme de baja en cualquier momento.": " zu. Ich kann mich jederzeit abmelden.",
      "Sin spam. Solo un email cuando arranque.": "Kein Spam. Nur eine E-Mail zum Start.",
      "Primera cosecha · 1 nov 2026": "Erste Ernte · 1. Nov 2026",
      "La cuenta atrás ha empezado": "Der Countdown läuft",
      "Días": "Tage",
      "Horas": "Std.",
      "Min": "Min.",
      "Seg": "Sek.",
      "Aceite de oliva virgen extra de cosecha temprana. Elaborado en Sierra Mágina, Jaén.": "Natives Olivenöl extra aus früher Ernte. Hergestellt in Sierra Mágina, Jaén.",
      "Explorar": "Entdecken",
      "Mayoristas": "Großhandel",
      "Legal": "Rechtliches",
      "Aviso legal": "Impressum",
      "Política de privacidad": "Datenschutzerklärung",
      "Política de cookies": "Cookie-Richtlinie",
      "Política de redes sociales": "Social-Media-Richtlinie",
      "Aceite de oliva virgen extra · Sierra Mágina · Jaén": "Natives Olivenöl extra · Sierra Mágina · Jaén",
      "© 2026 AURO OLIVE S.L. · Todos los derechos reservados": "© 2026 AURO OLIVE S.L. · Alle Rechte vorbehalten",
      "Tu nombre": "Dein Name",
      "Lata de AURO — aceite de oliva virgen extra 500 ml, modelo 3D interactivo": "AURO-Dose — natives Olivenöl extra 500 ml, interaktives 3D-Modell",
      "Detalle del envase AURO": "Detail der AURO-Verpackung",
      "Recolección de la aceituna Picual": "Ernte der Picual-Olive",
      "Aceituna recién recogida camino del molino": "Frisch geerntete Oliven auf dem Weg zur Mühle",
      "Molienda de la aceituna": "Mahlen der Oliven",
      "Batido de la pasta de aceituna en frío": "Kaltes Kneten der Olivenpaste",
      "Separación del aceite por centrifugado": "Trennung des Öls durch Zentrifuge",
      "Envasado del aceite en lata": "Abfüllen des Öls in die Dose",
      "AURO — Inicio": "AURO — Startseite",
      "Principal": "Hauptmenü",
      "Abrir menú": "Menü öffnen",
      "Niveles del viaje del origen": "Ebenen der Ursprungsreise",
      "Mapa 3D de relieve: viaje del origen del aceite de España a Sierra Mágina": "3D-Reliefkarte: die Ursprungsreise des Öls von Spanien nach Sierra Mágina",
      "Perfil de cata: frutado, amargo, picante, verde, almendra y manzana": "Verkostungsprofil: fruchtig, bitter, scharf, grün, Mandel und Apfel",
      "El proceso de elaboración de AURO": "Der Herstellungsprozess von AURO",
      "Paso 1 de 6": "Schritt 1 von 6", "Paso 2 de 6": "Schritt 2 von 6", "Paso 3 de 6": "Schritt 3 von 6",
      "Paso 4 de 6": "Schritt 4 von 6", "Paso 5 de 6": "Schritt 5 von 6", "Paso 6 de 6": "Schritt 6 von 6",
      "Paso anterior": "Vorheriger Schritt", "Ir a un paso": "Zu einem Schritt springen", "Paso siguiente": "Nächster Schritt",
      "Cosecha temprana, 100% Picual": "Frühe Ernte, 100% Picual",
      "Cuenta atrás para la primera cosecha de AURO": "Countdown bis zur ersten Ernte von AURO",
      "España es la 1ª productora mundial de aceite de oliva (~50% del total).": "Spanien ist der weltweit größte Olivenölproduzent (~50% der Gesamtmenge).",
      "Andalucía concentra cerca del 80% del aceite de España.": "Andalusien vereint fast 80% des spanischen Olivenöls.",
      "Jaén: la capital mundial del olivar, con más de 60 millones de olivos.": "Jaén: die Welthauptstadt des Olivenhains, mit über 60 Millionen Olivenbäumen.",
      "Sierra Mágina: aceite de montaña con Denominación de Origen.": "Sierra Mágina: Bergöl mit geschützter Ursprungsbezeichnung.",
      "Aquí nace AURO: 100% Picual, cosecha temprana.": "Hier entsteht AURO: 100% Picual, frühe Ernte.",
      "<strong>AURO · Olivar de Sierra Mágina</strong><br>100% Picual · cosecha temprana<br>": "<strong>AURO · Olivenhain der Sierra Mágina</strong><br>100% Picual · frühe Ernte<br>",
      "Altitud ~": "Höhe ~",
      " m · Sierra Mágina, Jaén": " m · Sierra Mágina, Jaén",
      "¡Estás dentro! · AURO": "Du bist dabei! · AURO",
      "Estás en la lista": "Du bist auf der Liste",
      "¡Bienvenido a AURO!": "Willkommen bei AURO!",
      "Hemos guardado tu sitio. Serás de los primeros en probar la primera cosecha 2026: 100% Picual de Sierra Mágina, edición numerada.": "Wir haben dir deinen Platz reserviert. Du gehörst zu den Ersten, die die Ernte 2026 probieren: 100% Picual aus Sierra Mágina, nummerierte Edition.",
      "Tu regalo: IA de recetas AURO": "Dein Geschenk: AURO-Rezept-KI",
      "Como parte de los primeros, tendrás acceso anticipado a una inteligencia artificial especializada en recetas para sacarle todo el partido a este aceite.": "Als einer der Ersten erhältst du frühen Zugang zu einer KI, die auf Rezepte spezialisiert ist, um das Beste aus diesem Öl herauszuholen.",
      "Te enviaremos el acceso por email antes del lanzamiento.": "Wir senden dir den Zugang per E-Mail vor dem Start.",
      "Volver a la web": "Zurück zur Website",
      "Ver cómo se hace": "Ansehen, wie es gemacht wird",
      "Revisa tu bandeja de entrada (y spam) para confirmar que somos nosotros. Sin spam: solo un email cuando arranque.": "Sieh in deinem Posteingang (und Spam) nach, um zu bestätigen, dass wir es sind. Kein Spam: nur eine E-Mail zum Start.",
      /* FAQ */
      "Preguntas frecuentes": "Häufige Fragen",
      "Todo lo que quieres saber antes de apuntarte": "Alles, was du vor der Anmeldung wissen möchtest",
      "¿Cuándo estará disponible AURO?": "Wann ist AURO verfügbar?",
      "La primera cosecha sale en 2026. Quienes estén en la lista serán los primeros en recibir el aviso y tendrán acceso anticipado antes que nadie.": "Die erste Ernte kommt 2026. Wer auf der Liste steht, wird zuerst benachrichtigt und erhält vorab Zugang vor allen anderen.",
      "¿Apuntarme me compromete a algo?": "Verpflichtet mich die Anmeldung zu etwas?",
      "No. Apuntarte es gratis y sin compromiso: solo te avisamos cuando salga la primera cosecha. Puedes darte de baja cuando quieras.": "Nein. Die Anmeldung ist kostenlos und unverbindlich: Wir benachrichtigen dich nur, wenn die erste Ernte da ist. Du kannst dich jederzeit abmelden.",
      "¿Cuánto costará?": "Was wird es kosten?",
      "Habrá un precio de lanzamiento exclusivo para la lista. Lo comunicaremos por email antes de abrir la venta, para que los primeros tengan la mejor condición.": "Es wird einen exklusiven Launch-Preis für die Liste geben. Wir geben ihn per E-Mail bekannt, bevor der Verkauf startet, damit die Ersten die besten Konditionen erhalten.",
      "¿Qué es la «cosecha temprana»?": "Was ist die „frühe Ernte“?",
      "Recogemos la aceituna Picual aún verde, en octubre. Así el aceite conserva más polifenoles (antioxidantes), más aroma y un amargor y picor nobles: el sello de un AOVE premium.": "Wir ernten die Picual-Olive noch grün, im Oktober. So bleiben mehr Polyphenole (Antioxidantien), mehr Aroma und eine edle Bitterkeit und Schärfe erhalten: das Kennzeichen eines Premium-Olivenöls.",
      "¿Cómo se hará el envío?": "Wie erfolgt der Versand?",
      "Prepararemos el envío a domicilio cuando abramos la venta. Los detalles de zonas, plazos y gastos llegarán primero a quienes estén en la lista.": "Wir organisieren die Lieferung nach Hause, sobald der Verkauf startet. Details zu Gebieten, Fristen und Kosten erhalten zuerst die Personen auf der Liste.",
      "¿En qué consiste el regalo de la IA de recetas?": "Worin besteht das Rezept-KI-Geschenk?",
      "Los primeros en apuntarse tendrán acceso anticipado a una inteligencia artificial especializada en recetas para sacarle todo el partido a AURO en la cocina.": "Die Ersten, die sich anmelden, erhalten frühen Zugang zu einer KI, die auf Rezepte spezialisiert ist, um AURO in der Küche voll auszuschöpfen.",
      /* Referidos (gracias) */
      "Sube en la lista: invita a tus amigos": "Rücke auf der Liste vor: Lade deine Freunde ein",
      "Comparte tu enlace y, por cada amigo que se apunte, subes puestos hacia el acceso anticipado.": "Teile deinen Link — mit jedem Freund, der sich anmeldet, rückst du näher an den frühen Zugang.",
      "Copiar enlace": "Link kopieren",
      "¡Enlace copiado!": "Link kopiert!",
      "Me apunto a la lista de espera de AURO, el aceite de oliva virgen extra 100% Picual de cosecha temprana de Sierra Mágina. Apúntate tú también:": "Ich bin auf der AURO-Warteliste — das native Olivenöl extra, 100% Picual aus früher Ernte aus Sierra Mágina. Mach auch mit:",
      /* La lata (explorador) */
      "La lata": "Die Dose",
      "Por qué AURO va en lata": "Warum AURO in der Dose kommt",
      "Toca cada punto y descubre qué hace especial a esta lata.": "Tippe auf jeden Punkt und entdecke, was diese Dose besonders macht.",
      "Aluminio": "Aluminium",
      "D.O.P. Sierra Mágina": "g.U. Sierra Mágina",
      "Lata de aluminio: 0% luz": "Aluminiumdose: 0% Licht",
      "La luz es el peor enemigo del aceite: lo oxida y le roba aroma y antioxidantes. La lata bloquea el 100% de la luz y el oxígeno, por eso los polifenoles y la vitamina E llegan intactos a tu mesa: más sabor y todo su valor saludable. Además, el aluminio es ligero, irrompible y se recicla una y otra vez sin perder calidad.": "Licht ist der größte Feind des Öls: Es oxidiert das Öl und raubt ihm Aroma und Antioxidantien. Die Dose hält 100% des Lichts und Sauerstoffs ab, so gelangen die Polyphenole und das Vitamin E unversehrt auf deinen Tisch – mehr Geschmack und der volle gesundheitliche Wert. Zudem ist Aluminium leicht, unzerbrechlich und immer wieder recycelbar, ohne an Qualität zu verlieren.",
      "Denominación de Origen Protegida": "Geschützte Ursprungsbezeichnung",
      "Sierra Mágina, en el corazón de Jaén, cuenta con su propia D.O.P.: un sello europeo que garantiza el origen, la variedad y la calidad del aceite de esta sierra. Altitud, frío y sol que dan un aceite más aromático y equilibrado.": "Sierra Mágina, im Herzen von Jaén, hat ihre eigene g.U.: ein europäisches Siegel, das Herkunft, Sorte und Qualität dieses Bergöls garantiert. Höhe, Kälte und Sonne ergeben ein aromatischeres, ausgewogeneres Öl.",
      "100% Picual, la reina de Jaén": "100% Picual, die Königin Jaéns",
      "La variedad más noble y estable de Jaén. Rica en antioxidantes, de frutado verde intenso, con un amargor y un picor nobles que delatan un aceite vivo.": "Die edelste und stabilste Sorte Jaéns. Reich an Antioxidantien, mit intensiver grüner Fruchtigkeit und einer edlen Bitterkeit und Schärfe, die ein lebendiges Öl verraten.",
      "Cosecha temprana, recogida en verde": "Frühe Ernte, grün geerntet",
      "Recolectada en octubre, aún verde. Da menos aceite por aceituna, pero conserva los máximos polifenoles y aroma. Calidad por encima de cantidad.": "Im Oktober geerntet, noch grün. Sie gibt weniger Öl pro Olive, bewahrt aber maximale Polyphenole und Aroma. Qualität vor Quantität.",
      "500 ml, la medida justa": "500 ml, das richtige Maß",
      "El formato perfecto para disfrutarlo fresco en semanas, no en meses. Consérvalo en un lugar fresco y oscuro y úsalo en crudo para notarlo todo.": "Das perfekte Format, um es in Wochen statt Monaten frisch zu genießen. An einem kühlen, dunklen Ort aufbewahren und roh verwenden, um alles zu schmecken.",
      "Origen y calidad": "Herkunft & Qualität",
      "Producto de España": "Produkt aus Spanien",
      "Primera cosecha 2026 · plazas limitadas": "Erste Ernte 2026 · begrenzte Plätze",
      "← Volver": "← Zurück",
      "AURO OLIVE S.L. · última actualización: julio de 2026": "AURO OLIVE S.L. · zuletzt aktualisiert: Juli 2026",
      "Contenido pendiente de publicación": "Inhalt folgt in Kürze",
      "Traducción orientativa. La versión en español es la única legalmente vinculante.": "Informative Übersetzung. Nur die spanische Fassung ist rechtsverbindlich.",
      "Idioma": "Sprache"
    }
  };

  // Diccionario extra opcional (p.ej. textos legales) cargado en su propio archivo
  if (window.AURO_I18N_EXTRA) {
    ['en', 'de'].forEach(function (l) {
      var ex = window.AURO_I18N_EXTRA[l];
      if (ex) for (var k in ex) { if (Object.prototype.hasOwnProperty.call(ex, k)) DICT[l][k] = ex[k]; }
    });
    if (document.documentElement) document.documentElement.classList.add('i18n-extra');
  }

  var ATTRS = ['placeholder', 'alt', 'aria-label', 'title'];

  // Idioma. Precedencia:
  //   1) ?lang= en la URL (deep-link / hreflang explícito)
  //   2) elección guardada del usuario (selector ES · EN · DE)
  //   3) data-lang de la página (las páginas /es/ y /en/ lo fijan)
  //   4) ALEMÁN por defecto (dominio .de) — cualquier visitante nuevo ve alemán.
  function normLang(l) { return (l === 'es' || l === 'en' || l === 'de') ? l : null; }
  var lang = 'de';
  var pageLang = document.documentElement.getAttribute('data-lang');
  try {
    var q = new URLSearchParams(location.search).get('lang');
    var saved = localStorage.getItem('auro_lang');
    lang = normLang(q) || normLang(saved) || normLang(pageLang) || 'de';
  } catch (e) { lang = normLang(pageLang) || 'de'; }

  function t(str) {
    if (!str || lang === 'es') return str;
    var d = DICT[lang];
    if (!d) return str;
    if (d[str] != null) return d[str];
    var k = str.replace(/\u00A0/g, " ");   // normaliza espacios duros (nbsp)
    return d[k] != null ? d[k] : str;
  }

  function translateTextNodes() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('[data-no-i18n]')) return NodeFilter.FILTER_REJECT;
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var list = [], node;
    while ((node = w.nextNode())) list.push(node);
    list.forEach(function (n) {
      if (n.__es == null) n.__es = n.nodeValue;
      var orig = n.__es, trimmed = orig.trim();
      var tr = t(trimmed);
      if (tr === trimmed) { n.nodeValue = orig; return; }
      var lead = orig.match(/^\s*/)[0], trail = orig.match(/\s*$/)[0];
      n.nodeValue = lead + tr + trail;
    });
  }

  function translateAttrs() {
    ATTRS.forEach(function (attr) {
      document.querySelectorAll('[' + attr + ']').forEach(function (el) {
        var key = '__es_' + attr;
        if (el[key] == null) el[key] = el.getAttribute(attr);
        var orig = el[key]; if (orig == null) return;
        var tr = t(orig.trim());
        el.setAttribute(attr, tr === orig.trim() ? orig : tr);
      });
    });
  }

  function translateHead() {
    var titleEl = document.querySelector('title');
    if (titleEl) { if (titleEl.__es == null) titleEl.__es = titleEl.textContent; titleEl.textContent = t(titleEl.__es.trim()); }
    var md = document.querySelector('meta[name="description"]');
    if (md) { if (md.__es == null) md.__es = md.getAttribute('content'); md.setAttribute('content', t((md.__es || '').trim())); }
  }

  function apply() {
    document.documentElement.lang = lang;
    if (document.body) { translateTextNodes(); translateAttrs(); }
    translateHead();
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.dispatchEvent(new CustomEvent('auro:langchange', { detail: { lang: lang } }));
  }

  function setLang(l) {
    lang = (l === 'en' || l === 'de') ? l : 'es';
    try { localStorage.setItem('auro_lang', lang); } catch (e) {}
    apply();
  }

  window.AuroI18n = {
    t: function (s) { return t(s); },
    set: setLang,
    get lang() { return lang; }
  };

  function buildSwitch() {
    if (document.querySelector('.lang-switch')) return;
    var host = document.querySelector('[data-lang-switch]')
      || document.querySelector('.header-actions')
      || document.querySelector('.simple-header .container');
    if (!host) return;
    var wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Idioma / Language / Sprache');
    [['es', 'ES'], ['en', 'EN'], ['de', 'DE']].forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-lang', p[0]);
      b.setAttribute('data-no-i18n', '');
      b.textContent = p[1];
      b.addEventListener('click', function () { setLang(p[0]); });
      wrap.appendChild(b);
    });
    if (host.classList.contains('header-actions')) host.insertBefore(wrap, host.firstChild);
    else host.appendChild(wrap);
  }

  function init() { buildSwitch(); apply(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
