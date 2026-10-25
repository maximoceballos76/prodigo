// Conexión con PocketBase. Si el servidor cambia de dirección, se cambia solo esta línea.
const PB_URL = "http://127.0.0.1:8090";

// Valor exacto de la opción "Venta" del campo destino (mismas mayúsculas que en el panel).
const DESTINO_VENTA = "Venta";

// Versión de exhibición publicada en GitHub Pages: no hay PocketBase, se lee la copia fija de
// datos/ que genera exportar_demo.py (solo lectura: el panel y la carga no funcionan ahí).
const MODO_DEMO = location.hostname.endsWith(".github.io");

async function pb(ruta) {
  const r = await fetch(PB_URL + ruta);
  if (!r.ok) throw new Error("PocketBase respondió " + r.status);
  return r.json();
}

async function demo(archivo) {
  const r = await fetch(`datos/${archivo}.json`);
  if (!r.ok) throw new Error("Falta datos/" + archivo + ".json");
  return r.json();
}

// Categorías visibles del menú, en el orden definido en el panel
async function listarCategorias() {
  if (MODO_DEMO) return demo("categorias");
  const filtro = encodeURIComponent("visible = true");
  const d = await pb(`/api/collections/categorias/records?filter=${filtro}&sort=orden&perPage=100`);
  return d.items;
}

// Piezas destinadas a la venta de una colección
async function listarPiezas(coleccion) {
  if (MODO_DEMO) return (await demo(coleccion)).filter(p => p.destino === DESTINO_VENTA);
  const filtro = encodeURIComponent(`destino = "${DESTINO_VENTA}"`);
  const d = await pb(`/api/collections/${coleccion}/records?filter=${filtro}&sort=-created&perPage=200`);
  return d.items;
}

async function obtenerPieza(coleccion, id) {
  if (MODO_DEMO) {
    const p = (await demo(coleccion)).find(x => x.id === id);
    if (!p) throw new Error("No existe la pieza " + id);
    return p;
  }
  return pb(`/api/collections/${encodeURIComponent(coleccion)}/records/${encodeURIComponent(id)}`);
}

// "imagenes" llega como lista (o como texto si el campo admite un solo archivo)
function archivosDe(p) {
  return Array.isArray(p.imagenes) ? p.imagenes : (p.imagenes ? [p.imagenes] : []);
}

function urlImagen(p, archivo, miniatura) {
  // shortcut: en la demo se usa siempre la foto entera (sin miniaturas); alcanza para pocas piezas
  if (MODO_DEMO) return `datos/fotos/${p.id}/${archivo}`;
  const base = `${PB_URL}/api/files/${p.collectionId}/${p.id}/${archivo}`;
  return miniatura ? `${base}?thumb=${miniatura}` : base;
}

function formatoPrecio(p) {
  const v = p.precio_usd ?? p.precio;
  return v ? "USD " + Number(v).toLocaleString("es-AR") : "";
}

// Los textos vienen de la base de datos: se escapan antes de insertarlos en la página
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}