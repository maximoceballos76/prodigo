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

    if (!(r.getFloat("precio_usd") > 0)) {
      throw new BadRequestError("Una pieza destinada a Venta necesita un precio mayor a 0 (en USD).");
    }

    // Si no se eligió estado, queda como Disponible
    if (!r.getString("estado")) {
      r.set("estado", "Disponible");
    }
  },
};