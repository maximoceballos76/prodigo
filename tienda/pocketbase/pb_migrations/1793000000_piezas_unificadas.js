/// <reference path="../pb_data/types.d.ts" />
// Base única para la tienda y el museo:
//   colecciones  fondos de origen (F. Bixio y Cía., Bixio y Castiglioni, ...).
//   terminos     vocabulario controlado: autores, personas, encuadre, marca, editorial, ...
//                Cada término se escribe una sola vez y las piezas lo eligen de la lista.
//   piezas       TODAS las piezas en una sola colección, con relación a su categoría.
//                Los campos propios de cada categoría se definen en categorias.campos:
//                los de tipo "termino" van en piezas.terminos, los de tipo "texto" en piezas.ficha.
// Mueve las piezas de fotografias, postales y maquinas_de_escribir (mismo id, mismas fotos)
// y borra esas tres colecciones. No se puede deshacer: para volver atrás, restaurar
// backups/pb_data_20261030_002219_antes_piezas_unificadas.

const ES_EDITOR = '@request.auth.collectionName = "editores"';
const VIEJAS = ["fotografias", "postales", "maquinas_de_escribir"];

const termino = (clave, etiqueta, extra) => ({ clave, etiqueta, tipo: "termino", filtro: true, ...extra });
const texto = (clave, etiqueta, extra) => ({ clave, etiqueta, tipo: "texto", ...extra });

// Campos propios de cada categoría. "multiple": se puede elegir más de un término.
// "porColeccion": cada colección tiene su propia lista (las firmas de estudio).
const CAMPOS = {
  fotografias: [
    termino("autor", "Autor", { multiple: true, ayuda: "Fotógrafo o estudio." }),
    termino("persona_identificada", "Personas identificadas", { multiple: true, ayuda: "Nombre y apellido de quienes aparecen, si se conocen." }),
    termino("personas", "Personas", { multiple: true, ayuda: "Quiénes aparecen: mujeres, hombres, niños..." }),
    termino("tipo_imagen", "Tipo de imagen"),
    termino("retrato", "Tipo de retrato"),
    termino("encuadre", "Encuadre"),
    termino("orientacion", "Orientación"),
    termino("color", "Color"),
    termino("ambiente", "Ambiente"),
    termino("objeto", "Objetos", { multiple: true }),
    termino("destacado", "Destacados", { multiple: true }),
    termino("firma", "Firma del estudio", { multiple: true, porColeccion: true, ayuda: "Sello o firma del estudio en el frente o el reverso." }),
    termino("soporte", "Soporte"),
    termino("proceso", "Proceso"),
    texto("numero_original", "Número original", { ayuda: "Número de negativo o de copia que figura en la pieza." }),
  ],
  postales: [
    termino("editorial", "Editorial", { ayuda: "Casa editora o impresor." }),
    termino("lugar", "Lugar", { ayuda: "Lugar que muestra la postal." }),
    termino("tecnica", "Técnica"),
    termino("color", "Color"),
    termino("circulacion", "Circulación", { ayuda: "Si fue enviada por correo (tiene sello o matasellos)." }),
  ],
  maquinas_de_escribir: [
    termino("marca", "Marca"),
    texto("modelo", "Modelo", { ayuda: "Ej: Lettera 32" }),
    termino("origen", "País de origen"),
    texto("numero_serie", "N.º de serie"),
    termino("teclado", "Teclado"),
    termino("funcionamiento", "Funcionamiento"),
  ],
};

// Campo viejo (texto) -> tipo de término, por colección vieja
const A_TERMINOS = {
  fotografias: { fotografo: "autor", soporte: "soporte", proceso: "proceso" },
  postales: { editorial: "editorial", lugar: "lugar", tecnica: "tecnica", color: "color", circulada: "circulacion" },
  maquinas_de_escribir: { marca: "marca", origen: "origen", teclado: "teclado", funcionamiento: "funcionamiento" },
};
const A_FICHA = { maquinas_de_escribir: ["modelo", "numero_serie"] };
const SIN_AUTOR = ["Se desconoce", "Otros"];   // no son autores: la pieza queda sin autor
const SIN_COLECCION = ["Desconocida"];          // ídem para la colección
const COMUNES = ["titulo", "inventario", "destino", "precio_usd", "estado", "visible", "descripcion",
  "fecha", "medidas", "inscripciones", "archivo_master", "fuente"];

const slug = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Mismo criterio que pb_hooks/fecha.js: primer año = desde, segundo (o el mismo) = hasta
function anios(fecha) {
  const a = String(fecha || "").match(/\b\d{4}\b/g) || [];
  return a.length ? [Number(a[0]), Number(a[1] || a[0])] : [null, null];
}

