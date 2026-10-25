/// <reference path="../pb_data/types.d.ts" />
// Campo interno "fuente" en las colecciones de piezas: de dónde salió la imagen
// (ej. las piezas de ejemplo del prototipo, bajadas de Wikimedia Commons).
// Es "hidden": la API solo lo devuelve a los administradores; la web no lo ve.

const COLECCIONES = ["fotografias", "postales", "maquinas_de_escribir"];

migrate((app) => {
  for (const nombre of COLECCIONES) {
    const col = app.findCollectionByNameOrId(nombre);
    col.fields.addAt(col.fields.length - 2, new Field({
      type: "text",
      name: "fuente",
      help: "Interno. Origen de la imagen y su licencia. No se muestra en la web.",
      hidden: true,
    }));
    app.save(col);
  }
}, (app) => {
  for (const nombre of COLECCIONES) {
    const col = app.findCollectionByNameOrId(nombre);
    col.fields.removeByName("fuente");
    app.save(col);
  }
});
