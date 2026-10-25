/// <reference path="../pb_data/types.d.ts" />
// Simplifica la carga en el panel: ordena los campos de lo más usado a lo técnico
// y pone una ayuda clara en cada uno. No renombra, borra ni cambia el tipo de ningún
// campo, así que la web y los datos existentes siguen igual.

// [campo, ayuda, ajustes extra]
const FOTOGRAFIAS = [
  ["imagenes", "Fotos de la pieza (JPG, PNG o WEBP). La primera es la que se ve en el catálogo.", {
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    thumbs: ["100x100", "400x0", "1200x0"],
    maxSize: 52428800,
  }],
  ["titulo", "Nombre de la pieza tal como aparece en la web. Ej: Retrato de Lucio V. Mansilla", { presentable: true }],
  ["inventario", "Código de inventario, distinto para cada pieza. Ej: img-446", {}],
  ["destino", "A dónde va la pieza. Elegí «Venta» para que aparezca en la tienda.", {}],
  ["precio_usd", "Precio en dólares. Obligatorio si el destino es Venta.", { min: 0 }],
  ["estado", "Solo para piezas en venta. Si queda vacío se guarda como «Disponible».", {}],
  ["visible", "Tildá esta casilla para que la pieza se vea en la web.", {}],
  ["descripcion", "Texto de la ficha: historia y datos interesantes de la pieza.", {}],
  ["fotografo", "Autor de la foto. Si no se conoce, dejar vacío.", {}],
  ["fecha", "Año o fecha aproximada. Ej: 1895, c. 1900", {}],
  ["lugar", "Ciudad o lugar donde se tomó. Ej: Buenos Aires", {}],
  ["fondo", "Fondo o colección de origen. Ej: Bixio Fundador, Eugenio Bixio", {}],
  ["soporte", "Ej: positivo en papel, negativo, placa de vidrio", {}],
  ["proceso", "Ej: original, copia digital", {}],
  ["medidas", "Alto x ancho en cm. Ej: 18 x 24 cm", {}],
  ["inscripciones", "Sellos, dedicatorias o textos escritos en la pieza.", {}],
  ["procedencia", "Cómo llegó la pieza (donación, compra, etc.). Se muestra en la ficha.", {}],
  ["ruta_tiles", "Técnico, normalmente vacío. Dirección del archivo .dzi para el zoom.", {}],
  ["archivo_master", "Técnico, opcional. Nombre del archivo original en alta resolución.", {}],
];

const CATEGORIAS = [
  ["nombre", "Nombre que se ve en el menú de la web. Ej: Fotografías", { presentable: true }],
  ["slug", "Nombre de la colección, en minúsculas y sin acentos. Ej: fotografias", {}],
  ["descripcion", "Texto corto opcional sobre la categoría.", {}],
  ["orden", "Posición en el menú: 1 va primero, 2 después, etc.", {}],
  ["visible", "Tildá esta casilla para que la categoría aparezca en el menú.", {}],
];

// Valores anteriores, para poder deshacer la migración
const ANTES = {
  fotografias: {
    orden: ["inventario", "titulo", "descripcion", "fondo", "fotografo", "fecha", "lugar", "proceso", "soporte",
      "medidas", "inscripciones", "estado", "procedencia", "destino", "precio_usd", "imagenes", "ruta_tiles",
      "archivo_master", "visible"],
    ayuda: {
      inventario: "Nombre en el archivo, ej: img-446.tif",
      descripcion: "Datos interesantes e información útil",
      fondo: "Ej: Bixio Fundador, Eugenio Bixio, etc.",
      fotografo: "si se conoce",
      proceso: "copia digital, etc, etc",
      soporte: "Positivo en papel, negativo, placa de cartón, etc",
      medidas: "vertical x horizontal cm (18 x 24 cm)",
      inscripciones: "Sellos, dedicatorias, mensajes, etc.",
      precio_usd: "Opcional. Necesario si el item va a tienda",
    },
    extra: {
      imagenes: { mimeTypes: [], thumbs: ["1200x0"], maxSize: 0 },
      titulo: { presentable: false },
      precio_usd: { min: null },
    },
  },
  categorias: {
    orden: ["nombre", "slug", "descripcion", "orden", "visible"],
    ayuda: {},
    extra: { nombre: { presentable: false } },
  },
};

// Aplica ayudas y ajustes, y mueve los campos al orden dado (después del id).
// Saltea los campos que ya no existen (lugar, fondo, procedencia y ruta_tiles se
// borraron o renombraron en migraciones con fecha anterior a esta).
function aplicar(collection, lista) {
  let i = 0;
  lista.forEach(([nombre, ayuda, extra]) => {
    const campo = collection.fields.getByName(nombre);
    if (!campo) return;
    campo.help = ayuda;
    for (const k in extra) campo[k] = extra[k];
    collection.fields.addAt(++i, campo);
  });
}

function revertir(collection, antes) {
  aplicar(collection, antes.orden.map(n => [n, antes.ayuda[n] || "", antes.extra[n] || {}]));
}

migrate((app) => {
  const fotos = app.findCollectionByNameOrId("fotografias");
  aplicar(fotos, FOTOGRAFIAS);
  app.save(fotos);

  const cats = app.findCollectionByNameOrId("categorias");
  aplicar(cats, CATEGORIAS);
  app.save(cats);
}, (app) => {
  const fotos = app.findCollectionByNameOrId("fotografias");
  revertir(fotos, ANTES.fotografias);
  app.save(fotos);

  const cats = app.findCollectionByNameOrId("categorias");
  revertir(cats, ANTES.categorias);
  app.save(cats);
});
