/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3883340700")

  // remove field
  collection.fields.removeById("text3195862477")

  // remove field
  collection.fields.removeById("text2302061302")

  // update field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "help": "Fondo o colección de origen. Ej: Bixio Fundador, Eugenio Bixio",
    "hidden": false,
    "id": "text767600357",
    "max": 0,
    "min": 0,
    "name": "coleccion",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(14, new Field({
    "autogeneratePattern": "",
    "help": "Alto x ancho en cm. Ej: 18 x 24 cm",
    "hidden": false,
    "id": "text4288420906",
    "max": 0,
    "min": 0,
    "name": "medidas",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3883340700")

  // add field
  collection.fields.addAt(16, new Field({
    "autogeneratePattern": "",
    "help": "Cómo llegó la pieza (donación, compra, etc.). Se muestra en la ficha.",
    "hidden": false,
    "id": "text3195862477",
    "max": 0,
    "min": 0,
    "name": "procedencia",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(17, new Field({
    "autogeneratePattern": "",
    "help": "Técnico, normalmente vacío. Dirección del archivo .dzi para el zoom.",
    "hidden": false,
    "id": "text2302061302",
    "max": 0,
    "min": 0,
    "name": "ruta_tiles",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "help": "Fondo o colección de origen. Ej: Bixio Fundador, Eugenio Bixio",
    "hidden": false,
    "id": "text767600357",
    "max": 0,
    "min": 0,
    "name": "fondo",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(14, new Field({
    "autogeneratePattern": "",
    "help": "Alto x ancho en cm. Ej: 18 x 24 cm",
    "hidden": false,
    "id": "text4288420906",
    "max": 0,
    "min": 0,
    "name": "medidas",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
