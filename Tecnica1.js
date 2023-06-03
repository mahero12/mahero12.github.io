//////////////////////////////////////////////BOTÓN 1//SOLUCIÓN 1 A DIFERENTE NIVEL DE GRANULARIDAD/////////////////////////////////////////////////////////////////////////////

function loadJSONAndAddMarkers1(map, total){
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
									.addTo(Preciso);
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
									.addTo(Abstracto);
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
									.addTo(Concreto);
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
									.addTo(Concreto);
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
									.addTo(Especifico);
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
									.addTo(Especifico);
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
									.addTo(Especifico);
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
									.addTo(Generico);
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
			        if (zoomLevel <=3) {
		        		if (map.hasLayer(Generico)) {
		        	      map.removeLayer(Generico);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Generico)) {
		        	      map.addLayer(Generico);
		        	    }
		        	  }
			        if (zoomLevel <=4) {
		        		if (map.hasLayer(Abstracto)) {
		        	      map.removeLayer(Abstracto);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Abstracto)) {
		        	      map.addLayer(Abstracto);
		        	    }
		        	  }
		        	  if (zoomLevel <=5) {
		        		if (map.hasLayer(Preciso)) {
		        	      map.removeLayer(Preciso);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Preciso)) {
		        	      map.addLayer(Preciso);
		        	    }
		        	  }
		        	  if (zoomLevel <=6) {
		        		if (map.hasLayer(Concreto)) {
		        	      map.removeLayer(Concreto);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Concreto)) {
		        	      map.addLayer(Concreto);
		        	    }
		        	  }
		        	  if (zoomLevel <=7) {
		        		if (map.hasLayer(Especifico)) {
		        	      map.removeLayer(Especifico);
		        	    }
		        	  } else {
		        	    if (!map.hasLayer(Especifico)) {
		        	      map.addLayer(Especifico);
		        	    }
		        	  }
		        });
		})
		.catch(error => console.error('Error cargando el archivo JSON:', error));
}
