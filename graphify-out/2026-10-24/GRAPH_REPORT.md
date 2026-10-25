# Graph Report - prodigo  (2026-10-24)

## Corpus Check
- Corpus is ~6,330 words - fits in a single context window. You may not need a graph.

## Summary
- 64 nodes · 76 edges · 18 communities (6 shown, 12 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 73,307 input · 0 output

## Community Hubs (Navigation)
- Formulario de carga
- Visualización de piezas
- Cliente API PocketBase
- Login de editores
- Páginas y paleta
- Migración simplificar carga
- Reglas de graphify
- Datos de ejemplo

## God Nodes (most connected - your core abstractions)
1. `form-pieza submit handler` - 8 edges
2. `pieza iniciar()` - 8 edges
3. `mostrarListo()` - 7 edges
4. `pintarPiezas()` - 7 edges
5. `esc()` - 5 edges
6. `index iniciar()` - 5 edges
7. `pb()` - 4 edges
8. `archivosDe()` - 4 edges
9. `urlImagen()` - 4 edges
10. `cargar iniciar()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `pieza iniciar()` --calls--> `obtenerPieza()`  [EXTRACTED]
  ale/pieza.html → ale/api.js
- `marcarError()` --calls--> `esc()`  [EXTRACTED]
  ale/cargar.html → ale/api.js
- `pintarCategorias()` --calls--> `esc()`  [EXTRACTED]
  ale/index.html → ale/api.js
- `pintarPiezas()` --calls--> `esc()`  [EXTRACTED]
  ale/index.html → ale/api.js
- `pieza iniciar()` --calls--> `esc()`  [EXTRACTED]
  ale/pieza.html → ale/api.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Pages consuming api.js PocketBase helpers** — ale_index_iniciar, ale_pieza_iniciar, ale_cargar_mostrarlisto, ale_api_archivosde, ale_api_urlimagen [EXTRACTED 1.00]
- **Piece upload validation and submit flow** — ale_cargar_form_submit, ale_cargar_revisar, ale_cargar_leerprecio, ale_cargar_mostrarerrores, ale_cargar_marcarerror, ale_cargar_mensajes [EXTRACTED 1.00]
- **Shared palette theme across pages** — ale_index, ale_pieza, ale_cargar, ale_index_prodigo_paleta [EXTRACTED 1.00]

## Communities (18 total, 12 thin omitted)

### Community 0 - "Formulario de carga"
Cohesion: 0.21
Nodes (12): agregarFotos(), COLECCION = fotografias, form-pieza submit handler, leerPrecio(), limpiarError(), limpiarErrores(), limpiarFormulario(), marcarError() (+4 more)

### Community 1 - "Visualización de piezas"
Cohesion: 0.29
Nodes (9): archivosDe(), formatoPrecio(), urlImagen(), mostrarListo(), Piece record fields (titulo, inventario, medidas, destino, precio_usd, estado, imagenes, visible), pintarPiezas(), CAMPOS (catalog fields to display), pieza iniciar() (+1 more)

### Community 2 - "Cliente API PocketBase"
Cohesion: 0.43
Nodes (7): esc(), listarCategorias(), listarPiezas(), obtenerPieza(), pb(), index iniciar(), pintarCategorias()

### Community 3 - "Login de editores"
Cohesion: 0.33
Nodes (5): abrirFormulario(), Editor auth via PocketBase (editores / _superusers), cargar iniciar(), mostrar(), renovar()

### Community 4 - "Páginas y paleta"
Cohesion: 0.40
Nodes (6): cargar.html (piece upload form), index.html (shop catalog), Palette switcher (papel/arena/niebla), prodigo-paleta localStorage theme, pieza.html (piece detail page), Prodigo (museum project)

### Community 5 - "Migración simplificar carga"
Cohesion: 0.40
Nodes (5): ANTES, aplicar(), CATEGORIAS, FOTOGRAFIAS, revertir()

## Knowledge Gaps
- **5 isolated node(s):** `Prodigo (museum project)`, `COLECCION = fotografias`, `MENSAJES (PocketBase error code map)`, `Palette switcher (papel/arena/niebla)`, `mailto inquiry link`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 25 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `mostrarListo()` connect `Visualización de piezas` to `Formulario de carga`, `Cliente API PocketBase`, `Login de editores`, `Páginas y paleta`?**
  _High betweenness centrality (0.231) - this node is a cross-community bridge._
- **What connects `Prodigo (museum project)`, `COLECCION = fotografias`, `MENSAJES (PocketBase error code map)` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `form-pieza submit handler` connect `Formulario de carga` to `Visualización de piezas`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `mostrar()` connect `Login de editores` to `Visualización de piezas`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._