let marcadores2 = [];
let polylineLayer;
let heatmapLayer;
let heatmapLayer2;
let button;
let contador;
let heatmapLayerList = [];
let buttonList=[];
let polyLineLayerList=[];



function loadJSONAndAddMarkers0(map,total){
	markers.clearLayers();
	Pais.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	alert('Aquí podrá ver todos los marcadores sin ninguna técnica');
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
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
			let numeroMarcadores=0;
			
			// Carga los marcadores de salida3
			for (let item in data.results.bindings) {
				if(numeroMarcadores<total){
					
                let punto = data.results.bindings[item];
                const valorUri = punto.object.value;
                const lat = punto.lat.value;
                const lng = punto.long.value;
                const label = punto.objectlabel.value;
                const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
                const marker = L.marker([lat, lng], {
                        uri: valorUri,
                    })
                    .bindPopup(popupContent)
                    .addTo(markers)
                loadedURIs.add(valorUri);
                numeroMarcadores ++;
				}else{
					break;
				}
			}
	})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}




//////////////////////////////////////////////BOTÓN 1//SOLUCIÓN 1 A DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////
function loadJSONAndAddMarkers1(map, total){
	contador=0;
	markers.clearLayers();
	Pais.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	alert('Según el nivel de zoom puede ver los marcadores de las distintas categorías');
	
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
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
			legend.addTo(map);
			document.querySelector('.leyenda').style.display = 'flex';

			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda').style.display = 'none';
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
				let popupClass = 'gray-popup'; // establecer una clase por defecto si no se encuentra una clase 
				let markerColor = 'gray';
				//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD
				// Determina el color del marcador según si la etiqueta contiene una coma o no
				switch (clase) {
						 // usar una sentencia switch para evaluar el valor de valorPlace
						case  'P': popupClass = 'green-popup';
							markerColor = 'green';
								contador ++;
								const markerIconP = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
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
									.addTo(Ciudad);
								loadedURIs.add(valorUri);
								break;
						case 'A': popupClass = 'red-popup';
							markerColor = 'red';
								contador ++;
								const markerIconA = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
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
									.addTo(Pais);
								loadedURIs.add(valorUri);
							break;
						case 'V': popupClass = 'orange-popup';
							markerColor = 'orange';
								contador ++;
								const markerIconV = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
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
									.addTo(Bosque);
								loadedURIs.add(valorUri);
							break;
						case 'T': popupClass = 'yellow-popup';
							markerColor = 'yellow';
								contador ++;
								const markerIconT = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
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
									.addTo(Bosque);
								loadedURIs.add(valorUri);
							break;
						case 'L': popupClass = 'violet-popup';
							markerColor = 'violet';
								contador ++;
								const markerIconL = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
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
									.addTo(Calles);
								loadedURIs.add(valorUri);
							 break;
						case 'R': popupClass = 'white-popup';
							markerColor = 'white';
								contador ++;
								const markerIconR = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
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
									.addTo(Calles);
								loadedURIs.add(valorUri);
							 break;
						case 'S': popupClass = 'black-popup';
							markerColor = 'black';
								contador ++;
								const markerIconS = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
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
									.addTo(Calles);
								loadedURIs.add(valorUri);
							 break;
						case 'H': popupClass = 'blue-popup';
							markerColor = 'blue';
								contador ++;
								const markerIconH = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
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
									.addTo(Pais);
								loadedURIs.add(valorUri);
							 break;	
				}
				numeroMarcadores ++;
				}else{
					break;
				}
			}
			map.on('zoomend', function() {
			        var zoomLevel = map.getZoom();
			        console.log(zoomLevel);
			        if (zoomLevel <=4) {
		        		if (map.hasLayer(Pais)) {
		        	      map.removeLayer(Pais);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Pais)) {
		        	      map.addLayer(Pais);
		        	    }
		        	  }
		        	  if (zoomLevel <=5) {
		        		if (map.hasLayer(Ciudad)) {
		        	      map.removeLayer(Ciudad);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Ciudad)) {
		        	      map.addLayer(Ciudad);
		        	    }
		        	  }
		        	  if (zoomLevel <=6) {
		        		if (map.hasLayer(Bosque)) {
		        	      map.removeLayer(Bosque);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Bosque)) {
		        	      map.addLayer(Bosque);
		        	    }
		        	  }
		        	  if (zoomLevel <=7) {
		        		if (map.hasLayer(Calles)) {
		        	      map.removeLayer(Calles);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Calles)) {
		        	      map.addLayer(Calles);
		        	    }
		        	  }
		        });
		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
