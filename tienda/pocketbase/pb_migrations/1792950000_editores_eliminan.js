/// <reference path="../pb_data/types.d.ts" />
// Los editores pueden eliminar piezas (desde cargar.html en modo edición).
// Antes solo podían crear y modificar; eliminar quedaba reservado a los administradores.

const ES_EDITOR = '@request.auth.collectionName = "editores"';
const COLECCIONES = ["fotografias", "postales", "maquinas_de_escribir"];

migrate((app) => {
  for (const nombre of COLECCIONES) {
    const col = app.findCollectionByNameOrId(nombre);
    col.deleteRule = ES_EDITOR;
    app.save(col);
  }
}, (app) => {
  for (const nombre of COLECCIONES) {
    const col = app.findCollectionByNameOrId(nombre);
    col.deleteRule = null;
    app.save(col);
  }
});
