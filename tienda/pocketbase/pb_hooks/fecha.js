module.exports = {
  // anio_desde / anio_hasta salen del texto de la fecha, para filtrar y ordenar por período:
  // "1895" -> 1895-1895, "c. 1900" -> 1900-1900, "1915-1920" -> 1915-1920, "Sin fecha" -> vacío
  anios: (r) => {
    const a = r.getString("fecha").match(/\b\d{4}\b/g) || [];
    r.set("anio_desde", a.length ? Number(a[0]) : null);
    r.set("anio_hasta", a.length ? Number(a[1] || a[0]) : null);
  },
};