migrate((app) => {
  const colecciones = new Collection({
    type: "base",
    name: "colecciones",
    listRule: "",
    viewRule: "",
    createRule: ES_EDITOR,
    updateRule: ES_EDITOR,
    deleteRule: null,
    indexes: ["CREATE UNIQUE INDEX idx_colecciones_slug ON colecciones (slug)"],
  });
  [
    { type: "text", name: "nombre", required: true, presentable: true, help: "Nombre del fondo o colección de origen. Ej: F. Bixio y Cía." },
    { type: "text", name: "slug", required: true, help: "En minúsculas, sin acentos ni espacios. Ej: bixio" },
    { type: "text", name: "descripcion", help: "Texto corto opcional sobre la colección." },
    { type: "autodate", name: "created", onCreate: true },
    { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
  ].forEach(c => colecciones.fields.add(new Field(c)));
  app.save(colecciones);

  const terminos = new Collection({
    type: "base",
    name: "terminos",
    listRule: "",
    viewRule: "",
    createRule: ES_EDITOR,
    updateRule: ES_EDITOR,
    deleteRule: null,
    indexes: [
      "CREATE UNIQUE INDEX idx_terminos_unico ON terminos (tipo, nombre, coleccion)",
      "CREATE INDEX idx_terminos_tipo ON terminos (tipo)",
    ],
  });
  [
    { type: "text", name: "tipo", required: true, help: "Lista a la que pertenece (la «clave» del campo en categorias.campos). Ej: autor, encuadre, marca" },
    { type: "text", name: "nombre", required: true, presentable: true, help: "Como se muestra en la web. Ej: Florencio Bixio" },
    { type: "text", name: "codigo", help: "Opcional. Código interno, ej. BIX-03 para una firma de estudio." },
    { type: "relation", name: "coleccion", collectionId: colecciones.id, maxSelect: 1, help: "Solo para listas propias de cada colección (firmas de estudio)." },
    { type: "text", name: "variantes", help: "Otras formas de escribirlo, separadas por coma, para que el buscador también las encuentre. Ej: E. Bixio, Bixio" },
    { type: "autodate", name: "created", onCreate: true },
    { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
  ].forEach(c => terminos.fields.add(new Field(c)));
  app.save(terminos);

  const cats = app.findCollectionByNameOrId("categorias");
  cats.fields.add(new Field({
    type: "json", name: "campos",
    help: "Campos propios de la categoría (los usan la carga, la ficha y los filtros). Ver DOCUMENTACION.txt.",
  }));
  app.save(cats);

  const piezas = new Collection({
    type: "base",
    name: "piezas",
    listRule: "visible = true || " + ES_EDITOR,
    viewRule: "visible = true || " + ES_EDITOR,
    createRule: ES_EDITOR,
    updateRule: ES_EDITOR,
    deleteRule: ES_EDITOR,
    indexes: [
      "CREATE UNIQUE INDEX idx_piezas_inventario ON piezas (inventario)",
      "CREATE INDEX idx_piezas_categoria ON piezas (categoria)",
      "CREATE INDEX idx_piezas_destino ON piezas (destino)",
    ],
  });
  [
    { type: "file", name: "imagenes", help: "Fotos de la pieza (JPG, PNG o WEBP). La primera es la que se ve en el catálogo.",
      maxSelect: 10, maxSize: 52428800, mimeTypes: ["image/jpeg", "image/png", "image/webp"], thumbs: ["100x100", "400x0", "1200x0"] },
    { type: "json", name: "caras", help: "Qué muestra cada foto, en el mismo orden: [\"Frente\", \"Reverso\", ...]. Lo completa la carga." },
    { type: "text", name: "titulo", required: true, presentable: true, help: "Nombre de la pieza tal como aparece en la web." },
    { type: "text", name: "inventario", required: true, help: "Código de inventario, distinto para cada pieza de todo el museo." },
    { type: "relation", name: "categoria", collectionId: cats.id, maxSelect: 1, required: true, help: "Tipo de pieza." },
    { type: "relation", name: "coleccion", collectionId: colecciones.id, maxSelect: 1, help: "Fondo o colección de origen." },
    { type: "select", name: "destino", maxSelect: 1, values: ["Museo Miranda", "Museo Ezeiza", "Venta", "Sin Definir"], help: "A dónde va la pieza. Elegí «Venta» para que aparezca en la tienda." },
    { type: "number", name: "precio_usd", min: 0, help: "Precio en dólares. Obligatorio si el destino es Venta." },
    { type: "select", name: "estado", maxSelect: 1, values: ["Disponible", "Reservada", "Vendida"], help: "Solo para piezas en venta. Si queda vacío se guarda como «Disponible»." },
    { type: "bool", name: "visible", help: "Tildá esta casilla para que la pieza se vea en la web." },
    { type: "text", name: "descripcion", help: "Texto de la ficha: historia y datos interesantes de la pieza." },
    { type: "text", name: "fecha", help: "Año o fecha aproximada, como se muestra. Ej: 1895, c. 1900, 1915-1920" },
    { type: "number", name: "anio_desde", onlyInt: true, help: "Se calcula solo a partir de la fecha (para filtrar y ordenar por período)." },
    { type: "number", name: "anio_hasta", onlyInt: true, help: "Se calcula solo a partir de la fecha." },
    { type: "text", name: "medidas", help: "Alto x ancho (x profundidad) en cm. Ej: 18 x 24 cm" },
    { type: "text", name: "inscripciones", help: "Sellos, dedicatorias o textos escritos en la pieza." },
    { type: "relation", name: "terminos", collectionId: terminos.id, maxSelect: 500, help: "Valores de las listas propias de la categoría (autor, encuadre, marca...)." },
    { type: "json", name: "ficha", help: "Datos de texto propios de la categoría. Ej: {\"modelo\": \"Lettera 32\"}" },
    { type: "text", name: "archivo_master", help: "Ruta del TIF original en el disco de archivo. Ej: bixio/img024.tif" },
    { type: "text", name: "fuente", hidden: true, help: "Interno. Origen de la imagen y su licencia, o de dónde se importó. No se muestra en la web." },
    { type: "autodate", name: "created", onCreate: true },
    { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
  ].forEach(c => piezas.fields.add(new Field(c)));
  app.save(piezas);

  // Campos de cada categoría
  const catPorSlug = {};
  for (const [s, campos] of Object.entries(CAMPOS)) {
    try {
      const c = app.findFirstRecordByData("categorias", "slug", s);
      c.set("campos", campos);
      app.save(c);
      catPorSlug[s] = c.id;
    } catch (_) {} // la categoría no existe en esta base: se saltea
  }

  // Términos y colecciones se crean a medida que aparecen
  const cache = {};
  const terminoId = (tipo, nombre) => {
    nombre = String(nombre || "").trim();
    if (!nombre) return null;
    const k = tipo + "|" + nombre;
    if (!cache[k]) {
      const r = new Record(terminos);
      r.load({ tipo, nombre });
      app.save(r);
      cache[k] = r.id;
    }
    return cache[k];
  };
  const colecId = nombre => {
    nombre = String(nombre || "").trim();
    if (!nombre || SIN_COLECCION.includes(nombre)) return "";
    const k = "colec|" + nombre;
    if (!cache[k]) {
      const r = new Record(colecciones);
      r.load({ nombre, slug: slug(nombre) });
      app.save(r);
      cache[k] = r.id;
    }
    return cache[k];
  };

  // Mover las piezas de las colecciones viejas
  const storage = app.dataDir() + "/storage/";
  for (const vieja of VIEJAS) {
    let col;
    try { col = app.findCollectionByNameOrId(vieja); } catch (_) { continue; }
    for (const p of app.findAllRecords(vieja)) {
      const r = new Record(piezas);
      r.set("id", p.id);   // mismo id: los enlaces pieza.html?id=... siguen sirviendo
      COMUNES.forEach(k => r.set(k, p.get(k)));
      const [desde, hasta] = anios(p.getString("fecha"));
      r.set("anio_desde", desde);
      r.set("anio_hasta", hasta);
      r.set("categoria", catPorSlug[vieja]);
      if (vieja === "fotografias") r.set("coleccion", colecId(p.getString("coleccion")));

      const ids = [];
      for (const [campo, tipo] of Object.entries(A_TERMINOS[vieja])) {
        const v = p.getString(campo);
        if (tipo === "autor" && SIN_AUTOR.includes(v)) continue;
        const id = terminoId(tipo, v);
        if (id) ids.push(id);
      }
      r.set("terminos", ids);
      const ficha = {};
      (A_FICHA[vieja] || []).forEach(k => { if (p.getString(k)) ficha[k] = p.getString(k); });
      r.set("ficha", ficha);

      const archivos = p.getStringSlice("imagenes");
      r.set("imagenes", archivos.map(a => $filesystem.fileFromPath(storage + col.id + "/" + p.id + "/" + a)));
      r.set("caras", []);
      app.save(r);
    }
    app.delete(col);
  }
}, (app) => {
  throw new Error("Esta migración no se deshace: restaurar backups/pb_data_20261030_002219_antes_piezas_unificadas.");
});
