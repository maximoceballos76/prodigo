module.exports = {
  validar: (r) => {
    // Si no se eligió destino, queda como Sin Definir
    if (!r.getString("destino")) {
      r.set("destino", "Sin Definir");
    }

    // Solo se exige algo si la pieza está destinada a la venta
    if (r.getString("destino") !== "Venta") {
      return;
    }

    // PROVISORIO (2026-10-30): mientras las 219 fotografías del catalogador se muestran en la
    // tienda sin precio ("Consultar precio"), se acepta Venta sin precio. cargar.html lo sigue
    // pidiendo. Cuando se carguen los artículos reales de la tienda y esas fotos vuelvan al
    // museo, restablecer (ver HOJA_DE_RUTA.txt, Etapa 1):
    // if (!(r.getFloat("precio_usd") > 0)) {
    //   throw new BadRequestError("Una pieza destinada a Venta necesita un precio mayor a 0 (en USD).");
    // }

    // Si no se eligió estado, queda como Disponible
    if (!r.getString("estado")) {
      r.set("estado", "Disponible");
    }
  },
};