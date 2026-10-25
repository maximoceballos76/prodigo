/// <reference path="../pb_data/types.d.ts" />
// Dos categorías nuevas, cada una con su colección de piezas: "postales" y
// "maquinas_de_escribir". Los campos comunes (fotos, título, inventario, destino,
// precio, estado, visible, descripción, medidas) son iguales a los de fotografias
// para que la web, cargar.html y los hooks de venta funcionen igual.

const ES_EDITOR = '@request.auth.collectionName = "editores"';

const texto = (name, help, extra) => ({ type: "text", name, help, ...extra });
const opciones = (name, help, values) => ({ type: "select", name, help, values, maxSelect: 1 });

const COMUNES = [
  { type: "file", name: "imagenes", help: "Fotos de la pieza (JPG, PNG o WEBP). La primera es la que se ve en el catálogo.",
    maxSelect: 10, maxSize: 52428800, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["100x100", "400x0", "1200x0"] },
  texto("titulo", "Nombre de la pieza tal como aparece en la web.", { required: true, presentable: true }),
  texto("inventario", "Código de inventario, distinto para cada pieza.", { required: true }),
  opciones("destino", "A dónde va la pieza. Elegí «Venta» para que aparezca en la tienda.", ["Museo Miranda", "Museo Ezeiza", "Venta", "Sin Definir"]),
  { type: "number", name: "precio_usd", help: "Precio en dólares. Obligatorio si el destino es Venta.", min: 0 },
  opciones("estado", "Solo para piezas en venta. Si queda vacío se guarda como «Disponible».", ["Disponible", "Reservada", "Vendida"]),
  { type: "bool", name: "visible", help: "Tildá esta casilla para que la pieza se vea en la web." },
  texto("descripcion", "Texto de la ficha: historia y datos interesantes de la pieza."),
];

const COLECCIONES = {
  postales: [
    ...COMUNES,
    texto("medidas", "Alto x ancho en cm. Ej: 9 x 14 cm", { required: true }),
    texto("editorial", "Casa editora o impresor. Ej: Peuser"),
    texto("fecha", "Año o fecha aproximada. Ej: 1905, c. 1910"),
    texto("lugar", "Lugar que muestra la postal. Ej: Plaza de Mayo, Buenos Aires"),
    texto("tecnica", "Ej: fototipia, litografía, fotografía coloreada"),
    opciones("circulada", "Si fue enviada por correo (tiene sello o matasellos).", ["Circulada", "Sin circular"]),
    texto("inscripciones", "Texto manuscrito, sellos o matasellos."),
  ],
  maquinas_de_escribir: [
    ...COMUNES,
    texto("medidas", "Alto x ancho x profundidad en cm. Ej: 25 x 45 x 40 cm", { required: true }),
    texto("marca", "Ej: Olivetti, Remington, Underwood"),
    texto("modelo", "Ej: Lettera 32"),
    texto("fecha", "Año o fecha aproximada de fabricación. Ej: 1963, c. 1920"),
    texto("origen", "País de fabricación. Ej: Italia"),
    texto("numero_serie", "Número de serie grabado en la máquina."),
    texto("teclado", "Distribución del teclado. Ej: QWERTY, español"),
    opciones("funcionamiento", "Estado mecánico de la máquina.", ["Funciona", "Funciona con fallas", "No funciona", "Sin probar"]),
  ],
};

const CATEGORIAS = [
  { nombre: "Postales", slug: "postales", descripcion: "Postales de la colección", orden: 2 },
  { nombre: "Máquinas de escribir", slug: "maquinas_de_escribir", descripcion: "Máquinas de escribir de la colección", orden: 3 },
];

migrate((app) => {
  for (const [name, campos] of Object.entries(COLECCIONES)) {
    const col = new Collection({
      type: "base",
      name,
      listRule: "visible = true",
      viewRule: "visible = true || " + ES_EDITOR,
      createRule: ES_EDITOR,
      updateRule: ES_EDITOR,
      deleteRule: null,
      indexes: [`CREATE UNIQUE INDEX idx_${name}_inventario ON ${name} (inventario)`],
    });
    campos.forEach(c => col.fields.add(new Field(c)));
    col.fields.add(new Field({ type: "autodate", name: "created", onCreate: true }));
    col.fields.add(new Field({ type: "autodate", name: "updated", onCreate: true, onUpdate: true }));
    app.save(col);
  }

  const cats = app.findCollectionByNameOrId("categorias");
  for (const c of CATEGORIAS) {
    const r = new Record(cats);
    r.load({ ...c, visible: true });
    app.save(r);
  }
}, (app) => {
  for (const c of CATEGORIAS) {
    try { app.delete(app.findFirstRecordByData("categorias", "slug", c.slug)); } catch (_) {}
  }
  for (const name of Object.keys(COLECCIONES)) app.delete(app.findCollectionByNameOrId(name));
});