/////////////////////////////////////////BOTÓN 2//MOSTRAR INSTRUCCIONES TÉCNICA 2 NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////////
function loadJSONAndAddMarkers2Alert(map, total, filtro){
	markers.clearLayers();
	Pais.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
	removeHeatmap();
	}
	if(polylineLayer && Object.keys(polyLineLayerList).length !== 0){
	polylineLayer.setStyle({ color: 'transparent' });
	}
	alert('Selecciona una categoría en el menú inferior para ver sus elementos');
	contador=0;
	fetch('JSON/salida10000.json')
		.then(response => response.json())
		.then(data => {
			// Set para que las URI sean únicas y no estén repetidas
			const loadedURIs = new Set();
			if(total<=10){
			// Agregue la leyenda al mapa
				legend4.addTo(map);
				document.querySelector('.leyenda1').style.display = 'flex';
	
				// ocultar la leyenda si se llama a otra función
				document.querySelector('.menu-items').addEventListener('click', function() {
					document.querySelector('.leyenda1').style.display = 'none';
				});
			}else
			if(total<=100){
			// Agregue la leyenda al mapa
				legend100.addTo(map);
				document.querySelector('.leyenda1').style.display = 'flex';
	
				// ocultar la leyenda si se llama a otra función
				document.querySelector('.menu-items').addEventListener('click', function() {
					document.querySelector('.leyenda1').style.display = 'none';
				});
			}else
			if(total<=1000){
			// Agregue la leyenda al mapa
				legend1000.addTo(map);
				document.querySelector('.leyenda1').style.display = 'flex';
	
				// ocultar la leyenda si se llama a otra función
				document.querySelector('.menu-items').addEventListener('click', function() {
					document.querySelector('.leyenda1').style.display = 'none';
				});
			}
			})
		
		.catch(error => console.error('Error cargando el archivo JSON:', error));
	}
