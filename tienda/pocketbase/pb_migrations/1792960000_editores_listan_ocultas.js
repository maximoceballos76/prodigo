/// <reference path="../pb_data/types.d.ts" />
// El panel (admin.html) lista todas las piezas, también las ocultas: los editores
// pueden listarlas. El público sigue viendo solo las visibles.

const ES_EDITOR = '@request.auth.collectionName = "editores"';
const COLECCIONES = ["fotografias", "postales", "maquinas_de_escribir"];

migrate((app) => {
  for (const nombre of COLECCIONES) {
    const col = app.findCollectionByNameOrId(nombre);
    col.listRule = "visible = true || " + ES_EDITOR;
    app.save(col);
  }
}, (app) => {
  for (const nombre of COLECCIONES) {
    const col = app.findCollectionByNameOrId(nombre);
    col.listRule = "visible = true";
    app.save(col);
  }
});
