# Importa a PocketBase las fotografías catalogadas en el catalogador de Francisco
# (repositorio público frankhode/prodigo-catalogador): fichas, vocabulario e imágenes.
# Se puede correr de nuevo cuando haya fichas nuevas: saltea las piezas ya importadas
# (las reconoce por archivo_master) y no modifica las existentes.
#
# Uso (con PocketBase corriendo y una cuenta de administrador del panel):
#   set PB_EMAIL=...   set PB_PASSWORD=...      (PowerShell: $env:PB_EMAIL="...")
#   python importar_catalogador.py
# Necesita: pip install requests pillow
import io
import json
import os
import re
import sys

import requests
from PIL import Image

PB = "http://127.0.0.1:8090"
ORIGEN = "https://raw.githubusercontent.com/frankhode/prodigo-catalogador/main/"
DESTINO = "Museo Miranda"   # todas las fotografías del catalogador van a esta sede

# Campo de la ficha de Francisco -> tipo de término (clave en categorias.campos)
UNICOS = {"author": "autor", "kind": "tipo_imagen", "portrait": "retrato", "frame": "encuadre",
          "direction": "orientacion", "color": "color", "environment": "ambiente"}
LISTAS = {"identifiedPeople": "persona_identificada", "people": "personas",
          "objects": "objeto", "highlights": "destacado"}
# Mismos nombres que usan las postales, para que el filtro de color sea uno solo
COLORES = {"byn": "Blanco y negro", "sepia": "Sepia", "iluminado": "Coloreada a mano"}
FIRMAS_GENERALES = {"none": "Sin firma", "unidentified": "Por identificar"}
ORDEN_CARAS = {"Frente": 100, "Reverso": 200, "Tapa": 300, "Otros": 400}


class Base:
    def __init__(self, email, clave):
        r = requests.post(f"{PB}/api/collections/_superusers/auth-with-password",
                          json={"identity": email, "password": clave})
        if not r.ok:
            sys.exit("No se pudo ingresar a PocketBase: revisá PB_EMAIL y PB_PASSWORD.")
        self.s = requests.Session()
        self.s.headers["Authorization"] = r.json()["token"]

    def todos(self, coleccion, **params):
        items, pagina = [], 1
        while True:
            d = self.s.get(f"{PB}/api/collections/{coleccion}/records",
                           params={"perPage": 500, "page": pagina, **params}).json()
            items += d["items"]
            if pagina >= d["totalPages"]:
                return items
            pagina += 1

    def crear(self, coleccion, datos, archivos=None):
        r = self.s.post(f"{PB}/api/collections/{coleccion}/records", data=datos, files=archivos)
        if not r.ok:
            raise RuntimeError(f"{coleccion}: {r.status_code} {r.text}")
        return r.json()


def componentes(imagenes):
    """Agrupa las imágenes unidas por "parent" (frente, reverso, tapa...), como el visor de Francisco."""
    vecinos = {k: set() for k in imagenes}
    for k, im in imagenes.items():
        padre = (im.get("record") or {}).get("parent") if isinstance(im.get("record"), dict) else None
        if padre in vecinos:
            vecinos[k].add(padre)
            vecinos[padre].add(k)
    vistos = set()
    for k in imagenes:
        if k in vistos:
            continue
        grupo, cola = {k}, [k]
        for x in cola:
            for y in vecinos[x] - grupo:
                grupo.add(y)
                cola.append(y)
        vistos |= grupo
        yield grupo


def a_jpg(webp):
    """PocketBase hace las miniaturas de los WEBP en PNG (muy pesadas para la grilla); las de JPG, en JPG."""
    salida = io.BytesIO()
    Image.open(io.BytesIO(webp)).convert("RGB").save(salida, "JPEG", quality=88)
    return salida.getvalue()


def titulo(r):
    t = "Retrato" if r.get("kind") == "Retrato" else "Fotografía"
    if r.get("portrait"):
        t += " " + r["portrait"].lower()
    if r.get("identifiedPeople"):
        t += " de " + ", ".join(r["identifiedPeople"])
    if r.get("date"):
        t += ", " + r["date"]
    return t


