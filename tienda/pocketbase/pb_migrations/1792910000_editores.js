/// <reference path="../pb_data/types.d.ts" />
// Cuentas "editores": pueden cargar y editar piezas desde cargar.html,
// sin acceso al panel de administración. Las cuentas se crean desde el panel.

const ES_EDITOR = '@request.auth.collectionName = "editores"';

migrate((app) => {
  const editores = new Collection({
    type: "auth",
    name: "editores",
    listRule: null,
    viewRule: "id = @request.auth.id",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    passwordAuth: { enabled: true, identityFields: ["email"] },
  });
  editores.fields.add(new Field({
    type: "text",
    name: "nombre",
    help: "Nombre de la persona que carga piezas.",
    presentable: true,
  }));
  app.save(editores);

  const fotos = app.findCollectionByNameOrId("fotografias");
  fotos.createRule = ES_EDITOR;
  fotos.updateRule = ES_EDITOR;
  // Los editores también ven las piezas ocultas (para confirmar lo que cargaron)
  fotos.viewRule = "visible = true || " + ES_EDITOR;
  app.save(fotos);
}, (app) => {
  const fotos = app.findCollectionByNameOrId("fotografias");
  fotos.createRule = null;
  fotos.updateRule = null;
  fotos.viewRule = "visible = true";
  app.save(fotos);

  app.delete(app.findCollectionByNameOrId("editores"));
});
