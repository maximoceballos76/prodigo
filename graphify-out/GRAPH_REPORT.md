# Graph Report - prodigo  (2026-10-26)

## Corpus Check
- 33 files · ~27,128 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .css 2)

## Summary
- 297 nodes · 389 edges · 37 communities (18 shown, 19 thin omitted)
- Extraction: 88% EXTRACTED · 11% INFERRED · 1% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4d35d666`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Prototipos de menú (tienda)
- Arquitectura y operación del sitio
- Publicación en GitHub Pages
- Envío del formulario (POST/PATCH a PocketBase)
- Fotos de máquinas de escribir
- Capa de datos (api.js)
- Etapa 1 - Arreglar lo que esta a medias
- Fotografías de Buenos Aires s. XIX
- Sesión e ingreso al panel
- Panel admin: categorías y filtros
- Postales de Buenos Aires
- Ayudas comunes de prototipos
- Exportador de demo
- Lotes de postales del exterior
- Migración: simplificar carga
- Migración: postales y máquinas
- Datos de prototipos
- Reglas de graphify
- Encabezado común
- Retratos
- Portada y catálogo
- piezas.js obsoleto
- Migración: color de postales
- Migración: campo fuente
- Migración: editores eliminan
- Migración: editores ven ocultas
- Proyecto Pródigo

## God Nodes (most connected - your core abstractions)
1. `iniciar()` - 10 edges
2. `pintarLista()` - 10 edges
3. `abrirPanel()` - 8 edges
4. `archivosDe()` - 7 edges
5. `Prodigo - Hoja de ruta` - 7 edges
6. `Envío del formulario (POST/PATCH a PocketBase)` - 7 edges
7. `QWERTY Keyboard` - 7 edges
8. `mostrarListo()` - 7 edges
9. `steps` - 6 edges
10. `urlImagen()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `CAMPOS (datos de catalogacion por tipo)` --semantically_similar_to--> `Filtros por especificacion (constante FILTROS en tienda.html)`  [INFERRED] [semantically similar]
  tienda/pieza.html → DOCUMENTACION.txt
- `iniciar()` --implements--> `Creditos de fotos Creative Commons (campo credito)`  [INFERRED]
  tienda/pieza.html → DOCUMENTACION.txt
- `enTienda()` --implements--> `Que ve la web publica (visible = true, destino Venta)`  [INFERRED]
  tienda/admin.html → DOCUMENTACION.txt
- `Ficha de una pieza (pieza.html) - documentacion` --references--> `pieza.html (Ficha de pieza)`  [EXTRACTED]
  DOCUMENTACION.txt → tienda/pieza.html
- `CAMPOS (datos de catalogacion por tipo)` --shares_data_with--> `Campos comunes de piezas (imagenes, titulo, inventario, destino, precio_usd, estado, visible...)`  [INFERRED]
  tienda/pieza.html → DOCUMENTACION.txt

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Render del panel admin (pintarTodo -> totales, categorias, lista)** — tienda_admin_pintartodo, tienda_admin_pintartotales, tienda_admin_pintarcats, tienda_admin_pintarlista, tienda_admin_estados [EXTRACTED 1.00]
- **Puntos a tocar al agregar una categoria** — documentacion_agregar_categoria, documentacion_pb_hooks, documentacion_categorias_slug, tienda_pieza_campos, documentacion_tipo_es_coleccion [EXTRACTED 1.00]
- **Tres ideas de menú alternativas para la tienda** — ideas_dise_os_index_galeria_ideas, ideas_dise_os_1_menu_lateral_idea_menu_lateral, ideas_dise_os_2_megamenu_idea_megamenu, ideas_dise_os_3_menu_pantalla_completa_idea_indice [EXTRACTED 1.00]
- **CRUD de piezas contra PocketBase con token de sesión** — tienda_admin_abrirpanel, tienda_admin_eliminar_pieza, tienda_cargar_cargarpieza, tienda_cargar_guardar_pieza, tienda_cargar_eliminar_pieza [EXTRACTED 1.00]
- **Flujo de validación y errores del formulario de pieza** — tienda_cargar_revisar, tienda_cargar_mostrarerrores, tienda_cargar_marcarerror, tienda_cargar_limpiarerror, tienda_cargar_campode, tienda_cargar_mensajes [EXTRACTED 1.00]
- **Flujo de la propuesta de panel escalable** — ideas_dise_os_panel_30_categorias_elegircat, ideas_dise_os_panel_30_categorias_pintarcats, ideas_dise_os_panel_30_categorias_pintarpropuesta, ideas_dise_os_panel_30_categorias_pintarlistado, ideas_dise_os_panel_30_categorias_estados [INFERRED 0.85]
- **Flujo de publicacion de la demo en GitHub Pages** — documentacion_github_pages_demo, documentacion_exportar_demo, documentacion_creditos_cc, documentacion_visibilidad_publica [INFERRED 0.85]
- **Esquema de campos por categoría compartido entre carga, ficha y filtros** — tienda_cargar_mostrargrupo, tienda_pieza_campos, tienda_tienda_filtros, tienda_categorias_pieza [INFERRED 0.85]
- **Copias originales en papel albuminado del estudio Bixio** — tienda_datos_fotos_dhj1a3p3fwza7w5_fot_0003_ifm4dip7ox_estacion_chascomus, tienda_datos_fotos_i3i8g5402wllp50_fot_0004_yx9bimqf3u_demolicion_recova, tienda_datos_fotos_wmqgh7u6h30owfq_fot_0006_cbdycnej57_calle_piedad, tienda_datos_fotos_us1v52o98py09c7_fot_0008_uyt4b5a8ff_vista_ribera [INFERRED 0.85]
- **Early 20th-century American desktop standard typewriters** — tienda_datos_fotos_dxdrnez4efdv6fl_maq_0005_pkc0v0hd8u_photo, tienda_datos_fotos_vhgf8yq2fzvjdjk_maq_0006_eae8hfydm6_photo, tienda_datos_fotos_p6v1ujpw6fyw57h_maq_0007_ftmhq0zort_photo [INFERRED 0.85]
- **Vistas coloreadas de Buenos Aires del Centenario (c. 1905-1915)** — tienda_datos_fotos_69bmt0rwspt5die_pos_0005_3nmewdz1fe_postal, tienda_datos_fotos_p6dudxh34035jbh_pos_0007_k8p86febxs_postal, tienda_datos_fotos_rama1c7olsqypxo_pos_0010_zjygzbjlqz_postal [INFERRED 0.85]

