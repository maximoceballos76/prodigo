// Datos de ejemplo, compartidos por el catálogo (index.html) y la ficha (pieza.html).
// Más adelante se reemplazan por el JSON o la base de datos real.
//
// Campos de imagen (todos opcionales):
//   imagenes: lista de { src, etiqueta }. Ej.: { src: "img/03-anverso.webp", etiqueta: "Anverso" }
//             La primera se usa también como miniatura en el catálogo.
//   dzi:      ruta al archivo .dzi (tiles) de la imagen principal, para el zoom profundo.
//             Se genera con: vips dzsave archivo.tif nombre-de-salida
const piezas = [
    {
      id: 1, titulo: "Pieza de ejemplo 01", categoria: "Fotografías", detalle: "Fecha y técnica a completar",
      precio: "USD 000", estado: "Disponible",
      fecha: "Sin fecha", tecnica: "A completar", medidas: "00 × 00 cm", conservacion: "A completar",
      procedencia: "Colección Alex", inventario: "PRO-0001",
      imagenes: [], dzi: ""
    },
    {
      id: 2, titulo: "Pieza de ejemplo 02", categoria: "Fotografías", detalle: "Fecha y técnica a completar",
      precio: "USD 000", estado: "Reservada",
      fecha: "Sin fecha", tecnica: "A completar", medidas: "00 × 00 cm", conservacion: "A completar",
      procedencia: "Colección Alex", inventario: "PRO-0002",
      imagenes: [], dzi: ""
    },
    {
      id: 3, titulo: "Pieza de ejemplo 03", categoria: "Documentos", detalle: "Fecha y técnica a completar",
      precio: "USD 000", estado: "Disponible",
      fecha: "Sin fecha", tecnica: "A completar", medidas: "00 × 00 cm", conservacion: "A completar",
      procedencia: "Colección Alex", inventario: "PRO-0003",
      imagenes: [{ src: "", etiqueta: "Anverso" }, { src: "", etiqueta: "Reverso" }], dzi: ""
    },
    {
      id: 4, titulo: "Pieza de ejemplo 04", categoria: "Grabados", detalle: "Fecha y técnica a completar",
      precio: "USD 000", estado: "Disponible",
      fecha: "Sin fecha", tecnica: "A completar", medidas: "00 × 00 cm", conservacion: "A completar",
      procedencia: "Colección Alex", inventario: "PRO-0004",
      imagenes: [], dzi: ""
    },
    {
      id: 5, titulo: "Pieza de ejemplo 05", categoria: "Objetos", detalle: "Fecha y técnica a completar",
      precio: "USD 000", estado: "Disponible",
      fecha: "Sin fecha", tecnica: "A completar", medidas: "00 × 00 cm", conservacion: "A completar",
      procedencia: "Colección Alex", inventario: "PRO-0005",
      imagenes: [], dzi: ""
    },
    {
      id: 6, titulo: "Pieza de ejemplo 06", categoria: "Documentos", detalle: "Fecha y técnica a completar",
      precio: "USD 000", estado: "Disponible",
      fecha: "Sin fecha", tecnica: "A completar", medidas: "00 × 00 cm", conservacion: "A completar",
      procedencia: "Colección Alex", inventario: "PRO-0006",
      imagenes: [], dzi: ""
    }
  ];