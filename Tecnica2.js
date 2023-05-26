
//////////////////////////////////////////////BOTÓN 2//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////
function loadJSONAndAddMarkers2(map, total){
	contador=0;
	markers.clearLayers();
	Pais.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	
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
								const markerIconP = new L.icon({
								  iconUrl: 'img/50.png',
								  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
								  iconSize: [35, 41],
								  iconAnchor: [12, 41],
								  popupAnchor: [1, -34],
								  shadowSize: [41, 41],
								});

								const popupContentP = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsP = {
									className: popupClass,
								};
								const markerP = L.marker([lat, lng], {
									icon: markerIconP,
									uri: valorUri,
								})
									.bindPopup(popupContentP, popupOptionsP)
									.addTo(markers);
								loadedURIs.add(valorUri);
								break;
						case 'A': popupClass = 'red-popup';
							markerColor = 'red';
								contador ++;
								const markerIconA = L.icon({
									iconUrl: 'img/30.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [35, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentA = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsA = {
									className: popupClass,
								};
								const markerA = L.marker([lat, lng], {
									icon: markerIconA,
									uri: valorUri,
								})
									.bindPopup(popupContentA, popupOptionsA)
									.addTo(markers);
								loadedURIs.add(valorUri);
							break;
						case 'V': popupClass = 'violet-popup';
							markerColor = 'violet';
								contador ++;
								const markerIconV = L.icon({
									iconUrl: 'img/70.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [35, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentV = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsV = {
									className: popupClass,
								};
								const markerV = L.marker([lat, lng], {
									icon: markerIconV,
									uri: valorUri,
								})
									.bindPopup(popupContentV, popupOptionsV)
									.addTo(markers);
								loadedURIs.add(valorUri);
							break;
						case 'T': popupClass = 'violet-popup';
							markerColor = 'yellow';
								contador ++;
								const markerIconT = L.icon({
									iconUrl: 'img/70.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [35, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentT = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsT = {
									className: popupClass,
								};
								const markerT = L.marker([lat, lng], {
									icon: markerIconT,
									uri: valorUri,
								})
									.bindPopup(popupContentT, popupOptionsT)
									.addTo(markers);
								loadedURIs.add(valorUri);
							break;
						case 'L': popupClass = 'black-popup';
							markerColor = 'black';
								contador ++;
								const markerIconL = L.icon({
									iconUrl: 'img/90.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [35, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentL = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsL = {
									className: popupClass,
								};
								const markerL = L.marker([lat, lng], {
									icon: markerIconL,
									uri: valorUri,
								})
									.bindPopup(popupContentL, popupOptionsL)
									.addTo(markers);
								loadedURIs.add(valorUri);
							 break;
						case 'R': popupClass = 'black-popup';
							markerColor = 'black';
								contador ++;
								const markerIconR = L.icon({
									iconUrl: 'img/90.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [35, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentR = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsR = {
									className: popupClass,
								};
								const markerR = L.marker([lat, lng], {
									icon: markerIconR,
									uri: valorUri,
								})
									.bindPopup(popupContentR, popupOptionsR)
									.addTo(markers);
								loadedURIs.add(valorUri);
							 break;
						case 'S': popupClass = 'black-popup';
							markerColor = 'black';
								contador ++;
								const markerIconS = L.icon({
									iconUrl: 'img/90.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [35, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentS = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsS = {
									className: popupClass,
								};
								const markerS = L.marker([lat, lng], {
									icon: markerIconS,
									uri: valorUri,
								})
									.bindPopup(popupContentS, popupOptionsS)
									.addTo(markers);
								loadedURIs.add(valorUri);
							 break;
						case 'H': popupClass = 'blue-popup';
							markerColor = 'blue';
								contador ++;
								const markerIconH = L.icon({
									iconUrl: 'img/10.png',
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [35, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContentH = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptionsH = {
									className: popupClass,
								};
								const markerH = L.marker([lat, lng], {
									icon: markerIconH,
									uri: valorUri,
								})
									.bindPopup(popupContentH, popupOptionsH)
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
