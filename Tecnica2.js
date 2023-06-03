
//////////////////////////////////////////////BOTÓN 2//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////
function loadJSONAndAddMarkers2(map, total){
	contador=0;
	markers.clearLayers();
	sinClusters.clearLayers();
	Generico.clearLayers();
	Abstracto.clearLayers();
	Preciso.clearLayers();
	Concreto.clearLayers();
	Especifico.clearLayers();
	
	if(Object.keys(heatmapLayerList).length !== 0){
	removeHeatmap();
	}
	if(polylineLayer && Object.keys(polyLineLayerList).length !== 0){
	polylineLayer.setStyle({ color: 'transparent' });
	}
	fetch('JSON/salida10000.json')
		.then(response => response.json())
		.then(data => {
			// Set para que las URI sean únicas y no estén repetidas
			const loadedURIs = new Set();
			// Agregue la leyenda al mapa
			legend4.addTo(map);
			document.querySelector('.leyenda1').style.display = 'flex';

			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda1').style.display = 'none';
			});
			let numeroMarcadores=0;
			
			// Carga los marcadores de salida3
			for (let item in data.results.bindings) {
				if(numeroMarcadores<total){
				let punto = data.results.bindings[item];
				const valorUri = punto.object.value;
				const lat = punto.lat.value;
				const lng = punto.long.value;
				const label = punto.objectlabel.value;
				let valorPlace = punto.place.value;
				let clase = mapaClases.get(valorPlace.split('/')[3]);
				
				//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD
				// Determina el color del marcador según si la etiqueta contiene una coma o no
				switch (clase) {
						 // usar una sentencia switch para evaluar el valor de valorPlace
						case  'P': 
								contador ++;
								const markerIconP = L.divIcon({
								  className: 'custom-icon2',
								  html: `<div class="marker-label">50%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								
								const popupContentP = `<b>${label}</b><br>${punto.placename.value}`;
								
								
								const markerP = L.marker([lat, lng], {
								  icon: markerIconP,
								  uri: valorUri,
								})
								  .bindPopup(popupContentP)
								  .addTo(Preciso);
								
								loadedURIs.add(valorUri);
								break;
						case 'A':
								contador ++;
								const markerIconA = L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">30%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentA = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerA = L.marker([lat, lng], {
									icon: markerIconA,
									uri: valorUri,
								})
									.bindPopup(popupContentA)
									.addTo(markers);
								loadedURIs.add(valorUri);
							break;
						case 'V': 
								contador ++;
								const markerIconV =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">70%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentV = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerV = L.marker([lat, lng], {
									icon: markerIconV,
									uri: valorUri,
								})
									.bindPopup(popupContentV)
									.addTo(markers);
								loadedURIs.add(valorUri);
							break;
						case 'T':
								contador ++;
								const markerIconT = L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">70%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentT = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerT = L.marker([lat, lng], {
									icon: markerIconT,
									uri: valorUri,
								})
									.bindPopup(popupContentT)
									.addTo(markers);
								loadedURIs.add(valorUri);
							break;
						case 'L':
								contador ++;
								const markerIconL =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">90%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentL = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerL = L.marker([lat, lng], {
									icon: markerIconL,
									uri: valorUri,
								})
									.bindPopup(popupContentL)
									.addTo(markers);
								loadedURIs.add(valorUri);
							 break;
						case 'R':
								contador ++;
								const markerIconR =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">90%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentR = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerR = L.marker([lat, lng], {
									icon: markerIconR,
									uri: valorUri,
								})
									.bindPopup(popupContentR)
									.addTo(markers);
								loadedURIs.add(valorUri);
							 break;
						case 'S': 
								contador ++;
								const markerIconS =  L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">90%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentS = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerS = L.marker([lat, lng], {
									icon: markerIconS,
									uri: valorUri,
								})
									.bindPopup(popupContentS)
									.addTo(markers);
								loadedURIs.add(valorUri);
							 break;
						case 'H':
								contador ++;
								const markerIconH = L.divIcon({
								className: 'custom-icon2',
								  html: `<div class="marker-label">10%</div>`,
								  iconSize: [25, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});
								const popupContentH = `<b>${label}</b><br>${punto.placename.value}`;
								
								const markerH = L.marker([lat, lng], {
									icon: markerIconH,
									uri: valorUri,
								})
									.bindPopup(popupContentH)
									.addTo(markers);
								loadedURIs.add(valorUri);
							 break;	
				}
				numeroMarcadores ++;
				}else{
					break;
				}
			}
		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
