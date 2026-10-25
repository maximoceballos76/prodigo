/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3883340700")

  // remove field
  collection.fields.removeById("text1822803349")

  // remove field
  collection.fields.removeById("text1232382636")

  // add field
  collection.fields.addAt(9, new Field({
    "help": "",
    "hidden": false,
    "id": "select1822803349",
    "maxSelect": 0,
    "name": "fotografo",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Bixio Fundador",
      "E. Bixio",
      "Se desconoce",
      "Otros"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3883340700")

  // add field
  collection.fields.addAt(9, new Field({
    "autogeneratePattern": "",
    "help": "Autor de la foto. Si no se conoce, dejar vacío.",
    "hidden": false,
    "id": "text1822803349",
    "max": 0,
    "min": 0,
    "name": "fotografo",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "help": "Ciudad o lugar donde se tomó. Ej: Buenos Aires",
    "hidden": false,
    "id": "text1232382636",
    "max": 0,
    "min": 0,
    "name": "lugar",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select1822803349")

  return app.save(collection)
})
