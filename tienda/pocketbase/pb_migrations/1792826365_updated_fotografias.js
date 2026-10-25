/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3883340700")

  // update field
  collection.fields.addAt(15, new Field({
    "help": "Opcional. Necesario si el item va a tienda",
    "hidden": false,
    "id": "number380223906",
    "max": null,
    "min": null,
    "name": "precio_usd",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3883340700")

  // update field
  collection.fields.addAt(15, new Field({
    "help": "Opcional. Necesario si el item va a tienda",
    "hidden": false,
    "id": "number380223906",
    "max": null,
    "min": null,
    "name": "precio",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
