'use strict';
// Lectura pública de la base de Pródigo (PocketBase). No usa tokens.
// Reemplaza la lectura de los JSON de prodigo-catalogador: las fichas, colecciones y términos
// salen de la misma base que usa la tienda. Se muestran las fotografías del museo (no las de venta).
window.BixioRemote=(()=>{
 const PB_URL='https://desktop-e020bk9.taila973ce.ts.net'; // PocketBase de Pródigo (túnel de Tailscale desde la PC de Maxi)
 const FILTRO='categoria.slug = "fotografias" && (destino = "Museo Miranda" || destino = "Museo Ezeiza") && visible = true';
 // Tipo de término en la base -> grupo de filtros del visor
 const GRUPOS={autor:'autores',persona_identificada:'identificados',personas:'personas',tipo_imagen:'tipo',retrato:'retrato',encuadre:'encuadre',orientacion:'orientacion',color:'color',ambiente:'ambiente',objeto:'objetos',destacado:'destacados',firma:'marca'};
 let current='all',lastVersion=null,reading=false,retryTimer=null;
 const status=$('import-status'),select=$('live-collection');
 const compare=(a,b)=>String(a).localeCompare(String(b),'es',{numeric:true});
 async function get(coleccion,params){
  const response=await fetch(`${PB_URL}/api/collections/${coleccion}/records?${new URLSearchParams(params)}`,{cache:'no-store'});
  if(!response.ok)throw Error('No se pudo leer la base de datos.');
  return response.json();
 }
 async function all(coleccion,filter=''){
  let items=[],page=1,d;
  do{d=await get(coleccion,{perPage:500,page,...(filter?{filter}:{})});items=items.concat(d.items);}while(page++<d.totalPages);
  return items;
 }
 // Cambia si se agregó, quitó o editó una pieza, un término o una colección
 async function version(){
  const last=async(coleccion,filter)=>{const d=await get(coleccion,{perPage:1,sort:'-updated',fields:'updated',...(filter?{filter}:{})});return d.totalItems+'@'+(d.items[0]?.updated||'');};
  return (await Promise.all([last('piezas',FILTRO),last('terminos'),last('colecciones')])).join('|');
 }
 const file=(p,name,thumb)=>`${PB_URL}/api/files/${p.collectionId}/${p.id}/${encodeURIComponent(name)}`+(thumb?`?thumb=${thumb}`:'');
 function convert(pieces,terms,collections){
  const termById=new Map(terms.map(t=>[t.id,t])),colById=new Map(collections.map(c=>[c.id,c]));
  const facets=Object.fromEntries(Object.values(GRUPOS).map(g=>[g,new Map()]));
  // Las firmas son autoridades de cada colección: se muestran con su código y la colección
  const text=t=>t.tipo!=='firma'?t.nombre:(t.codigo?t.codigo+' · ':'')+t.nombre+(colById.get(t.coleccion)?' · '+colById.get(t.coleccion).nombre:'');
  const items=pieces.map(p=>{
   const ts=(p.terminos||[]).map(id=>termById.get(id)).filter(t=>t&&GRUPOS[t.tipo]);
   ts.forEach(t=>facets[GRUPOS[t.tipo]].set(t.id,text(t)));
   const names=tipo=>ts.filter(t=>t.tipo===tipo).map(t=>t.nombre),first=tipo=>names(tipo)[0]||'';
   const col=colById.get(p.coleccion),files=Array.isArray(p.imagenes)?p.imagenes:[],sides=Array.isArray(p.caras)?p.caras:[];
   const relative=(p.archivo_master||'').split('/').pop()||p.titulo;
   const sequence=files.map((f,i)=>{const side=sides[i]||(i?'Otros':'Frente');return {id:p.id+'::'+i,side,relative:i?relative+' · '+side:relative,src:file(p,f),thumb:file(p,f,'400x0')};});
   const back=sequence.find(x=>x.side==='Reverso');
   const record={number:p.ficha?.numero_original||'',identifier:'',date:p.fecha||'',author:first('autor'),identifiedPeople:names('persona_identificada'),
    color:first('color'),kind:first('tipo_imagen'),portrait:first('retrato'),frame:first('encuadre'),direction:first('orientacion'),
    people:names('personas'),objects:names('objeto'),highlights:names('destacado'),title:p.titulo,inscriptions:p.inscripciones||''};
   return {id:p.id,displayId:record.number||relative,sequence,authors:names('autor'),names:record.identifiedPeople,
    tags:ts.filter(t=>t.tipo!=='firma').map(t=>t.id),brand:ts.filter(t=>t.tipo==='firma').map(t=>t.id),
    year:p.anio_desde||null,yearTo:p.anio_hasta||p.anio_desde||null,dateText:p.fecha||'Sin fecha',
    // La base no guarda las medidas en píxeles: proporción aproximada hasta que carga la miniatura
    w:1000,h:1500,thumb:sequence[0]?.thumb||'',src:sequence[0]?.src||'',back:back?.id||null,backSrc:back?.src||null,
    record,collectionId:col?.slug||'',collectionName:col?.nombre||'',_order:relative};
  });
  // Orden de catálogo: por colección y por nombre de archivo, como en el catalogador
  items.sort((a,b)=>compare(a.collectionName,b.collectionName)||compare(a._order,b._order));
  return {items,facets:Object.fromEntries(Object.entries(facets).map(([g,m])=>[g,[...m].sort((a,b)=>compare(a[1],b[1]))]))};
 }
 function options(collections,items){
  const used=new Set(items.map(i=>i.collectionId));
  select.replaceChildren(new Option('Todas las colecciones','all'));
  for(const c of collections.filter(c=>used.has(c.slug)).sort((a,b)=>compare(a.nombre,b.nombre)))select.add(new Option(c.nombre,c.slug));
  select.value=[...select.options].some(o=>o.value===current)?current:'all';
 }
 async function update(force=false){
  if(!current||reading)return;if(retryTimer){clearTimeout(retryTimer);retryTimer=null;}reading=true;const requested=current;
  try{
   const signature=await version()+'#'+requested;
   if(!force&&signature===lastVersion)return;
   const [pieces,terms,collections]=await Promise.all([all('piezas',FILTRO),all('terminos'),all('colecciones')]);
   if(current!==requested)return;
   const full=convert(pieces,terms,collections);options(collections,full.items);
   const items=requested==='all'?full.items:full.items.filter(i=>i.collectionId===requested);
   if(requested!=='all'&&!items.length)throw Error('Colección inexistente.');
   // Solo los términos que usan las piezas mostradas
   const usedTerms=new Set(items.flatMap(i=>[...i.tags,...i.brand]));
   const facets=Object.fromEntries(Object.entries(full.facets).map(([g,v])=>[g,v.filter(([id])=>usedTerms.has(id))]));
   const name=requested==='all'?'Colecciones fotográficas':items[0].collectionName;
   const wasOpen=!viewer.hidden,previous=wasOpen?shown[activeIndex]?.id:null;
   window.BixioImport?.deactivate();sourceVersion++;installCatalog(items,facets);
   if(previous){const index=shown.findIndex(i=>i.id===previous);if(index>=0)openViewer(index);else closeViewer();}
   $('collection-name-display').textContent=name;lastVersion=signature;
   status.hidden=true;$('viewer-sync-status').hidden=true;
  }catch(e){status.hidden=false;status.textContent=e.message+' Se conserva la vista anterior.';$('viewer-sync-status').textContent=status.textContent;$('viewer-sync-status').hidden=false;retryTimer=setTimeout(()=>{retryTimer=null;update(true);},10000);}finally{reading=false;if(current&&current!==requested)queueMicrotask(()=>update(true));}
 }
 function stop(){current=null;lastVersion=null;select.value='local';}

 select.onchange=()=>{current=select.value;lastVersion=null;update(true);};
 const params=new URLSearchParams(location.search);
 current=params.get('coleccion')||'all';update(true);
 setInterval(()=>{if(!document.hidden)update();},30000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)update();});
 return {stop,update};
})();