//////////////////////////////////////////////BOTÓN 2//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////
function loadJSONAndAddMarkers2(map, total, filtro){
	contador=0;
	markers.clearLayers();
	Pais.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
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
			if(total<=10){
			// Agregue la leyenda al mapa
				legend4.addTo(map);
				document.querySelector('.leyenda1').style.display = 'flex';
				// ocultar la leyenda si se llama a otra función
				document.querySelector('.menu-items').addEventListener('click', function() {
					document.querySelector('.leyenda1').style.display = 'none';
				});
			}else
			if(total<=100){
			// Agregue la leyenda al mapa
				legend100.addTo(map);
				document.querySelector('.leyenda1').style.display = 'flex';
				// ocultar la leyenda si se llama a otra función
				document.querySelector('.menu-items').addEventListener('click', function() {
					document.querySelector('.leyenda1').style.display = 'none';
				});
			}else
			if(total<=1000){
			// Agregue la leyenda al mapa
				legend1000.addTo(map);
				document.querySelector('.leyenda1').style.display = 'flex';
				// ocultar la leyenda si se llama a otra función
				document.querySelector('.menu-items').addEventListener('click', function() {
					document.querySelector('.leyenda1').style.display = 'none';
				});
			}
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
				let popupClass = 'gray-popup'; // establecer una clase por defecto si no se encuentra una clase 
				let markerColor = 'gray';
				//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD
				// Determina el color del marcador según si la etiqueta contiene una coma o no
				if(filtro){
					switch (clase) {
						 // usar una sentencia switch para evaluar el valor de valorPlace
						case  'P': popupClass = 'green-popup';
							markerColor = 'green';
							if (filtro === 'P') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};
								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							}break;
						case 'A': popupClass = 'red-popup';
							markerColor = 'red';
							if (filtro === 'A') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};
								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
						case 'V': popupClass = 'orange-popup';
							markerColor = 'orange';
							if (filtro === 'V') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};
								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							}break;
						case 'T': popupClass = 'yellow-popup';
							markerColor = 'yellow';
							if (filtro === 'T') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};
								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
						case 'L': popupClass = 'violet-popup';
							markerColor = 'violet';
							if (filtro === 'L') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};
								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
						case 'R': popupClass = 'white-popup';
							markerColor = 'white';
							if (filtro === 'R') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};
								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
						case 'S': popupClass = 'black-popup';
							markerColor = 'black';
							if (filtro === 'S') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};
								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
						case 'H': popupClass = 'blue-popup';
							markerColor = 'blue';
							if (filtro === 'H') {
								contador ++;
								const markerIcon = L.icon({
									iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
									shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
									iconSize: [25, 41],
									iconAnchor: [12, 41],
									popupAnchor: [1, -34],
									shadowSize: [41, 41],
								});
								const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
								const popupOptions = {
									className: popupClass,
								};
								const marker = L.marker([lat, lng], {
									icon: markerIcon,
									uri: valorUri,
								})
									.bindPopup(popupContent, popupOptions)
									.addTo(markers);
								loadedURIs.add(valorUri);
							} break;
					}
				}
				numeroMarcadores ++;
				}else{
					break;
				}
			}
			if(filtro && contador===0){
			alert('No hay marcadores en esta categoría');
		}

		})
		
		.catch(error => console.error('Error cargando el archivo JSON:', error));
		
}
///////////////////////////////////////////////BOTÓN 2- TODOS//SOLUCIÓN DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////////////////////
//BOTÓN 2//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD
function loadJSONAndAddMarkers2Todos(map, total) {
	markers.clearLayers();
	Pais.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
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
				let popupClass = 'gray-popup'; // establecer una clase por defecto si no se encuentra una clase adecuada 
				let markerColor = 'gray';
				//SOLUCIÓN 2 A DIFERENTE NIVEL DE GRANULARIDAD
				// Determina el color del marcador según si la etiqueta contiene una coma o no
				if (clase) {
					switch (clase) { // usar una sentencia switch para evaluar el valor de valorPlace
						case 'P': popupClass = 'green-popup', markerColor = 'green'; break;
						case 'A': popupClass = 'red-popup', markerColor = 'red'; break;
						case 'V': popupClass = 'orange-popup', markerColor = 'orange';; break;
						case 'T': popupClass = 'yellow-popup', markerColor = 'yellow';; break;
						case 'L': popupClass = 'violet-popup', markerColor = 'violet';; break;
						case 'R': popupClass = 'white-popup', markerColor = 'white';; break;
						case 'S': popupClass = 'black-popup', markerColor = 'black';; break;
						case 'H': popupClass = 'blue-popup', markerColor = 'blue';; break;
					}
				}
				const markerIcon = L.icon({
					iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
					shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
					iconSize: [25, 41],
					iconAnchor: [12, 41],
					popupAnchor: [1, -34],
					shadowSize: [41, 41],

				});
				const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
				const popupOptions = {
					className: popupClass,
				};
				const marker = L.marker([lat, lng], {
					icon: markerIcon,
					uri: valorUri,
				})
					.bindPopup(popupContent, popupOptions)
					.addTo(markers)
				loadedURIs.add(valorUri);
				numeroMarcadores ++;
				}else{
					break;
				}
			}
		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
