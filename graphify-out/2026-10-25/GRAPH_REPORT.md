# Graph Report - prodigo  (2026-10-25)

## Corpus Check
- Corpus is ~13,883 words - fits in a single context window. You may not need a graph.

## Summary
- 157 nodes · 215 edges · 28 communities (10 shown, 18 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.84)
- Token cost: 167,986 input · 0 output

## Community Hubs (Navigation)
- Datos y colecciones PocketBase
- Formulario de carga
- Panel: carga y resumen
- Visualización de piezas
- Acceso y login de editores
- Portada, encabezado y secciones
- Sesión compartida
- Modo edición y eliminar
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

## God Nodes (most connected - your core abstractions)
1. `pintarLista()` - 10 edges
2. `abrirPanel()` - 9 edges
3. `Formulario de carga de piezas (cargar.html)` - 8 edges
4. `Envío del formulario (POST/PATCH a PocketBase)` - 8 edges
5. `mostrarListo()` - 8 edges
6. `Migraciones PocketBase (pb_migrations)` - 7 edges
7. `Prodigo - Hoja de ruta` - 7 edges
8. `cargarPieza() (modo edición)` - 7 edges
9. `iniciar() (pieza)` - 7 edges
10. `archivosDe()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `iniciar() (pieza)` --calls--> `obtenerPieza()`  [EXTRACTED]
  tienda/pieza.html → tienda/api.js
- `cargarPieza() (modo edición)` --calls--> `archivosDe()`  [EXTRACTED]
  tienda/cargar.html → tienda/api.js
- `cargarPieza() (modo edición)` --calls--> `urlImagen()`  [EXTRACTED]
  tienda/cargar.html → tienda/api.js
- `pintarLista()` --calls--> `esc()`  [EXTRACTED]
  tienda/admin.html → tienda/api.js
- `iniciar() (pieza)` --calls--> `esc()`  [EXTRACTED]
  tienda/pieza.html → tienda/api.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Colecciones de piezas (mismos campos comunes, hooks y permisos)** — documentacion_coleccion_fotografias, documentacion_coleccion_postales, documentacion_coleccion_maquinas_de_escribir, documentacion_hooks_venta, documentacion_coleccion_categorias [EXTRACTED 1.00]
- **Flujo de login interno compartido (cargar.html y admin.html)** — documentacion_formulario_carga, documentacion_panel_admin, documentacion_sesion_js, documentacion_sesion_prodigo_sesion, documentacion_login_editores_superusers [EXTRACTED 1.00]
- **Puesta en produccion** — hoja_de_ruta_etapa_5_publicar, hoja_de_ruta_cambiar_pb_url, hoja_de_ruta_backups_automaticos, hoja_de_ruta_metadatos_compartir [EXTRACTED 1.00]
- **CRUD de piezas contra PocketBase con token de sesión** — tienda_admin_abrirpanel, tienda_admin_eliminar_pieza, tienda_cargar_cargarpieza, tienda_cargar_guardar_pieza, tienda_cargar_eliminar_pieza, tienda_pocketbase_api [EXTRACTED 1.00]
- **Flujo de validación y errores del formulario de pieza** — tienda_cargar_revisar, tienda_cargar_mostrarerrores, tienda_cargar_marcarerror, tienda_cargar_limpiarerror, tienda_cargar_campode, tienda_cargar_mensajes [EXTRACTED 1.00]
- **Esquema de campos por categoría compartido entre carga, ficha y filtros** — tienda_cargar_mostrargrupo, tienda_pieza_campos, tienda_tienda_filtros, tienda_categorias_pieza [INFERRED 0.85]

## Communities (28 total, 18 thin omitted)

### Community 0 - "Datos y colecciones PocketBase"
Cohesion: 0.08
Nodes (31): api.js (pb, listarCategorias, listarPiezas, obtenerPieza, urlImagen...), Backups de pb_data, Campo interno fuente, Coleccion categorias (slug = coleccion de piezas), Coleccion fotografias, Coleccion maquinas_de_escribir, Coleccion postales, Ficha de pieza (pieza.html, lista CAMPOS) (+23 more)

### Community 1 - "Formulario de carga"
Cohesion: 0.14
Nodes (20): esc(), agregarFotos(), campoDe(), cargarPieza() (modo edición), Envío del formulario (POST/PATCH a PocketBase), PocketBase imagenes+/imagenes- para editar fotos, leerPrecio() (acepta 1.500,50 / 1500.50), limpiarError() (+12 more)

### Community 2 - "Panel: carga y resumen"
Cohesion: 0.21
Nodes (12): abrirPanel(), avisar(), enTienda() (visible && destino Venta), iniciar() (admin), mostrar() (admin), pintarResumen(), listarCategorias(), listarPiezas() (+4 more)

### Community 3 - "Visualización de piezas"
Cohesion: 0.20
Nodes (14): normalizar() (accent/case-insensitive search), pintarLista(), archivosDe(), formatoPrecio(), urlImagen(), mostrarListo(), index.html (Portada del museo), Datos de ejemplo provisorios (sedes Miranda/Ezeiza, horario, entrada) (+6 more)

### Community 4 - "Acceso y login de editores"
Cohesion: 0.21
Nodes (11): Buscador del panel (sin mayusculas ni tildes), Coleccion editores, Formulario de carga de piezas (cargar.html), Login editores / _superusers (auth-with-password), Modo edicion: modificar y eliminar pieza (cargar.html?c=&id=), Panel de administracion (admin.html), sesion.js (ingresar, renovar, sesionVigente, recordarSesion), Sesion en localStorage prodigo-sesion (+3 more)

### Community 5 - "Portada, encabezado y secciones"
Cohesion: 0.32
Nodes (8): Encabezado comun (cabecera.js, SECCIONES), Destino (Venta / Museo Miranda / Museo Ezeiza / Sin Definir), Portada (index.html), Selector de paleta Papel / Arena / Niebla (prodigo-paleta), Etapa 4 - Secciones nuevas, Pie de pagina comun (footer), Elegir paleta definitiva y sacar el selector, Seccion Coleccion (piezas no en venta)

### Community 6 - "Sesión compartida"
Cohesion: 0.39
Nodes (6): admin.html (Panel de administración), cargar.html (Cargar / modificar pieza), ingresar(), recordarSesion(), renovar(), sesionVigente()

### Community 7 - "Modo edición y eliminar"
Cohesion: 0.33
Nodes (6): Eliminar pieza desde lista (DELETE), abrirFormulario(), Eliminar pieza en edición (DELETE), iniciar() (cargar), mostrar() (cargar), salirDeEdicion()

### Community 8 - "Migración simplificar carga"
Cohesion: 0.40
Nodes (5): ANTES, aplicar(), CATEGORIAS, FOTOGRAFIAS, revertir()

### Community 9 - "Migración postales y máquinas"
Cohesion: 0.33
Nodes (3): CATEGORIAS, COLECCIONES, COMUNES

## Knowledge Gaps
- **17 isolated node(s):** `Prodigo (museum project)`, `Servidor web estatico tienda/ (puerto 5500)`, `Vistas Ingreso / Carga / Listo (mostrar())`, `Sesion en localStorage prodigo-sesion`, `Buscador del panel (sin mayusculas ni tildes)` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 54 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pintarLista()` connect `Visualización de piezas` to `Formulario de carga`, `Panel: carga y resumen`, `Sesión compartida`, `Modo edición y eliminar`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `Prodigo (museum project)`, `Servidor web estatico tienda/ (puerto 5500)`, `Vistas Ingreso / Carga / Listo (mostrar())` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Datos y colecciones PocketBase` be split into smaller, more focused modules?**
  _Cohesion score 0.08143939393939394 - nodes in this community are weakly interconnected._
- **Why does `Prodigo - Hoja de ruta` connect `Datos y colecciones PocketBase` to `Acceso y login de editores`, `Portada, encabezado y secciones`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `Formulario de carga` be split into smaller, more focused modules?**
  _Cohesion score 0.14210526315789473 - nodes in this community are weakly interconnected._
- **Why does `mostrarListo()` connect `Visualización de piezas` to `Formulario de carga`, `Panel: carga y resumen`, `Modo edición y eliminar`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._