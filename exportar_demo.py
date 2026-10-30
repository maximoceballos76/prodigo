# Genera tienda/datos/: copia fija de lo que la web pública ve en PocketBase (categorías,
# colecciones, términos y las piezas visibles de la tienda con sus fotos), para la versión
# de exhibición en GitHub Pages.
# Uso (con PocketBase corriendo):  python exportar_demo.py      (necesita: pip install pillow)
# Solo usa la API pública: nada oculto (inventario, campo fuente, piezas no visibles) sale de acá.
# Solo se exportan las piezas en venta: las del museo pesarían cientos de MB en el repositorio.
import io
import json
import shutil
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

PB = "http://127.0.0.1:8090"
DESTINO = Path(__file__).parent / "tienda" / "datos"


def todos(coleccion, filtro=""):
    items, pagina = [], 1
    while True:
        q = f"perPage=500&page={pagina}" + (f"&filter={urllib.parse.quote(filtro)}" if filtro else "")
        d = json.load(urllib.request.urlopen(f"{PB}/api/collections/{coleccion}/records?{q}"))
        items += d["items"]
        if pagina >= d["totalPages"]:
            return items
        pagina += 1


def guardar(nombre, datos):
    (DESTINO / f"{nombre}.json").write_text(json.dumps(datos, ensure_ascii=False, indent=1), encoding="utf-8")


def main():
    if DESTINO.exists():
        shutil.rmtree(DESTINO)
    (DESTINO / "fotos").mkdir(parents=True)

    guardar("categorias", todos("categorias", "visible = true"))
    guardar("colecciones", todos("colecciones"))
    guardar("terminos", todos("terminos"))

    piezas = todos("piezas", 'destino = "Venta"')
    for p in piezas:
        carpeta = DESTINO / "fotos" / p["id"]
        carpeta.mkdir()
        # Versión reducida (lado mayor 1200 px, JPG calidad 82), para no cargar el repositorio.
        # No se usan las miniaturas de PocketBase: las guarda con calidad muy alta y agranda las chicas.
        for archivo in p["imagenes"]:
            original = urllib.request.urlopen(f"{PB}/api/files/{p['collectionId']}/{p['id']}/{archivo}").read()
            imagen = Image.open(io.BytesIO(original))
            imagen.thumbnail((1200, 1200))
            imagen.convert("RGB").save(carpeta / archivo, "JPEG", quality=82)
    guardar("piezas", piezas)
    print(f"Listo: {len(piezas)} piezas en {DESTINO}")


if __name__ == "__main__":
    main()