## Communities (37 total, 19 thin omitted)

### Community 0 - "Prototipos de menú (tienda)"
Cohesion: 0.07
Nodes (30): cajon() drawer toggle, pintar() (menú lateral), movil() media query check, panel(slug) megamenu panel, pintar() (megamenú), pintarMenu(), clonar() filter sets clone, hoja() open/close sheet (+22 more)

### Community 1 - "Arquitectura y operación del sitio"
Cohesion: 0.08
Nodes (29): Como agregar una categoria, Encabezado comun (cabecera.js, SECCIONES, selector de paleta), Campos comunes de piezas (imagenes, titulo, inventario, destino, precio_usd, estado, visible...), Categorias: slug = nombre de coleccion de piezas, Coleccion editores (cuentas de carga), Como se levanta (PocketBase 8090 + servidor estatico 5500), Destino de pieza (Venta / Museo Miranda / Museo Ezeiza / Sin Definir), Ficha de una pieza (pieza.html) - documentacion (+21 more)

### Community 2 - "Publicación en GitHub Pages"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, name, url, jobs, publicar, name (+17 more)

### Community 3 - "Envío del formulario (POST/PATCH a PocketBase)"
Cohesion: 0.32
Nodes (8): campoDe(), Envío del formulario (POST/PATCH a PocketBase), PocketBase imagenes+/imagenes- para editar fotos, leerPrecio() (acepta 1.500,50 / 1500.50), marcarError(), MENSAJES (códigos de error PocketBase), mostrarErrores(), revisar() (validación del lado del cliente)

### Community 4 - "Fotos de máquinas de escribir"
Cohesion: 0.14
Nodes (21): Hermes Baby green (Switzerland, mid-century, Swiss-German QWERTZ), Remington Portable (USA, 1920s-30s, glossy black, good condition), Remington Standard No. 6 desktop (USA, c. 1890s, black, museum display), Unidentified desktop typewriter with black keys (worn, sepia photo), Underwood No. 5 (USA, 1900s-30s, worn black, museum display), Olivetti Lettera 22 (Italy, 1950s, grey, good condition), Royal 10 (USA, 1910s-20s, black with gold decals, French keycap labels), Unidentified grey portable typewriter in case (B&W photo, worn) (+13 more)

### Community 5 - "Capa de datos (api.js)"
Cohesion: 0.10
Nodes (31): archivosDe(), demo(), formatoPrecio(), listarCategorias(), listarPiezas(), MODO_DEMO, obtenerPieza(), pb() (+23 more)

### Community 6 - "Etapa 1 - Arreglar lo que esta a medias"
Cohesion: 0.15
Nodes (12): Backups de pb_data, Creditos de fotos Creative Commons (campo credito), exportar_demo.py (genera tienda/datos/ desde la API publica), Version de exhibicion en GitHub Pages (solo lectura, MODO_DEMO), Numeracion de inventario (FOT/POS/MAQ-0000), Piezas de ejemplo del prototipo (Wikimedia Commons, datos inventados), Copias de seguridad automaticas de pb_data, Correo real de consultas (contacto@ejemplo.com) (+4 more)

### Community 7 - "Fotografías de Buenos Aires s. XIX"
Cohesion: 0.26
Nodes (14): Bixio Fundador (fotógrafo), Buenos Aires siglo XIX, E. Bixio (fotógrafo), Ferrocarril en la provincia de Buenos Aires, Positivo en papel albuminado, Plaza de Mayo, Recova Vieja, Transporte a tracción a sangre (carros y caballos) (+6 more)

