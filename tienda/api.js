// Dirección pública de PocketBase (el túnel desde la computadora donde corre), que usa la versión
// publicada en GitHub Pages. Vacía = no hay servidor público: lo publicado es solo una demostración.
// En la computadora donde corre PocketBase (o con un servidor web local) se usa siempre la local.
const PB_PUBLICO = "https://desktop-e020bk9.taila973ce.ts.net";   // Tailscale Funnel desde la PC de Maxi
const PUBLICADO = location.hostname.endsWith(".github.io");
const PB_URL = PUBLICADO ? PB_PUBLICO : "http://127.0.0.1:8090";

// Valor exacto de la opción "Venta" del campo destino (mismas mayúsculas que en el panel).
const DESTINO_VENTA = "Venta";

// Modo demostración: se lee la copia fija de datos/ que genera exportar_demo.py (solo lectura: el
// panel y la carga no guardan). Pasa en lo publicado si no hay servidor público o si no responde
// (por ejemplo, la computadora del túnel está apagada). Se decide al abrir la página: las funciones
// que lo usan esperan a servidorListo.
let MODO_DEMO = PUBLICADO && !PB_PUBLICO;
let SERVIDOR_CAIDO = false;
const servidorListo = (async () => {
  if (!PUBLICADO || !PB_PUBLICO) return;
  try {
    const r = await fetch(PB_URL + "/api/health", { cache: "no-store", signal: AbortSignal.timeout(6000) });
    if (!r.ok) throw new Error("PocketBase respondió " + r.status);
  } catch (err) {
    console.warn("El servidor no responde: se muestra la copia fija de datos/", err);
    MODO_DEMO = SERVIDOR_CAIDO = true;
  }
})();

async function demo(archivo) {
  // "no-cache": GitHub Pages deja guardar los archivos 10 minutos; así siempre se confirma que sean los últimos
  const r = await fetch(`datos/${archivo}.json`, { cache: "no-cache" });
  if (!r.ok) throw new Error("Falta datos/" + archivo + ".json");
  return r.json();
}

// Todos los registros de una colección (PocketBase los entrega de a páginas).
// Con token, como editor: ve también las piezas ocultas y el N.º de inventario.
async function pbTodos(coleccion, filtro = "", token = "") {
  let items = [], pagina = 1, d;
  do {
    const q = `perPage=500&page=${pagina}` + (filtro ? "&filter=" + encodeURIComponent(filtro) : "");
    const r = await fetch(`${PB_URL}/api/collections/${coleccion}/records?${q}`, token ? { headers: { Authorization: token } } : {});
    if (r.status === 401 || r.status === 403) throw new Error("sesion");
    if (!r.ok) throw new Error("PocketBase respondió " + r.status);
    d = await r.json();
    items = items.concat(d.items);
  } while (pagina++ < d.totalPages);
  return items;
}

// Categorías, colecciones, términos y piezas, ya relacionados entre sí:
// cada pieza trae _cat (su categoría), _colec (su colección o null) y _terminos (lista).
// soloVenta: solo las piezas de la tienda (destino Venta).
async function cargarCatalogo({ soloVenta = false, token = "" } = {}) {
  await servidorListo;
  const [categorias, colecciones, terminos, piezas] = MODO_DEMO
    ? await Promise.all(["categorias", "colecciones", "terminos", "piezas"].map(demo))
    : await Promise.all([
        pbTodos("categorias", "visible = true", token),
        pbTodos("colecciones", "", token),
        pbTodos("terminos", "", token),
        pbTodos("piezas", soloVenta ? `destino = "${DESTINO_VENTA}"` : "", token),
      ]);
  categorias.sort((a, b) => a.orden - b.orden);
  const porId = lista => Object.fromEntries(lista.map(x => [x.id, x]));
  const cats = porId(categorias), colecs = porId(colecciones), terms = porId(terminos);
  const lista = piezas
    .filter(p => cats[p.categoria] && (!soloVenta || p.destino === DESTINO_VENTA))
    .map(p => ({ ...p, _cat: cats[p.categoria], _colec: colecs[p.coleccion] || null, _terminos: (p.terminos || []).map(id => terms[id]).filter(Boolean) }));
  return { categorias, colecciones, terminos, piezas: lista };
}

