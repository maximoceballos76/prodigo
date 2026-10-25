# Graph Report - prodigo  (2026-10-25)

## Corpus Check
- 31 files · ~17,186 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 193 nodes · 256 edges · 30 communities (11 shown, 19 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `07ce6907`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Datos y colecciones PocketBase
- cargarPieza() (modo edición)
- abrirPanel
- Visualización de piezas
- Formulario de carga de piezas (cargar.html)
- pages.yml
- Sesión compartida
- steps
- Migración simplificar carga
- Migración postales y máquinas
- Reglas de graphify
- Encabezado común (cabecera.js)
- Datos de ejemplo viejos
- Migración color postales
- Migración campo fuente
- Migración editores eliminan
- Migración editores listan ocultas
- README del proyecto
- exportar_demo.py
- Envío del formulario (POST/PATCH a PocketBase)

## God Nodes (most connected - your core abstractions)
1. `pintarLista()` - 10 edges
2. `abrirPanel()` - 9 edges
3. `Envío del formulario (POST/PATCH a PocketBase)` - 8 edges
4. `mostrarListo()` - 8 edges
5. `Formulario de carga de piezas (cargar.html)` - 8 edges
6. `Migraciones PocketBase (pb_migrations)` - 7 edges
7. `Prodigo - Hoja de ruta` - 7 edges
8. `cargarPieza() (modo edición)` - 7 edges
9. `iniciar() (pieza)` - 7 edges
10. `steps` - 6 edges

## Surprising Connections (you probably didn't know these)
- `abrirPanel()` --calls--> `listarCategorias()`  [EXTRACTED]
  tienda/admin.html → tienda/api.js
- `cargarPieza() (modo edición)` --calls--> `archivosDe()`  [EXTRACTED]
  tienda/cargar.html → tienda/api.js
- `cargarPieza() (modo edición)` --calls--> `urlImagen()`  [EXTRACTED]
  tienda/cargar.html → tienda/api.js
- `marcarError()` --calls--> `esc()`  [EXTRACTED]
  tienda/cargar.html → tienda/api.js
- `iniciar() (admin)` --calls--> `sesionVigente()`  [EXTRACTED]
  tienda/admin.html → tienda/sesion.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Colecciones de piezas (mismos campos comunes, hooks y permisos)** — documentacion_coleccion_fotografias, documentacion_coleccion_postales, documentacion_coleccion_maquinas_de_escribir, documentacion_hooks_venta, documentacion_coleccion_categorias [EXTRACTED 1.00]
- **Flujo de login interno compartido (cargar.html y admin.html)** — documentacion_formulario_carga, documentacion_panel_admin, documentacion_sesion_js, documentacion_sesion_prodigo_sesion, documentacion_login_editores_superusers [EXTRACTED 1.00]
- **Puesta en produccion** — hoja_de_ruta_etapa_5_publicar, hoja_de_ruta_cambiar_pb_url, hoja_de_ruta_backups_automaticos, hoja_de_ruta_metadatos_compartir [EXTRACTED 1.00]
- **CRUD de piezas contra PocketBase con token de sesión** — tienda_admin_abrirpanel, tienda_admin_eliminar_pieza, tienda_cargar_cargarpieza, tienda_cargar_guardar_pieza, tienda_cargar_eliminar_pieza, tienda_pocketbase_api [EXTRACTED 1.00]
- **Flujo de validación y errores del formulario de pieza** — tienda_cargar_revisar, tienda_cargar_mostrarerrores, tienda_cargar_marcarerror, tienda_cargar_limpiarerror, tienda_cargar_campode, tienda_cargar_mensajes [EXTRACTED 1.00]
- **Esquema de campos por categoría compartido entre carga, ficha y filtros** — tienda_cargar_mostrargrupo, tienda_pieza_campos, tienda_tienda_filtros, tienda_categorias_pieza [INFERRED 0.85]

## Communities (30 total, 19 thin omitted)

### Community 0 - "Datos y colecciones PocketBase"
Cohesion: 0.10
Nodes (27): api.js (pb, listarCategorias, listarPiezas, obtenerPieza, urlImagen...), Backups de pb_data, Encabezado comun (cabecera.js, SECCIONES), Destino (Venta / Museo Miranda / Museo Ezeiza / Sin Definir), Ficha de pieza (pieza.html, lista CAMPOS), Filtros por especificacion (constante FILTROS), Hooks PocketBase (validar_venta, venta.js, ocultar_inventario), PB_URL (direccion de PocketBase en tienda/api.js) (+19 more)

### Community 1 - "cargarPieza() (modo edición)"
Cohesion: 0.15
Nodes (17): abrirFormulario(), agregarFotos(), cargarPieza() (modo edición), Eliminar pieza en edición (DELETE), iniciar() (cargar), limpiarError(), limpiarErrores(), limpiarFormulario() (+9 more)

### Community 2 - "abrirPanel"
Cohesion: 0.31
Nodes (8): abrirPanel(), avisar(), Eliminar pieza desde lista (DELETE), iniciar() (admin), mostrar() (admin), pintarResumen(), PocketBase REST API (/api/collections/.../records), pintarCategorias()

### Community 3 - "Visualización de piezas"
Cohesion: 0.16
Nodes (21): enTienda() (visible && destino Venta), normalizar() (accent/case-insensitive search), pintarLista(), archivosDe(), demo(), esc(), formatoPrecio(), listarCategorias() (+13 more)

### Community 4 - "Formulario de carga de piezas (cargar.html)"
Cohesion: 0.10
Nodes (23): Buscador del panel (sin mayusculas ni tildes), Campo interno fuente, Coleccion categorias (slug = coleccion de piezas), Coleccion editores, Coleccion fotografias, Coleccion maquinas_de_escribir, Coleccion postales, Formulario de carga de piezas (cargar.html) (+15 more)

### Community 5 - "pages.yml"
Cohesion: 0.15
Nodes (12): concurrency, cancel-in-progress, group, name, permissions, contents, id-token, pages (+4 more)

### Community 6 - "Sesión compartida"
Cohesion: 0.39
Nodes (6): admin.html (Panel de administración), cargar.html (Cargar / modificar pieza), ingresar(), recordarSesion(), renovar(), sesionVigente()

### Community 7 - "steps"
Cohesion: 0.15
Nodes (13): name, url, jobs, publicar, environment, runs-on, steps, id (+5 more)

### Community 8 - "Migración simplificar carga"
Cohesion: 0.40
Nodes (5): ANTES, aplicar(), CATEGORIAS, FOTOGRAFIAS, revertir()

### Community 9 - "Migración postales y máquinas"
Cohesion: 0.33
Nodes (3): CATEGORIAS, COLECCIONES, COMUNES

### Community 29 - "Envío del formulario (POST/PATCH a PocketBase)"
Cohesion: 0.32
Nodes (8): campoDe(), Envío del formulario (POST/PATCH a PocketBase), PocketBase imagenes+/imagenes- para editar fotos, leerPrecio() (acepta 1.500,50 / 1500.50), marcarError(), MENSAJES (códigos de error PocketBase), mostrarErrores(), revisar() (validación del lado del cliente)

## Knowledge Gaps
- **17 isolated node(s):** `Coleccion fotografias`, `Coleccion maquinas_de_escribir`, `Coleccion postales`, `Filtros por especificacion (constante FILTROS)`, `piezas.js (datos de ejemplo viejos, sin uso)` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 74 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pintarLista()` connect `Visualización de piezas` to `abrirPanel`, `Sesión compartida`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `Coleccion fotografias`, `Coleccion maquinas_de_escribir`, `Coleccion postales` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Datos y colecciones PocketBase` be split into smaller, more focused modules?**
  _Cohesion score 0.09971509971509972 - nodes in this community are weakly interconnected._
- **Why does `Prodigo - Hoja de ruta` connect `Datos y colecciones PocketBase` to `Formulario de carga de piezas (cargar.html)`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `Formulario de carga de piezas (cargar.html)` be split into smaller, more focused modules?**
  _Cohesion score 0.10153846153846154 - nodes in this community are weakly interconnected._
- **Why does `mostrarListo()` connect `Visualización de piezas` to `cargarPieza() (modo edición)`, `Envío del formulario (POST/PATCH a PocketBase)`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._