// El número de inventario es interno (es el nombre del escaneo en el disco):
// no se devuelve a la web. Solo lo reciben los administradores y los editores.
onRecordEnrich((e) => {
  const auth = e.requestInfo && e.requestInfo.auth;
  const interno = auth && (auth.isSuperuser() || auth.collection().name === "editores");
  if (!interno) e.record.hide("inventario");
  e.next();
}, "fotografias", "postales", "maquinas_de_escribir");
