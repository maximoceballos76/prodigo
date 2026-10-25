/// <reference path="../pb_data/types.d.ts" />
// Campo "color" en postales, para poder filtrar en la tienda por blanco y negro / color.
// Completa el valor de las 4 postales cargadas hasta ahora.

const VALORES = { "post-001": "Blanco y negro", "post-002": "Un solo tono (sepia, azul)", "post-003": "Blanco y negro", "post-004": "Blanco y negro" };

migrate((app) => {
  const col = app.findCollectionByNameOrId("postales");
  col.fields.addAt(col.fields.length - 2, new Field({
    type: "select",
    name: "color",
    help: "Para el filtro de la tienda.",
    values: ["Blanco y negro", "Un solo tono (sepia, azul)", "Color", "Coloreada a mano"],
    maxSelect: 1,
  }));
  app.save(col);

  for (const [inventario, color] of Object.entries(VALORES)) {
    try {
      const r = app.findFirstRecordByData("postales", "inventario", inventario);
      r.set("color", color);
      app.saveNoValidate(r);
    } catch (_) {} // la postal ya no existe: se saltea
  }
}, (app) => {
  const col = app.findCollectionByNameOrId("postales");
  col.fields.removeByName("color");
  app.save(col);
});