### Community 8 - "Sesión e ingreso al panel"
Cohesion: 0.21
Nodes (12): abrirPanel(), avisar(), Eliminar pieza (handler DELETE en lista), Handler submit form-ingreso, iniciar(), mostrar(), cargar.html (Cargar / modificar pieza), ingresar() (+4 more)

### Community 9 - "Panel admin: categorías y filtros"
Cohesion: 0.27
Nodes (11): deCat(), elegirCat(), enTienda(), ESTADOS (filtros rapidos por estado), normalizar() (sin mayusculas ni tildes), pintarCats(), pintarLista(), pintarTodo() (+3 more)

### Community 10 - "Postales de Buenos Aires"
Cohesion: 0.33
Nodes (11): Fuente Lola Mora y Palace Hotel, Paseo de Julio (fototipia coloreada, matasellos 1912), Banco de la Nación Argentina, Plaza de Mayo (foto real b/n, edificio Belle Époque, c. 1920s), Avenida Callao (cromolitografía color, palacetes afrancesados, c. 1910), Avenida 9 de Julio desde Avenida de Mayo (offset color, autos y ómnibus, c. 1950), Avenida Alvear (fototipia coloreada, mansiones y vigilante, c. 1905-1910), Jardín Zoológico de Palermo, los flamencos (foto real sepia, dorso fechado 1934), Plaza de Mayo / Avenida de Mayo, Arquitectura Belle Époque porteña (+3 more)

### Community 11 - "Ayudas comunes de prototipos"
Cohesion: 0.31
Nodes (4): esc(), nombreCat(), precio(), tarjeta()

### Community 13 - "Lotes de postales del exterior"
Cohesion: 0.48
Nodes (7): Lote de 12 postales de Chascomús (fotos b/n de laguna, muelle y edificios, una coloreada, c. 1930-50), Colección de 10 postales de Zaragoza en tono azul (Basílica del Pilar, puente de piedra, c. 1920-30), Lote de 14 postales de Río de Janeiro (paisajes costeros y Teatro Municipal, b/n), Lote de 10 postales del Monasterio de El Escorial (salas con tapices y vista exterior, b/n), Postales en blanco y negro / monocromo fotomecánico, España (postales de ciudades y monumentos), Lotes y colecciones de postales

### Community 14 - "Migración: simplificar carga"
Cohesion: 0.40
Nodes (5): ANTES, aplicar(), CATEGORIAS, FOTOGRAFIAS, revertir()

### Community 15 - "Migración: postales y máquinas"
Cohesion: 0.33
Nodes (3): CATEGORIAS, COLECCIONES, COMUNES

### Community 16 - "Datos de prototipos"
Cohesion: 0.50
Nodes (3): CATEGORIAS, FILTROS, PIEZAS

### Community 19 - "Retratos"
Cohesion: 1.00
Nodes (3): Retrato, Reproducción del retrato de Monet por Renoir (c. 1900), Retrato de Lucio V. Mansilla (1895)

### Community 20 - "Portada y catálogo"
Cohesion: 0.67
Nodes (3): index.html (Portada del museo), Datos de ejemplo provisorios (sedes Miranda/Ezeiza, horario, entrada), tienda.html (Catálogo de venta)

## Ambiguous Edges - Review These
- `CAMPOS (datos de catalogacion por tipo)` → `normalizar() (sin mayusculas ni tildes)`  [AMBIGUOUS]
  tienda/admin.html · relation: conceptually_related_to
- `Bixio Fundador (fotógrafo)` → `E. Bixio (fotógrafo)`  [AMBIGUOUS]
  tienda/datos/fotos/i3i8g5402wllp50/fot_0004_yx9bimqf3u.jpg · relation: conceptually_related_to

## Knowledge Gaps
- **22 isolated node(s):** `movil() media query check`, `clonar() filter sets clone`, `esc() (panel local)`, `verVersion() version switcher`, `Backups de pb_data` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 92 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `iniciar()` connect `Capa de datos (api.js)` to `Panel admin: categorías y filtros`, `Etapa 1 - Arreglar lo que esta a medias`, `Arquitectura y operación del sitio`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `movil() media query check`, `clonar() filter sets clone`, `esc() (panel local)` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Prototipos de menú (tienda)` be split into smaller, more focused modules?**
  _Cohesion score 0.06612685560053981 - nodes in this community are weakly interconnected._
- **Why does `mostrarListo()` connect `Capa de datos (api.js)` to `Envío del formulario (POST/PATCH a PocketBase)`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Should `Arquitectura y operación del sitio` be split into smaller, more focused modules?**
  _Cohesion score 0.08387096774193549 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `CAMPOS (datos de catalogacion por tipo)` and `normalizar() (sin mayusculas ni tildes)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Bixio Fundador (fotógrafo)` and `E. Bixio (fotógrafo)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._