//////////////////////////////////////////////////////BOTÓN 3//SOLUCIÓN 1 A MÚLTIPLES LOCALIZACIONES////////////////////////////////////////////////////////////////////////////////////////////////////
//BOTÓN 3//SOLUCIÓN 1 A MÚLTIPLES LOCALIZACIONES
function loadJSONAndAddMarkers3(map, total) {
	//L.Icon.Default.prototype.options.className = 'transparent-marker';
	markers.clearLayers();
	Pais.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
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
			alert('Haz clic en un marcador principal para ver sus múltiples localizaciones');
			// Agregue la leyenda al mapa
			legend2.addTo(map);
			document.querySelector('.leyenda2').style.display = 'flex';
			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda2').style.display = 'none';
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
				const placename = punto.placename.value;
				const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
				// verifica si la uri no ha sido cargada
				if (!loadedURIs.has(valorUri)) {
					const marker = L.marker([lat, lng], {
						uri: valorUri,
						principal: true,
						placename: placename
					})
						.bindPopup(popupContent)
						.addTo(markers);
					// agrega la uri actual a loadedURIs
					loadedURIs.add(valorUri);
				} else {
					// Si la URI ya ha sido cargada, crea el marcador y le agrega la clase leaf-transparent
					const markerHtmlStyles = `
              background-color: #FF0000;
              width: 2rem;
              height: 2rem;
              display: block;
              left: -1.5rem;
              top: -1.5rem;
              position: relative;
              border-radius: 3rem 3rem 0;
              transform: rotate(45deg);
              border: 1px solid #FFFFFF`;
					const labelMarkerStyle = `
              color:white;
              transform: rotate(-45deg);
              width: 2rem;
              height: 2rem;
              text-align: center;
              font-size: 0.75rem;
              padding-top: 5px;
              font-weight: bold;
              `;
					const customIconLabel = L.divIcon({
						className: "leaf-transparent",
						iconAnchor: [-8, 16],
						labelAnchor: [-6, 0],
						popupAnchor: [0, -36],
						html: `<span style="${markerHtmlStyles}"><p style="${labelMarkerStyle}">7</p></span>`,
					});
					const marker = L.marker([lat, lng], {
						uri: valorUri,
						icon: customIconLabel,
						principal: false,
						placename: placename
					})
						.bindPopup(popupContent)
						.addTo(markers)
				}
				numeroMarcadores ++;
				}else{
					break;
				}
			}
			//SOLUCIÓN 1 A MÚLTIPLES LOCALIZACIONES
			// Se recorre el Set de URI
			for (let i of loadedURIs.values()) {
				let uri = i;
				let uriCount = 0;
				let markerWithUri;
				markers.eachLayer(function(layer) {
					const layerUri = layer.options.uri;
					if (layerUri === uri) {
						uriCount++;
						markerWithUri = layer;
					}
				});
				if (uriCount === 1) {
					markerWithUri.setIcon(L.icon({
						iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
						shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41]
					}));
				}
				if (uriCount >= 2) {
					// Se obtienen los marcadores asociados a la URI
					let marcadoresURI = findMarcadoresByUri(uri);

					// Nos quedamos con el primero: será sobre el que se cambiará el icono
					let marcadorOrange = marcadoresURI[0];

					marcadorOrange.setIcon(L.icon({
						iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
						shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41]
					}));
					// Añadimos el evento click al marcador del icono naranja para que añada/elimine un marcador amarillo en las posiciones de los otros marcadores con la misma uri
					marcadorOrange.on('click', anadirMarcadoresSecundarios);
				}
			}

		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
