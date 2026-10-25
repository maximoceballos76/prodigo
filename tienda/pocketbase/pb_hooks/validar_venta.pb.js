onRecordCreateRequest((e) => {
  console.log("HOOK crear ejecutado. destino =", JSON.stringify(e.record.getString("destino")));
  require(`${__hooks}/venta.js`).validar(e.record);
  e.next();
}, "fotografias", "postales", "maquinas_de_escribir");

onRecordUpdateRequest((e) => {
  console.log("HOOK editar ejecutado. destino =", JSON.stringify(e.record.getString("destino")));
  require(`${__hooks}/venta.js`).validar(e.record);
  e.next();
}, "fotografias", "postales", "maquinas_de_escribir");