onRecordCreateRequest((e) => {
  require(`${__hooks}/venta.js`).validar(e.record);
  require(`${__hooks}/fecha.js`).anios(e.record);
  e.next();
}, "piezas");

onRecordUpdateRequest((e) => {
  require(`${__hooks}/venta.js`).validar(e.record);
  require(`${__hooks}/fecha.js`).anios(e.record);
  e.next();
}, "piezas");
