// Sesión de editores y administradores, compartida por cargar.html y admin.html.
// Se guarda en localStorage: ingresar en una de las dos páginas sirve para la otra. Necesita api.js (PB_URL).
const CLAVE_SESION = "prodigo-sesion";

function recordarSesion(s) {
  try { s ? localStorage.setItem(CLAVE_SESION, JSON.stringify(s)) : localStorage.removeItem(CLAVE_SESION); } catch (_) {}
}

// Demo en GitHub Pages: no hay PocketBase, así que se entra sin contraseña y nada se guarda
const SESION_DEMO = { token: "", nombre: "Demostración", coleccion: "demo" };
if (MODO_DEMO) {
  document.body.insertAdjacentHTML("afterbegin",
    `<p class="aviso-demo">Versión de demostración: podés recorrer el panel y el formulario, pero los cambios no se guardan.</p>`);
}

async function ingresar(correo, clave) {
  if (MODO_DEMO) return SESION_DEMO;
  // Primero como editor; si no, como administrador del panel
  for (const coleccion of ["editores", "_superusers"]) {
    const r = await fetch(`${PB_URL}/api/collections/${coleccion}/auth-with-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identity: correo, password: clave }),
    });
    if (r.ok) {
      const d = await r.json();
      return { token: d.token, nombre: d.record.nombre || d.record.email, coleccion };
    }
  }
  return null;
}

// Comprueba que la sesión siga vigente (y la renueva)
async function renovar(s) {
  const r = await fetch(`${PB_URL}/api/collections/${s.coleccion}/auth-refresh`, {
    method: "POST", headers: { Authorization: s.token },
  });
  if (!r.ok) return null;
  const d = await r.json();
  return { ...s, token: d.token };
}

// La sesión guardada, renovada; o null si no hay o venció
async function sesionVigente() {
  if (MODO_DEMO) return SESION_DEMO;
  let guardada = null;
  try { guardada = JSON.parse(localStorage.getItem(CLAVE_SESION)); } catch (_) {}
  if (!guardada) return null;
  let s = null;
  try { s = await renovar(guardada); } catch (err) { console.error(err); }
  recordarSesion(s);
  return s;
}