def main():
    email, clave = os.environ.get("PB_EMAIL"), os.environ.get("PB_PASSWORD")
    if not email or not clave:
        sys.exit("Faltan las variables PB_EMAIL y PB_PASSWORD (cuenta de administrador de PocketBase).")
    pb = Base(email, clave)

    categoria = next(c for c in pb.todos("categorias") if c["slug"] == "fotografias")["id"]
    colecciones = {c["slug"]: c["id"] for c in pb.todos("colecciones")}
    terminos = {(t["tipo"], t["nombre"], t["coleccion"]): t["id"] for t in pb.todos("terminos")}
    ya_importadas = {p["archivo_master"] for p in pb.todos("piezas", fields="archivo_master")}

    def termino(tipo, nombre, coleccion="", codigo=""):
        clave_t = (tipo, nombre, coleccion)
        if clave_t not in terminos:
            terminos[clave_t] = pb.crear("terminos", {"tipo": tipo, "nombre": nombre,
                                                      "coleccion": coleccion, "codigo": codigo})["id"]
        return terminos[clave_t]

    indice = requests.get(ORIGEN + "data/index.json").json()
    nuevas = salteadas = 0
    for meta in indice["collections"]:
        fuente = requests.get(ORIGEN + meta["path"]).json()
        if meta["id"] not in colecciones:
            colecciones[meta["id"]] = pb.crear("colecciones", {"nombre": meta["name"], "slug": meta["id"]})["id"]
        colec = colecciones[meta["id"]]
        carpetas = {k: f["path"] for k, f in fuente.get("folders", {}).items()}
        listas = {k: im for k, im in fuente["images"].items()
                  if not im.get("excluded") and im.get("status") == "done" and (im.get("media") or {}).get("src")}

        for grupo in componentes(fuente["images"]):
            fotos = [listas[k] | {"id": k} for k in grupo if k in listas]
            frentes = [im for im in fotos if im["record"].get("side") == "Frente"]
            if len(frentes) != 1:
                salteadas += len(fotos)   # sin frente: el visor de Francisco tampoco las muestra
                continue
            frente = frentes[0]
            r = frente["record"]
            ruta = f"{carpetas.get(frente.get('folder'), meta['id'])}/{frente['relative']}"
            if ruta in ya_importadas:
                continue

            orden = lambda im: (int(im["record"]["displayOrder"]) if str(im["record"].get("displayOrder", "")).isdigit()
                                and int(im["record"]["displayOrder"]) > 0 else ORDEN_CARAS.get(im["record"].get("side"), 500),
                                im["relative"])
            fotos.sort(key=orden)

            ids = []
            for campo, tipo in UNICOS.items():
                if r.get(campo):
                    ids.append(termino(tipo, COLORES.get(r[campo], r[campo]) if campo == "color" else r[campo]))
            for campo, tipo in LISTAS.items():
                ids += [termino(tipo, v) for v in r.get(campo) or []]
            # Las firmas se toman de todas las caras: el sello del estudio suele estar en el reverso
            for im in fotos:
                f = im["record"].get("signature")
                if f in FIRMAS_GENERALES:
                    ids.append(termino("firma", FIRMAS_GENERALES[f]))
                elif f:
                    ids.append(termino("firma", fuente.get("signatures", {}).get(f, f), colec, f))

            notas = [(im["record"].get("side"), im["record"]["notes"].strip()) for im in fotos if (im["record"].get("notes") or "").strip()]
            inscripciones = "\n\n".join(t if cara == "Frente" and len(notas) == 1 else f"{cara}: {t}" for cara, t in notas)

            datos = {
                "titulo": titulo(r),
                "inventario": re.sub(r"\.tiff?$", "", ruta, flags=re.I),
                "categoria": categoria,
                "coleccion": colec,
                "destino": DESTINO,
                "visible": "true",
                "fecha": r.get("date") or "",
                "inscripciones": inscripciones,
                "terminos": list(dict.fromkeys(ids)),
                "ficha": json.dumps({"numero_original": r["number"]} if r.get("number") else {}),
                "caras": json.dumps([im["record"].get("side") or "Otros" for im in fotos]),
                "archivo_master": ruta,
                "fuente": f"Catalogador de colecciones fotográficas ({meta['name']}), imagen {frente['id']}",
            }
            archivos = [("imagenes", (f"{im['id'][:16]}.jpg", a_jpg(requests.get(ORIGEN + im["media"]["src"]).content), "image/jpeg"))
                        for im in fotos]
            pb.crear("piezas", datos, archivos)
            ya_importadas.add(ruta)
            nuevas += 1
            print(f"{meta['name']}: {datos['inventario']} ({len(fotos)} imágenes)")

    print(f"Listo: {nuevas} piezas nuevas. {salteadas} imágenes sin frente quedaron afuera.")


if __name__ == "__main__":
    main()