//////////////////////////////////////////////////////BOTÓN 4//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES////////////////////////////////////////////////////////////////////////////////////////////////////
//BOTÓN 4//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES
function loadJSONAndAddMarkers4(map,total) {
	//L.Icon.Default.prototype.options.className = 'transparent-marker';
	markers.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
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
			// Carga los marcadores de salida3
			// Agregue la leyenda al mapa
			alert('Los elementos con el mismo color son el mismo objeto en distintas localizaciones a excepción de los marcadores azules que son los que no tienen múltiples localizaciones');
			let numeroMarcadores=0;
			for (let item in data.results.bindings) {
				if(numeroMarcadores<total){
				let punto = data.results.bindings[item];
				const valorUri = punto.object.value;
				const lat = punto.lat.value;
				const lng = punto.long.value;
				const label = punto.objectlabel.value;
				const placename = punto.placename.value;
				const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
				// verifica si la uri no ha sido cargada
				if (!loadedURIs.has(valorUri)) {
					const marker = L.marker([lat, lng], {
						uri: valorUri,
						principal: true,
						placename: placename,
						popupContent: popupContent
					})
						.bindPopup(popupContent)
						.addTo(markers);
					// agrega la uri actual a loadedURIs
					loadedURIs.add(valorUri);
				} else {
					const marker = L.marker([lat, lng], {
						uri: valorUri,
						principal: false,
						placename: placename,
						popupContent: popupContent
					})
						.bindPopup(popupContent)
						.addTo(markers);
					// agrega la uri actual a loadedURIs
					loadedURIs.add(valorUri);
				}
			numeroMarcadores ++;
			}else{
				break;
			}
			}
			//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES
			// Se recorre el Set de URI
			for (let i of loadedURIs.values()) {
				let uri = i;
				let uriCount = 0;
				let markerWithUri;
				markers.eachLayer(function(layer) {
					const layerUri = layer.options.uri;
					if (layerUri === uri) {
						uriCount++;
						markerWithUri = layer;
					}
				});
				//no tienen multiples localizaciones
				if (uriCount === 1) {
					markerWithUri.setIcon(L.icon({
						iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
						shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41]
					}));
				}
				//si tienen multiples localizaciones
				if (uriCount >= 2) {
					let markerColor=generateMarkerColor();
					let marcadoresURI = findMarcadoresByUri(uri);
					for (let j = 0; j < marcadoresURI.length; j++) {
						
						let marcadorPrincipal = marcadoresURI[j];
	
						marcadorPrincipal.setIcon(L.icon({
							iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
							shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
						}));
					}
					let marcadoresURI2 = findMarcadoresByUriFalse(uri);
					for (let j = 0; j < marcadoresURI2.length; j++) {
						let marcadorSecundario = marcadoresURI2[j];
						
						marcadorSecundario.setIcon(L.icon({
							iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColor}.png`,
							shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
						}));
					}
				}
			}

		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
///////////////////////////////////////////////////////////FUNCIONES NECESARIAS//////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////DEFINIMOS UN COLOR DISTINTO PARA LOS MARCADORES CON LA MISMA URI PARA TÉCNICA 2:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

const colors = ['orange', 'green', 'red', 'yellow','black','violet']; // Colores disponibles para los marcadores
let currentIndex = 0; // Índice del color actual

function generateMarkerColor() {
  const color = colors[currentIndex]; // Obtener el color actual

  // Incrementar el índice y asegurarse de que permanezca dentro del rango de colores disponibles
  currentIndex = (currentIndex + 1) % colors.length;

  return color;
}

//////////////////////////////////BUCAMOS MARCADORES PRINCIPALES PARA TÉCNICAS:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Funcion para buscar los marcadores que contienen la URI indicada, aparecen mas de una vez y son la principal.
 */
function findMarcadoresByUri(uri) {
	let marcadores = [];

	markers.eachLayer(function(layer) {
		if (layer.options.uri === uri && layer.options.principal == true) {
			marcadores.push(layer);
		}
	});
	return marcadores;
}

//////////////////////////////////BUCAMOS MARCADORES SECUNDARIOS PARA TÉCNICAS:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Funcion para buscar los marcadores que contienen la URI indicada y son las multiples.
 */
function findMarcadoresByUriFalse(uri) {
	let marcadores = [];

	markers.eachLayer(function(layer) {
		if (layer.options.uri === uri && layer.options.principal == false) {
			marcadores.push(layer);
		}
	});
	return marcadores;
}


//////////////////////////////AÑADE U OCULTA MARCADOR SECUNDARIO Y LINEA AL MAPA PARA TÉCNICA 1:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Función que determina si debe añadir u ocultar el marcador amarillo al hacer clic en un marcador naranja
 */
function anadirMarcadoresSecundarios(e){
	let uri = e.target.options.uri;
	let marcadoresURI2 = findMarcadoresByUriFalse(uri);
	let marcadoresURI = findMarcadoresByUri(uri);

	for (let j = 0; j < marcadoresURI2.length; j++) {
		let punto = marcadoresURI2[j];
		let popup = punto.getPopup().getContent();
		let latlng = punto.getLatLng();
		let existeMarcador = existeMarcadorEnPosicion(latlng.lat, latlng.lng);

		if (!existeMarcador) {
			let marcadorYellow = marcadoresURI2[j];
			marcadorYellow.setIcon(L.icon({
				iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
			}));
			marcadores2.push(marcadorYellow);
			crearLinea(marcadoresURI[j], marcadoresURI2[j]);
			if (markers.hasLayer(marcadoresURI2[j])) {
				markers.getVisibleParent(marcadoresURI2[j]).spiderfy();
			}
		} else {

			let marcadorEliminado = marcadoresURI2[j];
			
			//comprobamos si existe la linea o no
			if (polylineLayer.options.color === 'orange'){
				// hacemos invisible la línea
				polylineLayer.setStyle({ color: 'transparent' });
				const markerHtmlStyles = `
                background-color: #FF0000;
                width: 2rem;
                height: 2rem;
                display: block;
                left: -1.5rem;
                top: -1.5rem;
                position: relative;
                border-radius: 3rem 3rem 0;
                transform: rotate(45deg);
                border: 1px solid #FFFFFF`;
				const labelMarkerStyle = `
                color:white;
                transform: rotate(-45deg);
                width: 2rem;
                height: 2rem;
                text-align: center;
                font-size: 0.75rem;
                padding-top: 5px;
                font-weight: bold;
                `;
				const newIcon = L.divIcon({
					className: "leaf-transparent",
					iconAnchor: [-8, 16],
					labelAnchor: [-6, 0],
					popupAnchor: [0, -36],
					html: `<span style="${markerHtmlStyles}"><p style="${labelMarkerStyle}">7</p></span>`,
				});
				// cambiar el icono del marcador
				marcadorEliminado.setIcon(newIcon);
			
				
			} else {
				crearLinea(marcadoresURI[j], marcadoresURI2[j]);
				let marcadorYellow = marcadoresURI2[j];
				marcadorYellow.setIcon(L.icon({
					iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
					iconSize: [25, 41],
					iconAnchor: [12, 41],
					popupAnchor: [1, -34],
					shadowSize: [41, 41]
				}));
				marcadores2.push(marcadorYellow);
				if (markers.hasLayer(marcadoresURI2[j])) {
				markers.getVisibleParent(marcadoresURI2[j]).spiderfy();
			}
			}
			
		}
	}
}
//////////////////////////////////BUCAMOS SI EXISTE YA EL MARCADOR SECUNDARIO PARA TÉCNICA 1:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/*
 * Busca si existe un marcador en las coordenadas indicadas.
 */
function existeMarcadorEnPosicion(lat, lng){
	let encontrado = false;
	for (let i = 0; i < marcadores2.length; i++) {
		let marker = marcadores2[i];
		if (marker.getLatLng().lat === lat && marker.getLatLng().lng === lng) {
			encontrado = true;
			break;
		}
	}
	return encontrado;
}

/////////////////////////////CREA LÍNEA ENTRE MARCADOR PRINCIPAL Y SECUNDARIO PARA TÉCNICA 1:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/*
 * Funcion que crea una linea entre los objetos con multiples localizaciones
 */
function crearLinea(marcador1, marcador2){
	const latlngs = [
		[marcador1.getLatLng().lat, marcador1.getLatLng().lng],
		[marcador2.getLatLng().lat, marcador2.getLatLng().lng],
	];

	polylineLayer = L.polyline(latlngs, { color: 'orange' }).addTo(map);
	
	polyLineLayerList.push(polylineLayer);
	
}
/////////////////////////////ELIMINAR LÍNEA ENTRE MARCADOR PRINCIPAL Y SECUNDARIO PARA TÉCNICA 1:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

//Función para eliminar el mapa de calor y el botón
function eliminarLinea(){
	const polyLineLayer = polyLineLayerList.pop();
    map.removeLayer(polyLineLayer);
    
    
}

//////////////////////////////////////////////////////TÉCNICAS Y FUNCIONES ANTIGUAS/////////////////////////////////////////////////////////////////

//BOTÓN 1//SOLUCIÓN 1 A DIFERENTE NIVEL DE GRANULARIDAD// ETIQUETAS COLORES
/*function loadJSONAndAddMarkers1(map,total){
	markers.clearLayers();
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
	removeHeatmap();
	}
	if(polylineLayer && Object.keys(polyLineLayerList).length !== 0){
	polylineLayer.setStyle({ color: 'transparent' });
	}
	fetch('JSON/salida10000.json')
		.then(response => response.json())
		.then(data => {
			const loadedURIs = new Set();
			// Agregue la leyenda al mapa
			alert('Para saber la categoría de cada elemento, haz clic en su marcador');
			legend.addTo(map);
			document.querySelector('.leyenda').style.display = 'flex';

			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda').style.display = 'none';
			});
			let numeroMarcadores=0;
			for (let item in data.results.bindings) {
				if(numeroMarcadores<total){
				let punto = data.results.bindings[item];
				const valorUri = punto.object.value;
				let valorPlace = punto.place.value;
				const lat = punto.lat.value;
				const lng = punto.long.value;
				const label = punto.objectlabel.value;

				const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
				const marker = L.marker([lat, lng], {
					uri: valorUri,
					id: valorPlace.split('/')[3]
				})
					.bindPopup(popupContent)
					.addTo(markers);
				loadedURIs.add(valorUri);
				marker.on('click', consultarClase);
				numeroMarcadores ++;
				}else{
					break;
				}
			}
		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
*/


//////////////////////////DEFINIMOS EL COLOR DE LA ETIQUETA SEGÚN SU CATEGORÍA PARA TÉCNICA 1:NIVEL DE GRANULARIDAD//////////////////////////////////////////////////////////////////////////////////////////
/**
 * Consulta el servicio a partir de un marker y cambia el color de fondo y texto del popup en función de la clase
 */
/*
function consultarClase(e) {
	let marker = e.target;
	let id = marker.options.id;
	let clase = getClassByPlace(id);
	let fondo = 'violet'; // establecer una clase por defecto si no se encuentra una clase adecuada en las condiciones siguientes

	if (clase) {
		switch (clase) { // usar una sentencia switch para evaluar el valor de valorPlace
			case 'P': fondo = 'green'; break;
			case 'A': fondo = 'red'; break;
			case 'V': fondo = 'orange'; break;
			case 'T': fondo = 'yellow'; break;
			case 'L': fondo = 'violey'; break;
			case 'R': fondo = 'white'; break;
			case 'S': fondo = 'black'; break;
			case 'H': fondo = 'blue'; break;
		}
	}

	let popup = marker.getPopup();
	let estiloPopup = popup.getElement().children[0].style;
	estiloPopup.background = fondo;
	estiloPopup.color = getColorLetraByFondo(fondo);
}
*/
//////////////////////////////////DEFINIMOS COLOR DEL TEXTO DE ETIQUETAS PARA TÉCNICA 1:NIVEL DE GRANULARIDAD//////////////////////////////////////////////////////////////////////////////////////////


/**
 * Obtiene el color del texto en función del color del fondo. Por defecto la letra es negra
 */
/*
function getColorLetraByFondo(fondo) {
	let color = 'black';

	switch (fondo) {
		case 'green':
		case 'red':
		case 'black':
		case 'violet':
		case 'blue':
			color = 'white';
			break;
	}

	return color;
}
*/


///////////////////////////CREA MAPA DE CALOR EN LA LOCALIZACIÓN DE MARCADOR SECUNDARIO PARA TÉCNICA 2:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////

/*
 * Funcion que crea un mapa de calor 
 */
/*
function anadirMapaCalor(event){
	
	// Se obtiene la URI del marcador naranja sobre el que se ha hecho clic
	const uri = event.target.options.uri;

	// Se buscan los marcadores que tengan la misma URI que el marcador naranja
	const marcadoresURI = findMarcadoresByUriFalse(uri);
	const marcadoresURI2 = findMarcadoresByUri(uri);
	// Se crea un array con las coordenadas de los marcadores encontrados
	const coords = marcadoresURI.map(marcador => [marcador.getLatLng().lat, marcador.getLatLng().lng]);
	const coords2=marcadoresURI2.map(marcador => [marcador.getLatLng().lat, marcador.getLatLng().lng]);
	// Se crea el mapa de calor con el array de coordenadas
	
	
	heatmapLayer = L.heatLayer(coords, {
		radius: 50,
		blur: 20,
		minOpacity: 0.5,
		gradient: { 0.1: '#f44336', 0.2: '#ff9800', 0.4: '#ffc107', 0.6: '#8bc34a', 0.8: '#03a9f4', 1: '#9c27b0' }
	}, {
		maxZoom: 18,
    	minZoom: 5,
		pane: 'overlayPane',
	}).addTo(map);
	
	
	// Se añade la nueva instancia de heatmapLayer a la lista
    heatmapLayerList.push(heatmapLayer);
	
	
	heatmapLayer2 = L.heatLayer(coords2, {
		radius: 50,
		blur: 20,
		minOpacity: 0.5,
		gradient: { 0.1: '#f44336', 0.2: '#ff9800', 0.4: '#ffc107', 0.6: '#8bc34a', 0.8: '#03a9f4', 1: '#9c27b0' }
	}, {
		maxZoom: 18,
    	minZoom: 5,
		pane: 'overlayPane',
	}).addTo(map);
	
	// Se añade la nueva instancia de heatmapLayer a la lista
    heatmapLayerList.push(heatmapLayer2);
	// Se obtiene el contenido de la etiqueta del primer marcador
	const popupContent = marcadoresURI[0].options.popupContent;
	const popupContent2 = marcadoresURI2[0].options.popupContent;
	// Se crea la etiqueta para el mapa de calor
	const etiqueta = L.popup()
		.setLatLng(coords[0]) // Las coordenadas de la etiqueta son las del primer marcador
		.setContent(popupContent);
	
	// Se agrega la etiqueta al mapa de calor
	etiqueta.addTo(map);
	
	// Se hace que la etiqueta aparezca automáticamente
	etiqueta.openPopup();
	

	// Se añade un botón para eliminar el mapa de calor
	button = L.control({ position: 'topleft' });
	button.onAdd = function() {
		const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
		div.innerHTML = '<button class="botonEliminar" onclick="removeHeatmap()">Eliminar mapa de calor</button>';
		return div;
	};
	button.addTo(map);
	buttonList.push(button);
	
}
*/
//////////////////////////////////ELIMINA MAPA DE CALOR PARA TÉCNICA 2:MÚLTIPLES LOCALIZACIONES//////////////////////////////////////////////////////////////////////////////////////////
/*
//Función para eliminar el mapa de calor y el botón
function removeHeatmap(){
    // Se elimina la última instancia de heatmapLayer en la lista
    const heatmapLayer = heatmapLayerList.pop();
    map.removeLayer(heatmapLayer);
    const heatmapLayer2 = heatmapLayerList.pop();
    map.removeLayer(heatmapLayer2);
    const button = buttonList.pop();
    map.removeControl(button);
}

*/


//////////////////////////////////////////////////////BOTÓN 4//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES////////////////////////////////////////////////////////////////////////////////////////////////////
//BOTÓN 4//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES
/*
function loadJSONAndAddMarkers5(map,total) {
	//L.Icon.Default.prototype.options.className = 'transparent-marker';
	markers.clearLayers();
	Pais.clearLayers();
	Ciudad.clearLayers();
	Bosque.clearLayers();
	Calles.clearLayers();
	if(heatmapLayer && Object.keys(heatmapLayerList).length !== 0){
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
			// Carga los marcadores de salida3
			// Agregue la leyenda al mapa
			legend3.addTo(map);
			document.querySelector('.leyenda3').style.display = 'flex';
			// ocultar la leyenda si se llama a otra función
			document.querySelector('.menu-items').addEventListener('click', function() {
				document.querySelector('.leyenda3').style.display = 'none';
			});
			let numeroMarcadores=0;
			for (let item in data.results.bindings) {
				if(numeroMarcadores<total){
				let punto = data.results.bindings[item];
				const valorUri = punto.object.value;
				const lat = punto.lat.value;
				const lng = punto.long.value;
				const label = punto.objectlabel.value;
				const placename = punto.placename.value;
				const popupContent = `<b>${label}</b><br>${punto.placename.value}`;
				// verifica si la uri no ha sido cargada
				if (!loadedURIs.has(valorUri)) {
					const marker = L.marker([lat, lng], {
						uri: valorUri,
						principal: true,
						placename: placename,
						popupContent: popupContent
					})
						.bindPopup(popupContent)
						.addTo(markers);
					// agrega la uri actual a loadedURIs
					loadedURIs.add(valorUri);
				} else {
					// Si la URI ya ha sido cargada, crea el marcador y le agrega la clase leaf-transparent
					const markerHtmlStyles = `
              background-color: #FF0000;
              width: 2rem;
              height: 2rem;
              display: block;
              left: -1.5rem;
              top: -1.5rem;
              position: relative;
              border-radius: 3rem 3rem 0;
              transform: rotate(45deg);
              border: 1px solid #FFFFFF`;
					const labelMarkerStyle = `
              color:white;
              transform: rotate(-45deg);
              width: 2rem;
              height: 2rem;
              text-align: center;
              font-size: 0.75rem;
              padding-top: 5px;
              font-weight: bold;
              `;
					const customIconLabel = L.divIcon({
						className: "leaf-transparent",
						iconAnchor: [-8, 16],
						labelAnchor: [-6, 0],
						popupAnchor: [0, -36],
						html: `<span style="${markerHtmlStyles}"><p style="${labelMarkerStyle}">7</p></span>`,
					});

					const marker = L.marker([lat, lng], {
						uri: valorUri,
						icon: customIconLabel,
						principal: false,
						placename: placename,
						popupContent: popupContent
					})
						.bindPopup(popupContent)
						.addTo(markers)
				}
			numeroMarcadores ++;
			}else{
				break;
			}
			}
			//SOLUCIÓN 2 A MÚLTIPLES LOCALIZACIONES
			// Se recorre el Set de URI
			for (let i of loadedURIs.values()) {
				let uri = i;
				let uriCount = 0;
				let markerWithUri;
				markers.eachLayer(function(layer) {
					const layerUri = layer.options.uri;
					if (layerUri === uri) {
						uriCount++;
						markerWithUri = layer;
					}
				});
				if (uriCount === 1) {
					markerWithUri.setIcon(L.icon({
						iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
						shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41]
					}));
				}
				if (uriCount >= 2) {
					// Si  hay un marcador con principal=true y q no sea único, cambiamos el color del primer marcador con esa URI
					let marcadoresURI = findMarcadoresByUri(uri);
					let marcadorOrange = marcadoresURI[0];
					marcadorOrange.setIcon(L.icon({
						iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
						shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						shadowSize: [41, 41]
					}));
					// Añadimos el evento click al marcador del icono naranja para que añada/elimine un marcador amarillo 
					//en las posiciones de los otros marcadores con la misma uri
					marcadorOrange.on('click', anadirMapaCalor);
				}
			}
		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
*/
