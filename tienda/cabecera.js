// Encabezado común a todas las páginas: marca, menú de secciones y paleta de colores.
// Para sumar una sección: agregarla a SECCIONES y poner data-seccion="<id>" en el <body> de sus páginas.
const SECCIONES = [
  { id: "inicio", nombre: "Inicio", href: "index.html" },
  { id: "tienda", nombre: "Tienda", href: "tienda.html" },
];

// Color de acento de cada paleta (el mismo que en style.css), para las muestras del selector
const PALETAS = { papel: "#2f4a3b", arena: "#6e2a35", niebla: "#27425e" };

(function () {
  let paleta = "papel";
  try {
    const guardada = localStorage.getItem("prodigo-paleta");
    if (guardada in PALETAS) paleta = guardada;
  } catch (_) {}
  document.body.dataset.theme = paleta;

  const actual = document.body.dataset.seccion;
  const cab = document.getElementById("cabecera");
  cab.innerHTML = `
    <a class="marca" href="index.html">Pródigo</a>
    <nav class="secciones" aria-label="Secciones">
      <ul>${SECCIONES.map(s => `<li><a href="${s.href}"${s.id === actual ? ' aria-current="page"' : ""}>${s.nombre}</a></li>`).join("")}</ul>
    </nav>
    <div class="paletas" role="group" aria-label="Paleta de colores">
      ${Object.entries(PALETAS).map(([p, color]) =>
        `<button type="button" data-paleta="${p}" aria-pressed="${p === paleta}" aria-label="Paleta ${p}" title="Paleta ${p}" style="--muestra:${color}"></button>`).join("")}
    </div>`;

  cab.querySelector(".paletas").addEventListener("click", e => {
    const b = e.target.closest("button[data-paleta]");
    if (!b) return;
    document.body.dataset.theme = b.dataset.paleta;
    try { localStorage.setItem("prodigo-paleta", b.dataset.paleta); } catch (_) {}
    cab.querySelectorAll(".paletas button").forEach(x => x.setAttribute("aria-pressed", x === b));
  });
})();
