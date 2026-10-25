# Genera tienda/datos/: copia fija de lo que la web pública ve en PocketBase (categorías,
# piezas visibles y sus fotos), para la versión de exhibición en GitHub Pages.
# Uso (con PocketBase corriendo):  python exportar_demo.py
# Solo usa la API pública: nada oculto (inventario, campo fuente, piezas no visibles) sale de acá.
import json
import shutil
import urllib.parse
import urllib.request
from pathlib import Path

PB = "http://127.0.0.1:8090"
DESTINO = Path(__file__).parent / "tienda" / "datos"

# Fotos con licencia Creative Commons que piden citar al autor al publicarlas (se muestra en la ficha)
CREDITOS = {
    "Royal 10": "Foto: Anagoria, CC BY 3.0, vía Wikimedia Commons",
    "Underwood No. 5": "Foto: Windmemories, CC BY-SA 4.0, vía Wikimedia Commons",
    "Remington portátil": "Foto: Mariochs, CC BY-SA 4.0, vía Wikimedia Commons",
}


def api(ruta):
    return json.load(urllib.request.urlopen(PB + ruta))


def main():
    if DESTINO.exists():
        shutil.rmtree(DESTINO)
    (DESTINO / "fotos").mkdir(parents=True)

    filtro = urllib.parse.quote("visible = true")
    categorias = api(f"/api/collections/categorias/records?filter={filtro}&sort=orden&perPage=100")["items"]
    (DESTINO / "categorias.json").write_text(json.dumps(categorias, ensure_ascii=False, indent=1), encoding="utf-8")

    total = 0
    for c in categorias:
        coleccion = c.get("coleccion") or c["slug"]
        piezas = api(f"/api/collections/{coleccion}/records?sort=-created&perPage=500")["items"]
        for p in piezas:
            if p["titulo"] in CREDITOS:
                p["credito"] = CREDITOS[p["titulo"]]
            carpeta = DESTINO / "fotos" / p["id"]
            carpeta.mkdir()
            for archivo in p["imagenes"]:
                urllib.request.urlretrieve(f"{PB}/api/files/{p['collectionId']}/{p['id']}/{archivo}", carpeta / archivo)
        (DESTINO / f"{coleccion}.json").write_text(json.dumps(piezas, ensure_ascii=False, indent=1), encoding="utf-8")
        total += len(piezas)
        print(f"{c['nombre']}: {len(piezas)} piezas")

    faltan = set(CREDITOS) - {p for f in DESTINO.glob("*.json") for p in (x.get("titulo") for x in json.loads(f.read_text(encoding="utf-8")))}
    if faltan:
        print("AVISO: no se encontraron estas piezas con crédito obligatorio:", ", ".join(sorted(faltan)))
    print(f"Listo: {total} piezas en {DESTINO}")


if __name__ == "__main__":
    main()