// Una pieza, con sus relaciones (para la ficha y el formulario)
async function obtenerPieza(id, token = "") {
  await servidorListo;
  const { piezas, categorias, colecciones, terminos } = MODO_DEMO
    ? await cargarCatalogo()
    : await (async () => {
        const r = await fetch(`${PB_URL}/api/collections/piezas/records/${encodeURIComponent(id)}?expand=categoria,coleccion,terminos`,
          token ? { headers: { Authorization: token } } : {});
        if (!r.ok) throw new Error("PocketBase respondió " + r.status);
        const p = await r.json();
        const e = p.expand || {};
        return { piezas: [{ ...p, _cat: e.categoria, _colec: e.coleccion || null, _terminos: e.terminos || [] }] };
      })();
  const p = piezas.find(x => x.id === id);
  if (!p) throw new Error("No existe la pieza " + id);
  return p;
}

// Campos propios de la categoría de una pieza (definidos en categorias.campos)
const camposDe = cat => (cat && Array.isArray(cat.campos)) ? cat.campos : [];

// Nombre visible de un término (las firmas de estudio llevan su código adelante)
const nombreTermino = t => t.codigo ? `${t.codigo} · ${t.nombre}` : t.nombre;

// Valores de un campo propio en una pieza, como lista de textos
function valoresCampo(p, campo) {
  if (campo.tipo === "texto") return p.ficha && p.ficha[campo.clave] ? [String(p.ficha[campo.clave])] : [];
  return p._terminos.filter(t => t.tipo === campo.clave).map(nombreTermino);
}

// Período de una pieza ([desde, hasta]) o null si no tiene año
const periodoDe = p => p.anio_desde ? [p.anio_desde, p.anio_hasta || p.anio_desde] : null;

// "imagenes" llega como lista (o como texto si el campo admite un solo archivo)
function archivosDe(p) {
  return Array.isArray(p.imagenes) ? p.imagenes : (p.imagenes ? [p.imagenes] : []);
}

// Qué muestra cada foto (Frente, Reverso...), o "Vista n" si no se indicó
function caraDe(p, i) {
  return (Array.isArray(p.caras) && p.caras[i]) || (archivosDe(p).length > 1 ? `Vista ${i + 1}` : "Imagen principal");
}

function urlImagen(p, archivo, miniatura) {
  // shortcut: en la demo se usa siempre la foto entera (sin miniaturas); alcanza para pocas piezas
  if (MODO_DEMO) return `datos/fotos/${p.id}/${archivo}`;
  const base = `${PB_URL}/api/files/${p.collectionId}/${p.id}/${archivo}`;
  return miniatura ? `${base}?thumb=${miniatura}` : base;
}

// Precio de una pieza en venta; si no tiene, "Consultar precio"
function formatoPrecio(p) {
  const v = p.precio_usd ?? p.precio;
  return v ? "USD " + Number(v).toLocaleString("es-AR") : p.destino === DESTINO_VENTA ? "Consultar precio" : "";
}

// Para buscar sin importar mayúsculas ni tildes
const normalizar = s => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Todo el texto de una pieza en el que se puede buscar (incluye términos y sus variantes)
function textoDe(p) {
  return normalizar([p.titulo, p.fecha, p.descripcion, p.inscripciones, p.inventario, p._cat.nombre, p._colec?.nombre,
    ...p._terminos.flatMap(t => [t.nombre, t.codigo, t.variantes]), ...Object.values(p.ficha || {})].join(" "));
}

// Los textos vienen de la base de datos: se escapan antes de insertarlos en la página
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
